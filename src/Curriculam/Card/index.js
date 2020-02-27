import React from "react";
export default function Card({
  Note,
  Editable,
  note,
  onMoveNote,
  onDeleteNote,
  onValueClick,
  onEditNote
}) {
  return (
    <Note id={note.id} key={note.id} onMoveNote={onMoveNote}>
      <Editable
        editing={note.editing}
        id={note.id}
        value={note.text}
        onDelete={onDeleteNote}
        onEdit={onEditNote}
        onValueClick={onValueClick}
      >
        <Custom />
      </Editable>
    </Note>
  );
}

function Custom(props) {
  console.log("Custom", props);
  return <div>Hello</div>;
}
