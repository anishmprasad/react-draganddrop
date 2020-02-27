import React, { Component } from 'react';
import Lane from './Lane';
import './index.scss';

export default class Lanes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lanes: props.lanes,
			notes: []
		};
	}
	// static getDerivedStateFromProps(props, state) {
	// 	console.log('getDerivedStateFromProps', props.lanes, state.lanes);
	// 	return {
	// 		lanes: state.lanes
	// 	};
	// }
	attachToLane = (laneId, noteId, where) => {
		// console.log('attachToLane', uuid, laneId, where);
		// const noteId = uuid;
		let noteIndex;
		// console.log(this.state.lanes, noteId);
		let updatedLane = this.state.lanes.map(lane => {
			// console.log(lane.notes, noteId, where);
			noteIndex = lane.notes.indexOf(noteId);
			if (noteIndex !== -1) {
				debugger;
				return Object.assign({}, lane, {
					notes: lane.notes.filter(id => id !== noteId)
				});
			}

			if (lane.id === laneId) {
				return Object.assign({}, lane, {
					notes: lane.notes.concat(noteId)
				});
			}
			// console.log(this.state.lanes);

			return lane;
		});
		this.setState({ lanes: updatedLane });
	};
	updateOnMove = (sourceId, targetId, key) => {
		switch (key) {
			case 'MOVE_NOTE': {
				const sourceLane = this.state.lanes.filter(lane => lane.notes.indexOf(sourceId) !== -1)[0];
				const targetLane = this.state.lanes.filter(lane => lane.notes.indexOf(targetId) !== -1)[0];
				const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
				const targetNoteIndex = targetLane.notes.indexOf(targetId);
				if (sourceLane.id === targetLane.id) {
					return this.state.lanes.map(lane => {
						if (lane.id === sourceLane.id) {
							const notesWithoutSource = sourceLane.notes.filter(
								(note, index) => index !== sourceNoteIndex
							);
							const notesWithTarget = notesWithoutSource.slice();
							notesWithTarget.splice(targetNoteIndex, 0, sourceId);

							return Object.assign({}, lane, {
								notes: notesWithTarget
							});
						}

						return lane;
					});
				}

				return this.state.lanes.map(lane => {
					if (lane.id === sourceLane.id) {
						// console.log('lane.id === sourceLane.id');
						return Object.assign({}, lane, {
							notes: lane.notes.filter((note, index) => index !== sourceNoteIndex)
						});
					}

					if (lane.id === targetLane.id) {
						// console.log('lane.id === targetLane.id');
						const notesWithTarget = lane.notes.slice();
						notesWithTarget.splice(targetNoteIndex, 0, sourceId);

						return Object.assign({}, lane, {
							notes: notesWithTarget
						});
					}

					return lane;
				});
			}

			case 'MOVE_LANE': {
				const sourceLane = this.state.lanes.find(lane => lane.id === sourceId);
				const sourceLaneIndex = this.state.lanes.findIndex(lane => lane.id === sourceId);
				const targetLaneIndex = this.state.lanes.findIndex(lane => lane.id === targetId);

				if (!sourceLane) return this.state.lanes;

				const lanesWithoutSource = this.state.lanes.filter((lane, index) => index !== sourceLaneIndex);
				const lanesWithTarget = lanesWithoutSource.slice();
				lanesWithTarget.splice(targetLaneIndex, 0, sourceLane);

				return lanesWithTarget;
			}

			default:
				break;
		}
	};
	onMove = (sourceId, targetId, key) => {
		const updatedLane = this.updateOnMove(sourceId, targetId, key);
		console.log('updatedLaneonMove', updatedLane);
		this.setState({ lanes: updatedLane });
	};
	attachNotes = notes => this.setState({ notes: this.state.notes.concat(notes) });
	laneOperations = (laneId, noteId, key, lane) => {
		switch (key) {
			case 'CREATE_LANE':
				return this.state.lanes.concat(lane);
				break;
			case 'UPDATE_LANE':
				// return this.state.lanes.map(lane => {
				// 	if (lane.id === action.payload.id) {
				// 		return Object.assign({}, lane, action.payload);
				// 	}

				// 	return lane;
				// });
				break;
			case 'DELETE_LANE':
				// return this.state.lanes.filter(lane => lane.id !== action.payload.id);
				break;

			case 'DETACH_FROM_LANE': {
				return this.state.lanes.map(lane => {
					if (lane.id === laneId) {
						return Object.assign({}, lane, {
							notes: lane.notes.filter(id => id !== noteId)
						});
					}

					return lane;
				});
			}

			default:
				break;
		}
	};
	render() {
		const lanes = this.state.lanes.map(lane => (
			<Lane
				key={lane.id}
				lane={lane}
				onEditLane={this.props.onEditLane}
				onDeleteLane={this.props.onDeleteLane}
				onMove={this.onMove}
				notes={this.state.notes}
				attachToLane={this.attachToLane}
				attachNotes={this.attachNotes}
			/>
		));

		return <div className='lanes'>{lanes}</div>;
	}
}
