function IconButton({ children, label, onClick, danger = false }) {
  return (
    <button
      className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-slate-300 text-slate-600 hover:border-slate-950 hover:text-slate-950"
      }`}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export default IconButton;
