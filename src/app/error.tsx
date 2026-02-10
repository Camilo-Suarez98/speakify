"use client";

import Header from "@/components/layout/header";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-10 lg:px-12">
        <Header />
        <section className="flex flex-col gap-8 rounded-3xl borde">
          <div className="flex flex-col gap-4 justify-center items-center place-content-center">
            <div className="flex justify-center">
              <AlertCircle className="h-24 w-24 text-destructive" />
            </div>
            <h2
              className="text-balance text-center text-2xl font-semibold text-slate-900 md:text-3xl"
            >
              {error.message}
            </h2>
            <p className="text-base text-center text-slate-600">
              Lo sentimos, algo salio mal. Por favor, intenta nuevamente.
            </p>
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Intentar de nuevo
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}