import type { AssistantMode, ModeOption } from "@/types/assistant";

export const MODE_OPTIONS: ModeOption[] = [
  {
    id: "conversation",
    label: "Conversacion guiada",
    description: "Dialogos naturales con correcciones y sugerencias en contexto.",
  },
  {
    id: "grammar",
    label: "Gramatica practica",
    description: "Explicaciones claras, reglas y ejercicios con retroalimentacion.",
  },
  {
    id: "pronunciation",
    label: "Pronunciacion",
    description: "Trabajo por sonidos, ritmo y ejemplos claros para repetir.",
  },
  {
    id: "vocabulary",
    label: "Vocabulario util",
    description: "Palabras frecuentes, frases clave y repasos espaciados.",
  },
  {
    id: "exam",
    label: "Preparacion de examen",
    description: "Simulaciones, tips y refuerzo de puntos debiles.",
  },
];

export const GOAL_SUGGESTIONS = [
  "Viajar y conversar con confianza",
  "Mejorar gramatica para el trabajo",
  "Aprobar un examen en 3 meses",
  "Entender series y podcasts",
];

export const DEFAULT_MODE: AssistantMode = "conversation";
export const DEFAULT_LANGUAGE = "Ingles";
export const DEFAULT_LEVEL = "Intermedio";
