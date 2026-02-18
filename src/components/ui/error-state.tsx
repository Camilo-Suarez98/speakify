"use client";

import { AlertCircle } from "lucide-react";

type ErrorStateProps = {
  errorText: string;
  onRetry?: () => void;
};

export default function ErrorState({ errorText, onRetry }: ErrorStateProps) {
  return (
    <section className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-destructive" />
        </div>
        <h2 className="text-balance text-center text-2xl font-semibold text-slate-900 md:text-3xl">
          {errorText}
        </h2>
        <p className="text-center text-base text-slate-600">
          Lo sentimos, algo salio mal. Por favor, intenta nuevamente.
        </p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Intentar de nuevo
          </button>
        ) : null}
      </div>
    </section>
  );
}
