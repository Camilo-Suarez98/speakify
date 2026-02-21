import type {
  AssistantPayload,
  AssistantReply,
  PronunciationFeedbackReply,
} from "@/types/assistant";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export async function requestAssistantReply(
  payload: Required<AssistantPayload>
): Promise<AssistantReply> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch("/api/assistant", {
    method: "POST",
    headers: session?.access_token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        }
      : {
          "Content-Type": "application/json",
        },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.error ?? "No se pudo generar respuesta.");
  }

  return (await response.json()) as AssistantReply;
}

export async function requestPronunciationFeedback({
  audioBlob,
  expectedText,
  targetLanguage,
  level,
  goal,
}: {
  audioBlob: Blob;
  expectedText?: string;
  targetLanguage: string;
  level: string;
  goal: string;
}): Promise<PronunciationFeedbackReply> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const formData = new FormData();
  formData.set("audio", audioBlob, "pronunciation.webm");
  formData.set("expectedText", expectedText ?? "");
  formData.set("targetLanguage", targetLanguage);
  formData.set("level", level);
  formData.set("goal", goal);

  const response = await fetch("/api/assistant/pronunciation", {
    method: "POST",
    headers: session?.access_token
      ? {
          Authorization: `Bearer ${session.access_token}`,
        }
      : undefined,
    body: formData,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.error ?? "No se pudo evaluar la pronunciacion.");
  }

  return (await response.json()) as PronunciationFeedbackReply;
}
