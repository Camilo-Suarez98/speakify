import FeatureGrid from "@/components/assistant/feature-grid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 lg:px-12">
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="text-base font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Speakify
            </p>
            <h1 className="text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">
              Aprende idiomas con una IA que adapta cada conversacion a tu
              ritmo.
            </h1>
            <p className="text-lg text-slate-600">
              Define metas, recibe ejercicios claros y practica con un
              asistente que entiende tu nivel en cada sesion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Iniciar sesion
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Probar el chat
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <p className="text-sm font-semibold text-slate-900">
                Lo que obtienes al iniciar sesion
              </p>
              <ul className="flex list-disc flex-col gap-3 pl-5">
                <li>Un chat privado para practicar a diario.</li>
                <li>Rutas personalizadas segun tus objetivos.</li>
                <li>Correcciones claras y planes semanales.</li>
              </ul>
              <p>
                Solo los usuarios autenticados pueden acceder a la IA para
                proteger tu progreso.
              </p>
            </div>
          </div>
        </header>

        <FeatureGrid />
      </main>
    </div>
  );
}
