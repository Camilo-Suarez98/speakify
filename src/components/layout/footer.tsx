export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 py-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 text-xs text-slate-500 lg:px-12">
        <span>© {year} Speakify. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}