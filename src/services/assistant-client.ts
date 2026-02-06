import type { AssistantPayload, AssistantReply } from "@/types/assistant";

export async function requestAssistantReply(
  payload: Required<AssistantPayload>
): Promise<AssistantReply> {
  const response = await fetch("/api/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.error ?? "No se pudo generar respuesta.");
  }

  return (await response.json()) as AssistantReply;
}
