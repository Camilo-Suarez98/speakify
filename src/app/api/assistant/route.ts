import { NextResponse } from "next/server";
import type { AssistantPayload, AssistantError } from "@/types/assistant";
import { fetchAssistantReply, assertOpenAIKey } from "@/services/openai";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

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

export async function POST(request: Request) {
  const token = getBearerToken(request);

  let isAuthorized = false;
  if (token) {
    const supabase = createSupabaseServerClient();
    const { data, error: userError } = await supabase.auth.getUser(token);
    isAuthorized = !userError && Boolean(data.user);
  }

  if (!isAuthorized) {
    const session = await getServerSession(authOptions);
    isAuthorized = Boolean(session?.user);
  }

  if (!isAuthorized) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const missingKeyError = assertOpenAIKey();
  if (missingKeyError) {
    return NextResponse.json(missingKeyError, { status: 500 });
  }

  const payload = (await request.json()) as AssistantPayload;
  const input = payload.input ?? "";

  if (!input.trim()) {
    return NextResponse.json(
      { error: "El mensaje no puede estar vacio." },
      { status: 400 }
    );
  }

  try {
    const data = await fetchAssistantReply(payload);
    return NextResponse.json({
      reply:
        data.reply ??
        "Estoy listo para ayudarte. Dime mas sobre tu objetivo para personalizar la sesion.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo generar respuesta.";

    const responsePayload: AssistantError = {
      error:
        "No se pudo generar respuesta. Verifica tu key o el modelo configurado.",
      details: message.slice(0, 400),
    };

    return NextResponse.json(responsePayload, { status: 502 });
  }
}
