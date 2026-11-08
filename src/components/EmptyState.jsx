function EmptyState() {
  return (
    <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-white bg-paper px-6 py-12 text-center shadow-[0_8px_28px_rgba(27,39,66,0.04)] sm:min-h-96">
      <div aria-hidden="true" className="mb-6 flex items-center gap-2">
        <span className="size-3 rounded-full bg-note-yellow" />
        <span className="size-3 rounded-full bg-note-pink" />
        <span className="size-3 rounded-full bg-note-blue" />
      </div>
      <h3 className="text-lg font-semibold text-ink">A little room for your ideas</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
        Your private notes will be here.
      </p>
    </section>
  );
}

export default EmptyState;
