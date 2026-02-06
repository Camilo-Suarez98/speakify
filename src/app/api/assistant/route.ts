import { NextResponse } from "next/server";
import type { AssistantPayload, AssistantError } from "@/types/assistant";
import { fetchAssistantReply, assertOpenAIKey } from "@/services/openai";

export async function POST(request: Request) {
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
