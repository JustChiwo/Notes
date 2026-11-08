function NoteEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onDiscard,
  onRequestClose,
  saving,
  error,
  titleError,
  contentError,
  contentRef,
  heading,
}) {
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onRequestClose();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onRequestClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-ink/40 p-4 sm:p-6"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <section
        aria-labelledby="note-editor-title"
        aria-modal="true"
        className="my-auto w-full max-w-xl rounded-2xl border border-white bg-paper p-6 shadow-[0_24px_70px_rgba(27,39,66,0.18)] sm:p-8"
        role="dialog"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-ink" id="note-editor-title">
          {heading}
        </h2>
        <form className="mt-6 space-y-5" onSubmit={onSave}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="note-title">
              Title
            </label>
            <input
              autoFocus
              className="w-full rounded-[10px] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
              id="note-title"
              aria-invalid={Boolean(titleError)}
              onChange={(event) => onTitleChange(event.target.value)}
              type="text"
              value={title}
            />
            {titleError && <p className="mt-2 text-sm font-medium text-red-600" role="alert">{titleError}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="note-content">
              Content
            </label>
            <textarea
              className="min-h-48 w-full resize-y rounded-[10px] border border-line bg-white px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
              id="note-content"
              aria-invalid={Boolean(contentError)}
              onChange={(event) => onContentChange(event.target.value)}
              ref={contentRef}
              value={content}
            />
            {contentError && <p className="mt-2 text-sm font-medium text-red-600" role="alert">{contentError}</p>}
          </div>

          {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button
              className="rounded-[10px] border border-line px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving}
              onClick={onDiscard}
              type="button"
            >
              Discard
            </button>
            <button
              className="rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving}
              type="submit"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NoteEditor;
