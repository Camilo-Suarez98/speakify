interface ChooseLoginButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}

export function ChooseLoginButton({ children, onClick, active }: ChooseLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ${active
        ? "bg-emerald-400 text-white"
        : "text-slate-600 hover:text-slate-900"
        }`}
    >
      {children}
    </button>
  );
};
