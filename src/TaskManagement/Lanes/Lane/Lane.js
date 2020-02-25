import React from 'react';
import Notes from '../Notes';
import Editable from '../Editable';

export default class Lane extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateNote = this.handleCreateNote.bind(this);
		this.handleDeleteLane = this.handleDeleteLane.bind(this);
		this.handleDeleteNote = this.handleDeleteNote.bind(this);

		this.state = {
			lane: props.lane,
			notes: props.notes
		};
	}

	handleCreateNote() {
		// this.props.lane.id
		let uuid = Math.random();
		// this.setState(
		// 	{
		// 		notes: this.state.notes.concat({
		// 			id: uuid,
		// 			editing: false,
		// 			text: `nothing-${uuid}`
		// 		})
		// 	},
		// 	() => console.log(this.state.notes)
		// );
		const notes = {
			id: uuid,
			editing: false,
			text: `nothing-${uuid}`
		};
		this.props.attachNotes(notes, uuid, this.props.lane.id);
		// this.props.createNote(notes);
		this.props.attachToLane(this.props.lane.id, uuid, 'blag');
	}

	handleDeleteLane() {
		const lane = this.props.lane;
		this.props.onDeleteLane(lane.id);
		lane.notes.forEach(noteId => this.props.onDeleteNote(null, noteId));
	}

	handleDeleteNote(noteId) {
		this.props.onDeleteNote(this.props.lane.id, noteId);
	}

	static getDerivedStateFromProps(props, state) {
		if (
			JSON.parse(JSON.stringify(state.lane)) !== JSON.parse(JSON.stringify(props.lane)) ||
			JSON.parse(JSON.stringify(state.notes)) !== JSON.parse(JSON.stringify(props.notes))
		) {
			return {
				lane: props.lane,
				notes: props.notes
			};
		}
		return null;
	}

	render() {
		const lane = this.state.lane;
		const allNotes = this.state.notes;
		const laneNotes = lane.notes.map(id => allNotes.find(note => note.id === id)).filter(note => note); // filter out undefined notes
		const connectDragSource = this.props.connectDragSource;
		const connectDragPreview = this.props.connectDragPreview;
		const connectDropTarget = this.props.connectDropTarget;
		// console.log('Lane', this.state, this.props, laneNotes);
		return connectDragPreview(
			connectDropTarget(
				<div className='lane'>
					<h2 className='lane__name'>
						<Editable
							editing={lane.editing}
							id={lane.id}
							value={lane.name}
							onEdit={this.props.onEditLane}
							onValueClick={this.props.onEditLane}
						/>
						<button className='lane__delete' onClick={this.handleDeleteLane}>
							-
						</button>
						{connectDragSource(<button className='lane__drag' />)}
					</h2>
					<Notes
						notes={laneNotes}
						onDeleteNote={this.handleDeleteNote}
						onEditNote={this.props.onEditNote}
						onValueClick={this.props.onEditNote}
						onMoveNote={this.props.onMove}
					/>
					<button className='add-note' onClick={this.handleCreateNote}>
						+ note
					</button>
				</div>
			)
		);
	}
}
