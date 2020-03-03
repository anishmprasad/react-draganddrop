import React from 'react';
import TaskManagement from './TaskManagement';
import EventCard from './Curriculam/Card';
import LaneComponent from './Curriculam/LaneComponent';

import { Card } from '@embibe/educo';
import './App.css';

function App() {
	return (
		<div className='task-management'>
			<Card type='block'>
				<TaskManagement
					lanes={[
						{ id: Math.random(), name: 'Card 1', editing: false, notes: [] },
						{
							id: Math.random(),
							name: 'Card 2',
							notes: []
						},
						{ id: Math.random(), name: 'Card 3', notes: [] },
						{ id: Math.random(), name: 'Card 4', notes: [] },
						{ id: Math.random(), name: 'Card 5', notes: [] }
					]}
					onEditLane={onEditLane => console.log(onEditLane)}
					onDeleteLane={onDeleteLane => console.log(onDeleteLane)}
					onMoveLane={onMoveLane => console.log('onMoveLane Notes', onMoveLane)}
					CardComponent={EventCard}
					LaneComponent={LaneComponent}
				/>
			</Card>
		</div>
	);
}

export default App;
