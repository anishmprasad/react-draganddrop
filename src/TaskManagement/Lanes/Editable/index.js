// @flow

import React, { Component } from 'react';

function EditableComponent(props) {
	const handleDelete = () => {
		if (props.onDelete) props.onDelete(props.id);
	};

	const handleValueClick = () => {
		props.onValueClick(props.id);
	};

	const handleFinishEdit = e => {
		if (e.type === 'keypress' && e.key !== 'Enter') {
			return;
		}

		const value = e.target.value;

		if (props.onEdit && value.trim().length) {
			props.onEdit(props.id, value);
		}
	};

	const renderEdit = () => {
		return (
			<input
				type='text'
				className='editing'
				ref={Editable.selectToEnd}
				defaultValue={props.value}
				onBlur={handleFinishEdit}
				onKeyPress={handleFinishEdit}
			/>
		);
	};

	const renderDelete = () => {
		return (
			<span className='delete' onClick={handleDelete}>
				&times;
			</span>
		);
	};

	const renderValue = () => {
		return (
			<span>
				<input type='text' onClick={handleValueClick} defaultValue={props.value} readOnly />
				{props.onDelete ? renderDelete() : null}
			</span>
		);
	};

	if (props.editing) {
		return renderEdit();
	}

	return renderValue();
}
EditableComponent.selectToEnd = input => {
	if (input) input.focus();
};
export default class Editable extends React.Component {
	render() {
		const { children: EditableComponent, ...rest } = this.props;
		return React.cloneElement(EditableComponent, { ...rest });
	}
}

Editable.defaultProps = {
	children: <EditableComponent />
};
