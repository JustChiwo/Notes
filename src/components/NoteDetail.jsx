import editIcon from '../assets/icons/edit.svg';
import NoteTimestamp from './NoteTimestamp.jsx';

function NoteDetail({ note, onClose, onEdit }) {
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-ink/50 p-3 sm:p-6"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <section
        aria-labelledby="note-detail-title"
        aria-modal="true"
        className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col rounded-2xl border border-white bg-paper shadow-[0_24px_70px_rgba(27,39,66,0.18)] sm:max-h-[calc(100dvh-3rem)]"
        role="dialog"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8 sm:py-6">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-semibold tracking-tight text-ink sm:text-2xl" id="note-detail-title">
              {note.title}
            </h2>
            <div className="mt-1">
              <NoteTimestamp note={note} />
            </div>
          </div>
          <button
            autoFocus
            className="shrink-0 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <p className="whitespace-pre-wrap break-words text-base leading-7 text-ink/80 sm:text-lg sm:leading-8">
            {note.content}
          </p>
        </div>
        <footer className="flex shrink-0 justify-end border-t border-line px-5 py-4 sm:px-8">
          <button
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20"
            onClick={() => onEdit(note)}
            type="button"
          >
            <img alt="" aria-hidden="true" className="size-4 brightness-0 invert" src={editIcon} />
            Edit note
          </button>
        </footer>
      </section>
    </div>
  );
}

export default NoteDetail;
