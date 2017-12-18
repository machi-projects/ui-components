import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputButton from '../InputButton';

export default class InputButton__Default extends Component {
	render() {
		return (
			<div>
				<InputButton type="radio" name="red" defaultChecked={false} /> Apple
				<InputButton type="radio" name="red" defaultChecked={false} /> Banana
				<InputButton type="radio" name="red" defaultChecked={true} /> Coffee
				<b> Input button + custom styles </b>
			</div>
		);
	}
}

if (__DOCS__) {
	InputButton__Default.docs = {
		componentGroup: InputButton.docs.componentGroup
	};
}
