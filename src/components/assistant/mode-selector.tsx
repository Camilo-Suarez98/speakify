import type { AssistantMode, ModeOption } from "@/types/assistant";

type ModeSelectorProps = {
  options: ModeOption[];
  value: AssistantMode;
  onChange: (value: AssistantMode) => void;
};

export default function ModeSelector({
  options,
  value,
  onChange,
}: ModeSelectorProps) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="sr-only">Modo de aprendizaje</legend>
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex flex-col gap-2 rounded-2xl border p-4 transition focus-within:outline focus-within:outline-offset-2 focus-within:outline-emerald-500 ${value === option.id
            ? "border-emerald-500 bg-emerald-50"
            : "border-slate-200 bg-white hover:border-emerald-300"
            }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900">{option.label}</p>
              <p className="text-sm text-slate-600">{option.description}</p>
            </div>
            <input
              type="radio"
              name="mode"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="mt-1 h-4 w-4 accent-emerald-600"
              aria-label={option.label}
            />
          </div>
        </label>
      ))}
    </fieldset>
  );
}
