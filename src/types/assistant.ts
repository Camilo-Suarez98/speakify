export type AssistantMode =
  | "conversation"
  | "grammar"
  | "pronunciation"
  | "vocabulary"
  | "exam";

export type Message = {
  role: "assistant" | "user";
  content: string;
};

export type ModeOption = {
  id: AssistantMode;
  label: string;
  description: string;
};

export type AssistantPayload = {
  mode?: AssistantMode;
  targetLanguage?: string;
  level?: string;
  goal?: string;
  input?: string;
};

export type AssistantReply = {
  reply?: string;
};

export type AssistantError = {
  error: string;
  details?: string;
};
