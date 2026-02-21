import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import {
  assertOpenAIKey,
  transcribeAudio,
  fetchPronunciationFeedback,
} from "@/services/openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBearerToken(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}

async function isRequestAuthorized(request: Request): Promise<boolean> {
  const token = getBearerToken(request);

  if (token) {
    const supabase = createSupabaseServerClient();
    const { data, error: userError } = await supabase.auth.getUser(token);
    if (!userError && data.user) {
      return true;
    }
  }

  const session = await getServerSession(authOptions);
  return Boolean(session?.user);
}

export async function POST(request: Request) {
  const authorized = await isRequestAuthorized(request);
  if (!authorized) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const missingKeyError = assertOpenAIKey();
  if (missingKeyError) {
    return NextResponse.json(missingKeyError, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!(audioFile instanceof File)) {
      return NextResponse.json(
        { error: "Debes adjuntar un audio para evaluar pronunciacion." },
        { status: 400 }
      );
    }

    const audioBuffer = await audioFile.arrayBuffer();
    const transcript = await transcribeAudio(
      audioBuffer,
      audioFile.name,
      audioFile.type
    );

    if (!transcript) {
      return NextResponse.json(
        { error: "No se pudo transcribir el audio. Intenta grabar de nuevo." },
        { status: 422 }
      );
    }

    const feedback = await fetchPronunciationFeedback({
      transcript,
      expectedText: String(formData.get("expectedText") ?? ""),
      targetLanguage: String(formData.get("targetLanguage") ?? ""),
      level: String(formData.get("level") ?? ""),
      goal: String(formData.get("goal") ?? ""),
    });

    return NextResponse.json({
      transcript,
      reply:
        feedback.reply ??
        "Escuche tu audio, pero no pude generar comentarios detallados.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo evaluar la pronunciacion.";

    return NextResponse.json(
      {
        error: "No se pudo evaluar la pronunciacion.",
        details: message.slice(0, 400),
      },
      { status: 502 }
    );
  };
};
