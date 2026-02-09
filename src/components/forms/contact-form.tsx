"use client";

import { useState } from "react";
import { Forminit } from "forminit";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const formId = process.env.NEXT_PUBLIC_FORMINIT_FORM_ID;
  const forminit = new Forminit({
    proxyUrl: "/api/forminit"
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    if (!formId) {
      setStatus("error");
      setError("Falta configurar el Form ID.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const { error: submitError } = await forminit.submit(formId, formData);

    if (submitError) {
      setStatus("error");
      setError(submitError.message);
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      < label className="grid gap-2 text-sm font-medium text-slate-700">
        Nombre
        < input
          type="text"
          name="fi-sender-firstName"
          required
          placeholder="Tu nombre"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </label >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Apellido
        < input
          type="text"
          name="fi-sender-lastName"
          required
          placeholder="Tu apellido"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </label >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Correo electronico
        < input
          type="email"
          name="fi-sender-email"
          required
          placeholder="correo@ejemplo.com"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </label >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Telefono
        < input
          type="tel"
          name="fi-sender-phone"
          pattern="^\\+\\d{10,15}$\"
          placeholder="+12025550123"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
        <span className="text-xs text-slate-500">
          Usa formato internacional E.164(ej: +12025550123).
        </span >
      </label >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Mensaje
        < textarea
          name="fi-text-message"
          rows={4}
          required
          placeholder="Cuentanos en que podemos ayudarte"
          className="resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </label >
      {status === "error" && (
        < p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700\">
          {error}
        </p >
      )
      }
      {
        status === "success" && (
          < p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Mensaje enviado.Te contactaremos pronto.
          </p >
        )
      }
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button >
    </form >
  );
}
