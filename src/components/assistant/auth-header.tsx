"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

type AuthHeaderProps = {
  displayName: string;
};

export default function AuthHeader({ displayName }: AuthHeaderProps) {
  return (
    <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Speakify
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Hola, {displayName}.
          </h1>
          <p className="text-sm text-slate-600">
            Tu espacio privado para practicar idiomas con IA.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Inicio
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="cursor-pointer rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </header>
  );
}
