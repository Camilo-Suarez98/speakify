import Link from "next/link";
import { ProjectName } from "@/components/ui/project-name";
import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-10 px-6 py-16 lg:px-12">
        <header className="flex flex-col gap-4">
          <ProjectName />
          <h1 className="text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">
            Inicia sesion o crea tu usuario para continuar.
          </h1>
          <p className="text-lg text-slate-600">
            Accede con usuario y contrasena para entrar a tu espacio privado y
            retomar la conversacion con la IA.
          </p>
        </header>

        <EmailAuthForm />
        <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
          <p className="text-sm font-semibold text-slate-700">
            O continua con Google
          </p>
          <GoogleAuthButton />
        </section>

        <Link
          href="/"
          className="text-sm font-semibold text-emerald-400 transition hover:text-emerald-800"
        >
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
