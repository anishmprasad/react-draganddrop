import React from "react";

export default function LaneComponent(props) {
  const {
    connectDragPreview,
    connectDropTarget,
    connectDragSource,
    lane,
    laneNotes,
    Editable,
    Notes
  } = props;
  return connectDragPreview(
    connectDropTarget(
      <div className="lane">
        <h2 className="lane__name">
          <Editable
            editing={lane.editing}
            id={lane.id}
            value={lane.name}
            onEdit={props.onEditLane}
            onValueClick={props.onEditLane}
          />
          <button className="lane__delete" onClick={props.handleDeleteLane}>
            -
          </button>
          {connectDragSource(<button className="lane__drag" />)}
        </h2>
        <button className="add-note" onClick={props.handleCreateNote}>
          + note
        </button>
        <Notes
          notes={laneNotes}
          onDeleteNote={props.handleDeleteNote}
          onEditNote={props.onEditNote}
          onValueClick={props.onEditNote}
          onMoveNote={props.onMove}
          CardComponent={props.CardComponent}
        />
      </div>
    )
  );
}
