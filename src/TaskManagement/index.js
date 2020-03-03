import React, { Component } from 'react';
import Lanes from './Lanes';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { connect } from 'react-redux';

class TaskManagement extends Component {
	render() {
		return (
			<DndProvider backend={HTML5Backend}>
				<Lanes
					{...this.props}
					CardComponent={this.props.CardComponent}
					LaneComponent={this.props.LaneComponent}
				/>
			</DndProvider>
		);
	}
}

TaskManagement.defaultProps = {
	lanes: [
		{ id: Math.random(), name: 'Lane 1', editing: false, notes: [] },
		{
			id: Math.random(),
			name: 'Lane 2',
			notes: []
		},
		{ id: Math.random(), name: 'Lane 3', notes: [] }
	],
	onEditLane: onEditLane => console.log(onEditLane),
	onDeleteLane: onDeleteLane => console.log(onDeleteLane),
	onMoveLane: onMoveLane => console.log('onMoveLane Notes', onMoveLane)
};

export default TaskManagement;
