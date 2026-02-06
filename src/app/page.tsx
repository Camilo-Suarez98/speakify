import type { Metadata } from "next";
import LearningAssistant from "@/components/learning-assistant";

export const metadata: Metadata = {
  title: "Speakify | Asistente de aprendizaje de idiomas",
  description:
    "Crea una ruta personalizada para aprender idiomas con una IA que adapta conversaciones, gramatica y ejercicios a tu nivel.",
  keywords: [
    "aprendizaje de idiomas",
    "asistente de idiomas",
    "IA educativa",
    "practicar conversacion",
    "gramatica",
  ],
  openGraph: {
    title: "Speakify | Asistente de aprendizaje de idiomas",
    description:
      "Personaliza tu aprendizaje con conversaciones y ejercicios guiados por IA.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speakify | Asistente de aprendizaje de idiomas",
    description:
      "Personaliza tu aprendizaje con conversaciones y ejercicios guiados por IA.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <main className="min-h-screen">
        <LearningAssistant />
      </main>
    </div>
  );
}
