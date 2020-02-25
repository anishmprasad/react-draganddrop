// @flow

import './index.scss';

import React from 'react';
import Note from './Note';
import Editable from '../Editable';

export default class Notes extends React.Component {
	render() {
		const notes = this.props.notes.map(note => {
			return (
				<Note id={note.id} key={note.id} onMoveNote={this.props.onMoveNote}>
					<Editable
						editing={note.editing}
						id={note.id}
						value={note.text}
						onDelete={this.props.onDeleteNote}
						onEdit={this.props.onEditNote}
						onValueClick={this.props.onValueClick}
					/>
				</Note>
			);
		});

		return <ul className='notes-list'>{notes}</ul>;
	}
}
