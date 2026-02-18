"use client";

import ErrorState from "@/components/ui/error-state";

export default function LoginError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-10 px-6 py-16 lg:px-12">
        <ErrorState
          errorText={error.message || "Error al cargar la pagina de inicio de sesion."}
          onRetry={reset}
        />
      </main>
    </div>
  );
}
