function SubmitButton({ disabled, children }) {
  return (
    <button
      className="w-full rounded-[10px] bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
