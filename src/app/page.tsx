import FeatureGrid from "@/components/assistant/feature-grid";
import ContactForm from "@/components/forms/contact-form";
import Link from "next/link";
import { ProjectName } from "@/components/ui/project-name";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-10 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-wrap items-center gap-6 font-medium text-slate-600">
            <a href="#inicio" className="transition hover:text-emerald-600">
              Inicio
            </a>
            <a href="#beneficios" className="transition hover:text-emerald-600">
              Beneficios
            </a>
            <a href="#pqr" className="transition hover:text-emerald-600">
              PQR
            </a>
            <a href="#contacto" className="transition hover:text-emerald-600">
              Contacto
            </a>
          </div>
          <Link
            href="/login"
            className="rounded-full bg-emerald-400 px-5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Iniciar sesion
          </Link>
        </header>

        <header
          id="inicio"
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div className="flex flex-col gap-6">
            <ProjectName />
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
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Iniciar sesion
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

        <section id="beneficios">
          <FeatureGrid />
        </section>

        <section
          aria-labelledby="pqr"
          className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.5)] lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Sobre el curso
            </p>
            <h2
              id="pqr"
              className="text-balance text-3xl font-semibold text-slate-900"
            >
              Preguntas, quejas o reclamos con respuesta profesional.
            </h2>
            <p className="text-base text-slate-600">
              Somos un equipo dedicado a ofrecer una experiencia de aprendizaje
              confiable y cercana. Si tienes dudas sobre el curso, reportes o
              sugerencias de mejora, aqui centralizamos la atencion para
              responder con claridad y rapidez.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-sm text-slate-700">
            <p className="text-sm font-semibold text-slate-900">
              Canales de atencion
            </p>
            <ul className="flex list-disc flex-col gap-3 pl-5">
              <li>Respuestas en menos de 24 horas habiles.</li>
              <li>Seguimiento personalizado por correo o chat.</li>
              <li>Registro claro de cada solicitud.</li>
            </ul>
            <p>
              Escribenos y describe tu caso con el mayor detalle posible para
              darte una solucion precisa.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="contacto"
          className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.5)] lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Contacto
            </p>
            <h2
              id="contacto"
              className="text-balance text-3xl font-semibold text-slate-900"
            >
              Cuentanos como ayudarte y te contactamos pronto.
            </h2>
            <p className="text-base text-slate-600">
              Completa el formulario con tus datos y el motivo de tu mensaje.
              Nuestro equipo se pondra en contacto contigo a la mayor brevedad.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
    </div>
  );
};
