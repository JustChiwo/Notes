import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote, deleteNote, getNotes, logout, updateNote } from "../api/api.js";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import EmptyState from "../components/EmptyState.jsx";
import NoteEditor from "../components/NoteEditor.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const noteColors = [
  "md:bg-note-yellow",
  "md:bg-note-pink",
  "md:bg-note-blue",
];

function Dashboard() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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
      onLogout={handleLogout}
      userEmail={user.email}
    >
      <div className="mb-5 hidden shrink-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between md:flex">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">Your workspace</p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">My Notes</h2>
        </div>
        <button
          className="w-full rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20 sm:w-auto"
          onClick={openEditor}
          type="button"
        >
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
        <section aria-label="Your notes" className="grid min-h-0 flex-1 auto-rows-min grid-cols-1 gap-3 overflow-y-auto pb-24 md:gap-4 md:pb-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {notes.map((note, index) => (
            <article
              className={`flex min-h-28 flex-col rounded-2xl border border-line bg-paper p-3 shadow-[0_8px_28px_rgba(27,39,66,0.04)] md:min-h-56 md:border-transparent md:p-5 ${noteColors[index % noteColors.length]}`}
              key={note.id ?? note._id ?? `${note.title}-${index}`}
            >
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-base font-semibold leading-6 text-ink md:line-clamp-2 md:text-lg">{note.title}</h3>
                <p className="mt-1 line-clamp-2 whitespace-pre-wrap break-words text-sm leading-5 text-ink/75 md:mt-3 md:line-clamp-none md:leading-6">
                  {note.content}
                </p>
              </div>
              <div className="mt-2 flex self-end gap-2">
                <button
                  aria-label={`Edit ${note.title}`}
                  className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-brand transition hover:border-brand hover:bg-white/40 focus:outline-none focus:ring-4 focus:ring-brand/10"
                  onClick={(event) => {
                    event.stopPropagation();
                    openEditEditor(note);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <button
                  aria-label={`Delete ${note.title}`}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
                  onClick={(event) => {
                    event.stopPropagation();
                    setDeleteError("");
                    setDeleteTarget(note);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <button
        className="fixed bottom-6 left-1/2 z-20 w-44 -translate-x-1/2 rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(27,39,66,0.18)] transition hover:bg-brand/90 focus:outline-none focus:ring-4 focus:ring-brand/20 md:hidden"
        onClick={openEditor}
        type="button"
      >
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
