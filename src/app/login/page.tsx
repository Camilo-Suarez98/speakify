import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-10 px-6 py-16 lg:px-12">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Speakify
          </p>
          <h1 className="text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">
            Inicia sesion para continuar tu ruta de idiomas.
          </h1>
          <p className="text-lg text-slate-600">
            Usa Google para entrar a tu espacio privado y retomar la
            conversacion con la IA.
          </p>
        </header>

        <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
          <GoogleAuthButton />
          <p className="text-sm text-slate-500">
            Solo necesitas tu cuenta de Google para acceder.
          </p>
        </section>

        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-600"
        >
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
