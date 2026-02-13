import type { AssistantPayload, AssistantReply } from "@/types/assistant";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export async function requestAssistantReply(
  payload: Required<AssistantPayload>
): Promise<AssistantReply> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Debes iniciar sesion para usar el asistente.");
  }

  const response = await fetch("/api/assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.error ?? "No se pudo generar respuesta.");
  }

  return (await response.json()) as AssistantReply;
}
