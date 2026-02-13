import type { AssistantPayload, AssistantReply } from "@/types/assistant";
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
