import type { ModeOption } from "@/types/assistant";
import { ProjectName } from "../ui/project-name";

type AssistantHeaderProps = {
  goalSuggestions: string[];
  goal: string;
  onGoalSelect: (goal: string) => void;
  targetLanguage: string;
  level: string;
  activeMode: ModeOption | null;
};

export default function AssistantHeader({
  goalSuggestions,
  goal,
  onGoalSelect,
  targetLanguage,
  level,
  activeMode,
}: AssistantHeaderProps) {
  return (
    <header className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex max-w-2xl flex-col gap-6">
        <ProjectName />
        <h1 className="text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">
          Crea tu ruta de aprendizaje de idiomas con una IA cercana y efectiva.
        </h1>
        <p className="text-lg text-slate-600">
          Elige tu estilo de aprendizaje, define metas reales y conversa con un
          asistente que adapta cada sesion a tu ritmo.
        </p>
        <div className="flex flex-wrap gap-3">
          {goalSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onGoalSelect(suggestion)}
              className={`rounded-full px-4 py-2 text-sm transition cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 border ${goal === suggestion
                ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400"
                }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-slate-900">
            Resumen de tu perfil
          </p>
          <div className="grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Idioma objetivo</span>
              <span className="font-semibold text-slate-900">
                {targetLanguage}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Nivel</span>
              <span className="font-semibold text-slate-900">{level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Modo</span>
              <span className="font-semibold text-slate-900">
                {activeMode?.label ?? "Conversacion guiada"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Meta principal</p>
            <p className="mt-2">{goal}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
