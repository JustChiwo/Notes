function Logo() {
  return (
    <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-brand">
      <span aria-hidden="true" className="flex -space-x-1">
        <span className="size-3 rounded-full border border-paper bg-brand" />
        <span className="size-3 rounded-full border border-paper bg-brand/70" />
      </span>
      MINO
    </div>
  );
}

export default Logo;
