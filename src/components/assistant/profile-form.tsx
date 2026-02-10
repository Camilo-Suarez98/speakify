import type { ChangeEvent } from "react";
import { LANGUAGE_OPTIONS } from "@/config/assistant-config";

type ProfileFormProps = {
  targetLanguage: string;
  level: string;
  onTargetLanguageChange: (value: string) => void;
  onLevelChange: (value: string) => void;
};

export default function ProfileForm({
  targetLanguage,
  level,
  onTargetLanguageChange,
  onLevelChange,
}: ProfileFormProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">
        Personaliza tu sesion
      </h3>
      <form className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Idioma objetivo
          <select
            value={targetLanguage}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              onTargetLanguageChange(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Nivel actual
          <select
            value={level}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              onLevelChange(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
        </label>
      </form>
    </div>
  );
};
