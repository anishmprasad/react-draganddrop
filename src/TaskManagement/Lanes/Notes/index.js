import './index.scss';

import React from 'react';
import Note from './Note';
import Editable from '../Editable';

function CardComponent({ note, onMoveNote, onDeleteNote, onEditNote, onValueClick }) {
	return (
		<Note id={note.id} key={note.id} onMoveNote={onMoveNote}>
			<Editable
				editing={note.editing}
				id={note.id}
				value={note.text}
				onDelete={onDeleteNote}
				onEdit={onEditNote}
				onValueClick={onValueClick}
			/>
		</Note>
	);
}

export default class Notes extends React.Component {
	render() {
		const { CardComponent, notes } = this.props;
		console.log(this.props);
		return (
			<ul className='notes-list'>
				{notes.map(note => {
					return React.cloneElement(<CardComponent />, { note, Editable, Note, ...this.props });
				})}
			</ul>
		);
	}
}
Notes.defaultProps = {
	CardComponent: CardComponent
};
