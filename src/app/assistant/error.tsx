"use client";

import ErrorState from "@/components/ui/error-state";

export default function AssistantError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-10 lg:px-12">
        <ErrorState
          errorText={error.message || "Error al cargar el asistente."}
          onRetry={reset}
        />
      </main>
    </div>
  );
}
