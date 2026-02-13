"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectName } from "../ui/project-name";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type AuthHeaderProps = {
  displayName: string;
};

export default function AuthHeader({ displayName }: AuthHeaderProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="flex flex-col gap-1">
          <ProjectName />
          <h1 className="text-2xl font-semibold text-slate-900">
            Hola, {displayName}.
          </h1>
          <p className="text-sm text-slate-600">
            Tu espacio privado para practicar idiomas con IA.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="cursor-pointer rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningOut ? "Cerrando..." : "Cerrar sesion"}
          </button>
        </div>
      </div>
    </header>
  );
}
