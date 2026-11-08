import { useEffect, useRef } from 'react';
import Logo from './Logo.jsx';

function NoteList({ notes, onSelectNote, onClose }) {
  const sortedNotes = [...notes].sort((first, second) => {
    const firstDate = new Date(first.createdAt ?? first.created_at ?? 0).getTime();
    const secondDate = new Date(second.createdAt ?? second.created_at ?? 0).getTime();

    return secondDate - firstDate;
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="mb-3 shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        Your notes
      </h2>
      {sortedNotes.length === 0 ? (
        <p className="rounded-lg bg-content px-3 py-2 text-sm text-muted">No notes yet</p>
      ) : (
        <nav aria-label="Note titles" className="min-h-0 flex-1 space-y-1 overflow-y-auto">
          {sortedNotes.map((note) => (
            <button
              className="block w-full truncate rounded-lg px-3 py-2 text-left text-sm font-medium text-ink transition hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10"
              key={note.id ?? note._id}
              onClick={() => {
                onSelectNote(note);
                onClose();
              }}
              title={note.title}
              type="button"
            >
              {note.title}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function Sidebar({ notes, onSelectNote, mobileOpen, onClose }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (mobileOpen) {
      drawerRef.current?.querySelector('button')?.focus();
    }
  }, [mobileOpen]);

  return (
    <>
      <aside className="hidden h-full min-h-0 w-52 shrink-0 flex-col border-r border-line bg-paper px-5 py-6 md:flex">
        <div className="mb-8 shrink-0">
          <Logo />
          <h1 className="mt-4 text-lg font-bold tracking-tight text-ink">MY NOTES</h1>
        </div>
        <NoteList notes={notes} onSelectNote={onSelectNote} onClose={() => {}} />
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 md:hidden"
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              onClose();
            }
          }}
        >
          <aside
            aria-label="Notes menu"
            className="flex h-full w-[min(20rem,85vw)] flex-col bg-paper px-5 py-6 shadow-[0_24px_70px_rgba(27,39,66,0.18)]"
            onClick={(event) => event.stopPropagation()}
            aria-modal="true"
            id="mobile-notes-menu"
            ref={drawerRef}
            role="dialog"
          >
            <div className="mb-8 flex shrink-0 items-center justify-between">
              <div>
                <Logo />
                <h2 className="mt-3 text-lg font-bold tracking-tight text-ink">MY NOTES</h2>
              </div>
              <button
                aria-label="Close notes menu"
                className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-brand hover:bg-content focus:outline-none focus:ring-4 focus:ring-brand/10"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
            <NoteList notes={notes} onSelectNote={onSelectNote} onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
