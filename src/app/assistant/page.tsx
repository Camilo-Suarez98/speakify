import { auth } from "@/auth";
import LearningAssistant from "@/components/learning-assistant";
import AuthHeader from "@/components/assistant/auth-header";
import { redirect } from "next/navigation";

export default async function AssistantPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const displayName = session.user.name ?? session.user.email ?? "Usuario";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <AuthHeader displayName={displayName} />

      <main className="min-h-screen">
        <LearningAssistant />
      </main>
    </div>
  );
}
