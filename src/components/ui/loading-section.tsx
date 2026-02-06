export const LoadingSection = ({ text }: { text: string }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#ecfeff,#f8fafc_45%,#ffffff)] text-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        <p className="text-sm font-semibold text-slate-900">{text}</p>
      </div>
    </div>
  );
};
