"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type AuthMode = "login" | "register";

export function EmailAuthForm() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [mode, setMode] = useState<AuthMode>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (active && data.session) {
        router.replace("/assistant");
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [router, supabase.auth]);

  const resetFeedback = () => {
    setError(null);
    setMessage(null);
  };

  const resetPasswords = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();
    setIsLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/assistant");
    router.refresh();
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();

    if (password !== confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }

    setIsLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username.trim(),
        },
      },
    });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    resetPasswords();

    if (data.session) {
      router.push("/assistant");
      router.refresh();
      return;
    }

    setMessage(
      "Cuenta creada. Revisa tu correo para confirmar el registro antes de iniciar sesion."
    );
  };

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
      <div className="flex rounded-full bg-white p-1 ring-1 ring-slate-200">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            resetFeedback();
          }}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ${mode === "login"
            ? "bg-emerald-400 text-white"
            : "text-slate-600 hover:text-slate-900"
            }`}
        >
          Iniciar sesion
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("register");
            resetFeedback();
          }}
          className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "register"
            ? "bg-emerald-400 text-white"
            : "text-slate-600 hover:text-slate-900"
            }`}
        >
          Crear usuario
        </button>
      </div>

      <form
        onSubmit={mode === "login" ? handleLogin : handleRegister}
        className="flex flex-col gap-4"
      >
        {mode === "register" ? (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Nombre de usuario
            </span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Tu nombre"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
              required
            />
          </label>
        ) : null}

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">Usuario</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu-correo@ejemplo.com"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
            autoComplete="email"
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">Contrasena</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={6}
            required
          />
        </label>

        {mode === "register" ? (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Confirmar contrasena
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
        ) : null}

        {password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 ? <p className="text-sm text-rose-600">Las contrasenas no coinciden.</p> : null}
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full cursor-pointer rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading
            ? "Procesando..."
            : mode === "login"
              ? "Iniciar sesion"
              : "Crear usuario"}
        </button>
      </form>
    </section>
  );
}
