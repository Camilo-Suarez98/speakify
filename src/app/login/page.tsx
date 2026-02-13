import Link from "next/link";
import { ProjectName } from "@/components/ui/project-name";
import { EmailAuthForm } from "@/components/auth/email-auth-form";

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
