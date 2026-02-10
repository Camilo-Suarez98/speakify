import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-center gap-4 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur sm:justify-between">
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
      </div>
      <Link
        href="/login"
        className="hidden rounded-full bg-emerald-400 px-5 py-2 text-xs font-semibold text-white sm:block transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
      >
        Iniciar sesion
      </Link>
    </header>
  );
};
