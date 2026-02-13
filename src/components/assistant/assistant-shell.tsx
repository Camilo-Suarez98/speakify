"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import AuthHeader from "@/components/assistant/auth-header";
import LearningAssistant from "@/components/learning-assistant";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type UserState = {
  displayName: string;
  provider: "supabase" | "nextauth";
};

export default function AssistantShell() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<UserState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const [{ data }, nextAuthSession] = await Promise.all([
        supabase.auth.getUser(),
        getSession(),
      ]);
      const supabaseUser = data.user;

      if (!active) {
        return;
      }

      if (supabaseUser) {
        const displayName =
          (supabaseUser.user_metadata.display_name as string | undefined) ??
          supabaseUser.email ??
          "Usuario";
        setUser({ displayName, provider: "supabase" });
        setIsLoading(false);
        return;
      }

      if (nextAuthSession?.user) {
        const displayName =
          nextAuthSession.user.name ?? nextAuthSession.user.email ?? "Usuario";
        setUser({ displayName, provider: "nextauth" });
        setIsLoading(false);
        return;
      }

      router.replace("/login");
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-16 lg:px-12">
          <p className="text-sm font-semibold text-slate-600">Cargando sesion...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <AuthHeader
        displayName={user?.displayName ?? "Usuario"}
        provider={user?.provider ?? "supabase"}
      />
      <main className="min-h-screen">
        <LearningAssistant />
      </main>
    </div>
  );
}
