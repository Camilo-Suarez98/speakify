import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Message } from "@/types/assistant";

type ChatPanelProps = {
  messages: Message[];
  input: string;
  isLoading: boolean;
  error: string | null;
  canSend: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPronunciationSubmit: (audioBlob: Blob, expectedText: string) => Promise<void>;
};

export default function ChatPanel({
  messages,
  input,
  isLoading,
  error,
  canSend,
  onInputChange,
  onSubmit,
  onPronunciationSubmit,
}: ChatPanelProps) {
  const [expectedText, setExpectedText] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmittingAudio, setIsSubmittingAudio] = useState(false);
  const [recordingFeedback, setRecordingFeedback] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const supportsRecording =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    typeof MediaRecorder !== "undefined";

  const stopTracks = () => {
    if (!streamRef.current) return;
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      stopTracks();
    };
  }, []);

  const startRecording = async () => {
    if (!supportsRecording || isLoading || isSubmittingAudio) return;

    try {
      setRecordingFeedback(null);
      setAudioBlob(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob.size > 0 ? blob : null);
        setIsRecording(false);
        stopTracks();
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      setRecordingFeedback(
        "No se pudo acceder al microfono. Revisa permisos e intenta otra vez."
      );
      setIsRecording(false);
      stopTracks();
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "recording") return;
    recorder.stop();
  };

  const submitPronunciation = async () => {
    if (!audioBlob || isLoading || isSubmittingAudio) return;

    setRecordingFeedback(null);
    setIsSubmittingAudio(true);
    try {
      await onPronunciationSubmit(audioBlob, expectedText);
      setRecordingFeedback("Pronunciacion enviada. Revisa la retroalimentacion.");
      setAudioBlob(null);
    } catch {
      setRecordingFeedback("No se pudo enviar el audio. Intenta de nuevo.");
    } finally {
      setIsSubmittingAudio(false);
    }
  };

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

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Practica de pronunciacion
        </h3>
        <p className="mt-1 text-xs text-slate-600">
          Graba tu voz y recibe una calificacion con correcciones especificas.
        </p>

        <label className="mt-3 flex flex-col gap-2">
          <span className="text-xs font-medium text-slate-700">
            Frase a practicar (opcional)
          </span>
          <input
            type="text"
            value={expectedText}
            onChange={(event) => setExpectedText(event.target.value)}
            placeholder="Ejemplo: I would like a table for two."
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!supportsRecording || isLoading || isSubmittingAudio}
            className="inline-flex items-center justify-center cursor-pointer rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isRecording ? "Detener grabacion" : "Grabar voz"}
          </button>
          <button
            type="button"
            onClick={submitPronunciation}
            disabled={!audioBlob || isLoading || isSubmittingAudio}
            className="inline-flex items-center justify-center cursor-pointer rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmittingAudio ? "Enviando audio..." : "Calificar pronunciacion"}
          </button>
        </div>

        {!supportsRecording ? (
          <p className="mt-2 text-xs text-rose-600">
            Este navegador no soporta grabacion de audio.
          </p>
        ) : null}
        {audioBlob ? (
          <p className="mt-2 text-xs text-slate-600">
            Audio listo para enviar ({Math.ceil(audioBlob.size / 1024)} KB).
          </p>
        ) : null}
        {recordingFeedback ? (
          <p className="mt-2 text-xs text-slate-700">{recordingFeedback}</p>
        ) : null}
      </div>
    </section>
  );
};
