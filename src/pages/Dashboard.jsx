import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import createIcon from "../assets/icons/create.svg";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";
import { createNote, deleteNote, getNotes, logout, updateNote } from "../api/api.js";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import EmptyState from "../components/EmptyState.jsx";
import NoteDetail from "../components/NoteDetail.jsx";
import NoteTimestamp from "../components/NoteTimestamp.jsx";
import NoteEditor from "../components/NoteEditor.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editorError, setEditorError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const contentInputRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredNotes = normalizedSearchQuery
    ? notes.filter((note) => (
      `${note.title ?? ""}\n${note.content ?? ""}`.toLocaleLowerCase().includes(normalizedSearchQuery)
    ))
    : notes;

  useEffect(() => {
    let isMounted = true;

    getNotes()
      .then((result) => {
        if (isMounted) {
          setNotes(result);
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setNotesLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleSelectNote(note) {
    setSelectedNote(note);
  }

  function resetEditor() {
    setTitle("");
    setContent("");
    setEditorError("");
    setTitleError("");
    setContentError("");
    setEditingNote(null);
    setDiscardConfirmationOpen(false);
    setEditorOpen(false);
  }

  function openEditor() {
    setTitle("");
    setContent("");
    setEditorError("");
    setTitleError("");
    setContentError("");
    setEditingNote(null);
    setEditorOpen(true);
  }

  function openEditEditor(note) {
    setSelectedNote(null);
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
    setEditorError("");
    setTitleError("");
    setContentError("");
    setEditorOpen(true);
  }

  function requestEditorClose() {
    if (saving) {
      return;
    }

    // Keep typed text until the user confirms they want to discard it.
    const hasChanges = editingNote
      ? title !== editingNote.title || content !== editingNote.content
      : Boolean(title.trim() || content.trim());

    if (hasChanges) {
      setDiscardConfirmationOpen(true);
    } else {
      resetEditor();
    }
  }

  async function handleDelete() {
    if (deleting || !deleteTarget) {
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      await deleteNote(deleteTarget.id ?? deleteTarget._id);
      setNotes((currentNotes) =>
        currentNotes.filter((note) => (note.id ?? note._id) !== (deleteTarget.id ?? deleteTarget._id)),
      );
      setDeleteTarget(null);
    } catch (requestError) {
      setDeleteError(requestError.message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    setEditorError("");

    // Validate both fields before sending the note.
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const hasTitleError = !trimmedTitle;
    const hasContentError = !trimmedContent;
    setTitleError(hasTitleError ? "Please enter a title." : "");
    setContentError(hasContentError ? "Content can't be empty." : "");

    if (hasTitleError || hasContentError) {
      if (hasContentError) {
        contentInputRef.current?.focus();
      }
      return;
    }

    setSaving(true);

    try {
      if (editingNote) {
        const noteId = editingNote.id ?? editingNote._id;
        const updatedNote = await updateNote(noteId, {
          title: trimmedTitle,
          content: trimmedContent,
        });
        setNotes((currentNotes) =>
          currentNotes.map((note) => (
            (note.id ?? note._id) === noteId ? updatedNote : note
          )),
        );
      } else {
        const newNote = await createNote(trimmedTitle, trimmedContent);
        setNotes((currentNotes) => [newNote, ...currentNotes]);
      }
      resetEditor();
    } catch (requestError) {
      setEditorError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setError("");
    setLoading(true);

    try {
      await logout();
      clearUser();
      navigate("/login");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout
      error={error}
      loading={loading}
      notes={notes}
      onLogout={handleLogout}
      onSelectNote={handleSelectNote}
      userEmail={user.email}
    >
      <div className="mb-5 hidden shrink-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between md:flex">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">Your workspace</p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">My Notes</h2>
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20 sm:w-auto"
          onClick={openEditor}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-4 brightness-0 invert" src={createIcon} />
          Create new note
        </button>
      </div>

      {notesLoading ? (
        <section className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-white bg-paper px-6 py-12 text-center text-sm text-muted shadow-[0_8px_28px_rgba(27,39,66,0.04)]">
          Loading notes...
        </section>
      ) : notes.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <label className="mb-4 block w-full shrink-0">
            <span className="sr-only">Search notes by title or content</span>
            <input
              className="w-full rounded-[10px] border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/10"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search notes by title or content..."
              type="search"
              value={searchQuery}
            />
          </label>
          {filteredNotes.length === 0 ? (
            <section className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-white bg-paper px-6 py-12 text-center text-sm text-muted shadow-[0_8px_28px_rgba(27,39,66,0.04)]">
              No notes match: {searchQuery.trim()}
            </section>
          ) : (
            <section aria-label="Your notes" className="grid min-h-0 min-w-0 flex-1 auto-rows-min grid-cols-1 gap-3 overflow-y-auto pb-24 md:gap-4 md:pb-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredNotes.map((note, index) => (
                <article
                  className="flex h-40 min-w-0 shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper p-3 shadow-[0_8px_28px_rgba(27,39,66,0.04)] transition duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_12px_32px_rgba(27,39,66,0.12)] md:h-56 md:p-5"
                  key={note.id ?? note._id ?? `${note.title}-${index}`}
                >
                  {/* Fixed heights keep long notes from changing the grid layout. */}
                  <button
                    aria-label={`Open ${note.title}`}
                    className="flex min-h-0 min-w-0 flex-1 cursor-pointer flex-col overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                    onClick={() => handleSelectNote(note)}
                    type="button"
                  >
                    <h3 className="w-full shrink-0 truncate text-base font-semibold leading-6 text-ink md:text-lg">{note.title}</h3>
                    <p className="mt-1 min-h-0 min-w-0 flex-none overflow-hidden whitespace-pre-wrap break-words text-sm leading-5 text-ink/75 line-clamp-2 md:mt-3 md:leading-6 md:line-clamp-3">
                      {note.content}
                    </p>
                  </button>
                  <div className="mt-2 flex w-full shrink-0 items-center justify-between gap-2">
                    <NoteTimestamp note={note} />
                    <div className="flex shrink-0 gap-2">
                      <button
                        aria-label={`Edit ${note.title}`}
                        className="flex items-center gap-1.5 rounded-lg border border-white bg-paper px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/50"
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditEditor(note);
                        }}
                        type="button"
                      >
                        <img alt="" aria-hidden="true" className="size-4" src={editIcon} />
                        Edit
                      </button>
                      <button
                        aria-label={`Delete ${note.title}`}
                        className="flex items-center rounded-lg bg-white p-1.5 text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-200"
                        onClick={(event) => {
                          event.stopPropagation();
                          setDeleteError("");
                          setDeleteTarget(note);
                        }}
                        type="button"
                      >
                        <img alt="" aria-hidden="true" className="size-4" src={deleteIcon} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </>
      )}

      <button
        className="fixed bottom-6 left-1/2 z-20 flex w-44 -translate-x-1/2 items-center justify-center gap-2 rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(27,39,66,0.18)] transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20 md:hidden"
        onClick={openEditor}
        type="button"
      >
        <img alt="" aria-hidden="true" className="size-4 brightness-0 invert" src={createIcon} />
        Add Note
      </button>

      {editorOpen && (
        <NoteEditor
          content={content}
          contentError={contentError}
          contentRef={contentInputRef}
          error={editorError}
          heading={editingNote ? "Edit note" : "Create new note"}
          onContentChange={(nextContent) => {
            setContent(nextContent);
            setContentError("");
          }}
          onDiscard={requestEditorClose}
          onRequestClose={requestEditorClose}
          onSave={handleSave}
          onTitleChange={(nextTitle) => {
            setTitle(nextTitle);
            setTitleError("");
          }}
          saving={saving}
          title={title}
          titleError={titleError}
        />
      )}

      {selectedNote && (
        <NoteDetail
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onEdit={openEditEditor}
        />
      )}

      {discardConfirmationOpen && (
        <ConfirmDialog
          cancelLabel="Keep editing"
          confirmLabel="Yes, discard"
          message="Are you sure you want to discard? All your changes won't be saved."
          onCancel={() => setDiscardConfirmationOpen(false)}
          onConfirm={resetEditor}
          title="Discard this note?"
        />
      )}
      {deleteTarget && (
        <ConfirmDialog
          cancelLabel="Cancel"
          confirmLabel="Yes, delete"
          error={deleteError}
          loading={deleting}
          message="This can't be undone."
          onCancel={() => {
            setDeleteTarget(null);
            setDeleteError("");
          }}
          onConfirm={handleDelete}
          title="Delete this note?"
        />
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
