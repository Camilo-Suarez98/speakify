import type { FormEvent } from "react";
import type { Message } from "@/types/assistant";

type ChatPanelProps = {
  messages: Message[];
  input: string;
  isLoading: boolean;
  error: string | null;
  canSend: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ChatPanel({
  messages,
  input,
  isLoading,
  error,
  canSend,
  onInputChange,
  onSubmit,
}: ChatPanelProps) {
  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.8)]">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Conversa con tu asistente
        </h2>
        <p className="mt-2 text-slate-600">
          Cuanto mas detallado seas, mejor sera la experiencia.
        </p>
      </div>

      <div
        className="flex min-h-[320px] flex-col gap-4 rounded-2xl bg-slate-50 p-4 overflow-y-scroll max-h-[60vh]"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "assistant"
              ? "bg-white text-slate-700 shadow"
              : "self-end bg-emerald-400 text-white"
              }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading ? (
          <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow">
            Preparando tu respuesta...
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-medium text-slate-700">Tu mensaje</label>
        <textarea
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          rows={4}
          placeholder="Quiero practicar conversaciones para pedir comida en un restaurante..."
          className="resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        />
        {error ? (
          <p className="text-sm text-rose-600" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={!canSend}
          className="inline-flex items-center justify-center rounded-full bg-emerald-400 cursor-pointer px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? "Generando..." : "Enviar"}
        </button>
        <p className="text-xs text-slate-500">
          Tus datos se usan solo para personalizar la sesion. No compartas
          informacion sensible.
        </p>
      </form>
    </section>
  );
}
