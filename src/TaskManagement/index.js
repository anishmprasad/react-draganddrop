import React, { Component } from 'react';
import Lanes from './Lanes';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { connect } from 'react-redux';

// console.log(DragDropContext);
class TaskManagement extends Component {
	render() {
		return (
			<DndProvider backend={HTML5Backend}>
				<Lanes
					lanes={[
						{ id: Math.random(), name: 'Todo', editing: false, notes: [] },
						{
							id: Math.random(),
							name: 'Active',
							notes: []
						},
						{ id: Math.random(), name: 'Active', notes: [] }
					]}
					onEditLane={onEditLane => console.log(onEditLane)}
					onDeleteLane={onDeleteLane => console.log(onDeleteLane)}
					onMoveLane={onMoveLane => console.log('onMoveLane Notes', onMoveLane)}
				/>
			</DndProvider>
		);
	}
}

export default TaskManagement;
