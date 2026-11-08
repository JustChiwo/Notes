function NoteTimestamp({ note }) {
  const updatedAt = note.updatedAt ?? note.updated_at;
  const createdAt = note.createdAt ?? note.created_at;
  const timestamp = updatedAt ?? createdAt;

  if (!timestamp) {
    return null;
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const label = updatedAt ? 'Updated' : 'Created';

  return (
    <time
      className="text-xs font-medium text-muted"
      dateTime={date.toISOString()}
    >
      {label} {date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
    </time>
  );
}

export default NoteTimestamp;
