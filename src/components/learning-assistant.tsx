"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LEVEL,
  DEFAULT_MODE,
  GOAL_SUGGESTIONS,
  MODE_OPTIONS,
} from "@/config/assistant-config";
import {
  FALLBACK_ASSISTANT_MESSAGE,
  INITIAL_ASSISTANT_MESSAGE,
  TECHNICAL_ISSUE_MESSAGE,
} from "@/lib/assistant-copy";
import { requestAssistantReply } from "@/services/assistant-client";
import type { Message } from "@/types/assistant";
import AssistantHeader from "@/components/assistant/assistant-header";
import ModeSelector from "@/components/assistant/mode-selector";
import ProfileForm from "@/components/assistant/profile-form";
import ChatPanel from "@/components/assistant/chat-panel";
import FeatureGrid from "@/components/assistant/feature-grid";

export default function LearningAssistant() {
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [targetLanguage, setTargetLanguage] = useState(DEFAULT_LANGUAGE);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [goal, setGoal] = useState(GOAL_SUGGESTIONS[0]);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_ASSISTANT_MESSAGE,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeMode = useMemo(
    () => MODE_OPTIONS.find((option) => option.id === mode) ?? null,
    [mode]
  );

  const canSend = input.trim().length > 0 && !isLoading;
  console.log(canSend);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    const trimmedInput = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: trimmedInput }]);

    setIsLoading(true);
    try {
      const data = await requestAssistantReply({
        mode,
        targetLanguage,
        level,
        goal,
        input: trimmedInput,
      });
      const reply = data.reply?.trim();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            reply && reply.length > 0 ? reply : FALLBACK_ASSISTANT_MESSAGE,
        },
      ]);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Ocurrio un error inesperado.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: TECHNICAL_ISSUE_MESSAGE,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 lg:px-12">
      <AssistantHeader
        goalSuggestions={GOAL_SUGGESTIONS}
        goal={goal}
        onGoalSelect={setGoal}
        targetLanguage={targetLanguage}
        level={level}
        activeMode={activeMode}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Elige tu enfoque de aprendizaje
            </h2>
            <p className="mt-2 text-slate-600">
              Combina estrategias o cambia de modo cuando quieras para mantenerte
              motivado.
            </p>
          </div>
          <ModeSelector options={MODE_OPTIONS} value={mode} onChange={setMode} />
          <ProfileForm
            targetLanguage={targetLanguage}
            level={level}
            onTargetLanguageChange={setTargetLanguage}
            onLevelChange={setLevel}
          />
        </section>

        <ChatPanel
          messages={messages}
          input={input}
          isLoading={isLoading}
          error={error}
          canSend={canSend}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </div>

      <FeatureGrid />
    </section>
  );
}
