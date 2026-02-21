import type {
  AssistantPayload,
  AssistantReply,
  AssistantError,
} from "@/types/assistant";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_TRANSCRIPTIONS_URL = "https://api.openai.com/v1/audio/transcriptions";
const MODEL = "gpt-4.1-mini";
const TRANSCRIPTION_MODEL = "gpt-4o-mini-transcribe";

const DEFAULTS: Required<Omit<AssistantPayload, "input">> = {
  mode: "conversation",
  targetLanguage: "Ingles",
  level: "Intermedio",
  goal: "",
};

type ResponseOutputItem = {
  type?: string;
  content?: Array<{ type?: string; text?: string }>;
};

type OpenAIResponse = {
  output_text?: string;
  output?: ResponseOutputItem[];
};

function extractOutputText(payload: OpenAIResponse): string | null {
  if (typeof payload.output_text === "string" && payload.output_text.length > 0) {
    return payload.output_text;
  }

  const output = payload.output ?? [];
  for (const item of output) {
    if (item.type !== "message" || !Array.isArray(item.content)) continue;
    const textPart = item.content.find(
      (content) => content.type === "output_text" && typeof content.text === "string"
    );
    if (textPart?.text) return textPart.text;
  }

  return null;
}

function buildSystemPrompt(payload: Required<AssistantPayload>): string {
  return `Eres un asistente experto en aprendizaje de idiomas.\n\nTu tarea:\n- Personaliza la respuesta segun el idioma objetivo, nivel y objetivo del usuario.\n- Haz preguntas de seguimiento si falta contexto.\n- Da ejemplos concretos y ejercicios cortos.\n- Ofrece correcciones amables y claras.\n\nIdioma objetivo: ${payload.targetLanguage}.\nNivel: ${payload.level}.\nObjetivo: ${payload.goal}.\nModo: ${payload.mode}.`;
}

function toRequiredPayload(payload: AssistantPayload): Required<AssistantPayload> {
  return {
    mode: payload.mode ?? DEFAULTS.mode,
    targetLanguage: payload.targetLanguage ?? DEFAULTS.targetLanguage,
    level: payload.level ?? DEFAULTS.level,
    goal: payload.goal ?? DEFAULTS.goal,
    input: payload.input ?? "",
  };
}

export function assertOpenAIKey(): AssistantError | null {
  if (OPENAI_API_KEY) return null;
  return {
    error:
      "Falta OPENAI_API_KEY. Agrega tu key en .env.local para habilitar el asistente.",
  };
}

export async function fetchAssistantReply(
  payload: AssistantPayload
): Promise<AssistantReply> {
  const requiredPayload = toRequiredPayload(payload);

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        { role: "system", content: buildSystemPrompt(requiredPayload) },
        { role: "user", content: `Solicitud del usuario: ${requiredPayload.input}` },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = (await response.json()) as OpenAIResponse;
  const reply = extractOutputText(data);

  return { reply: reply ?? "" };
}

export async function transcribeAudio(
  audioBuffer: ArrayBuffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const audioBlob = new Blob([audioBuffer], { type: mimeType || "audio/webm" });
  const formData = new FormData();
  formData.set("model", TRANSCRIPTION_MODEL);
  formData.set("file", audioBlob, fileName || "pronunciation.webm");

  const response = await fetch(OPENAI_TRANSCRIPTIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = (await response.json()) as { text?: string };
  return data.text?.trim() ?? "";
}

type PronunciationFeedbackInput = {
  transcript: string;
  expectedText?: string;
  targetLanguage?: string;
  level?: string;
  goal?: string;
};

export async function fetchPronunciationFeedback(
  payload: PronunciationFeedbackInput
): Promise<AssistantReply> {
  const targetLanguage = payload.targetLanguage ?? DEFAULTS.targetLanguage;
  const level = payload.level ?? DEFAULTS.level;
  const goal = payload.goal ?? DEFAULTS.goal;
  const expectedText = payload.expectedText?.trim() ?? "";

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        {
          role: "system",
          content:
            "Eres un coach de pronunciacion. Evalua con claridad y brevedad. " +
            "Responde en espanol en este formato: " +
            "1) Calificacion global (0-100), 2) Lo que estuvo bien, " +
            "3) Correcciones puntuales por sonidos/silabas, 4) Ejercicio corto de repeticion.",
        },
        {
          role: "user",
          content:
            `Idioma objetivo: ${targetLanguage}\n` +
            `Nivel: ${level}\n` +
            `Objetivo: ${goal}\n` +
            `Texto esperado: ${expectedText || "No definido"}\n` +
            `Transcripcion del usuario: ${payload.transcript}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = (await response.json()) as OpenAIResponse;
  const reply = extractOutputText(data);

  return { reply: reply ?? "" };
}
