// @flow

import Lane from "./Lane";
// import lanesActions from '../redux/actions/lanes';
// import notesActions from '../redux/actions/notes';
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import * as itemTypes from "../constants/itemTypes";

const laneSource = {
  beginDrag(props) {
    const item = {
      id: props.lane.id
    };

    return item;
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const laneTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.lane.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const sourceType = monitor.getItemType();
    if (!targetProps.lane.notes.length && sourceType === itemTypes.NOTE) {
      targetProps.attachToLane(targetId, sourceId, "here");
    } else if (targetId !== sourceId && sourceType === itemTypes.LANE) {
      targetProps.onMoveLane(sourceId, targetId, "MOVE_LANE");
    }
  }
};

const collectDragSource = (DnDconnect, monitor) => ({
  connectDragSource: DnDconnect.dragSource(),
  connectDragPreview: DnDconnect.dragPreview(),
  isDragging: monitor.isDragging()
});

const collectDropTarget = DnDconnect => ({
  connectDropTarget: DnDconnect.dropTarget()
});

const mapStateToProps = state => {
  // console.log('mapStateToProps', state);
  return {
    allNotes: state.notes
  };
};

const mapDispatchToProps = dispatch => ({
  onCreateNote(laneId) {
    // const newNote = notesActions.createNote('New note');
    // dispatch(newNote);
    console.log("mapDispatchToProps", laneId);
    // dispatch(lanesActions.attachToLane(laneId, newNote.payload.id));
  },

  // Used both to detach a note from a lane and delete all the notes when a
  // lane is removed
  onDeleteNote(laneId, noteId) {
    // dispatch(notesActions.deleteNote(noteId));

    if (laneId) {
      console.log("onDeleteNote");
      // dispatch(lanesActions.detachFromLane(laneId, noteId));
    }
  },

  onEditNote(noteId, value) {
    const updatedNote = {
      id: noteId
    };

    if (value) {
      updatedNote.text = value;
      updatedNote.editing = false;
    } else {
      updatedNote.editing = true;
    }

    // dispatch(notesActions.updateNote(updatedNote));
  }
});

export default DragSource(
  itemTypes.LANE,
  laneSource,
  collectDragSource
)(
  DropTarget(
    [itemTypes.NOTE, itemTypes.LANE],
    laneTarget,
    collectDropTarget
  )(Lane)
);
