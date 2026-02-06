const features = [
  {
    title: "Rutinas claras",
    description:
      "Planes semanales con objetivos medibles para que veas progreso real.",
  },
  {
    title: "Feedback amable",
    description:
      "Correcciones respetuosas y tips de pronunciacion sin presion.",
  },
  {
    title: "Accesible",
    description: "Contrastes claros, tipografia legible y navegacion simple.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title}>
          <h3 className="text-lg font-semibold text-slate-900">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
