function ConfirmDialog({ onDiscard, onKeepEditing }) {
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onKeepEditing();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      onKeepEditing();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <section
        aria-labelledby="discard-title"
        aria-modal="true"
        className="my-auto w-full max-w-md rounded-2xl border border-white bg-paper p-6 shadow-[0_24px_70px_rgba(27,39,66,0.18)] sm:p-8"
        role="alertdialog"
      >
        <h2 className="text-xl font-semibold text-ink" id="discard-title">Discard this note?</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Are you sure you want to discard? All your changes won&apos;t be saved.
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            autoFocus
            className="rounded-[10px] border border-line px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10"
            onClick={onKeepEditing}
            type="button"
          >
            Keep editing
          </button>
          <button
            className="rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20"
            onClick={onDiscard}
            type="button"
          >
            Yes, discard
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
