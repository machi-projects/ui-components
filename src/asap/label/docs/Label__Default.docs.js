import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../index';

export default class Label__Default extends Component {
	render() {
		return (
			<div>
				<Label> primary </Label>

				<Label styleId="primary"> primary </Label>

				<Label styleId="info"> info </Label>

				<Label styleId="warning"> warning </Label>
			</div>
		);
	}
}

if (__DOCS__) {
	Label__Default.docs = {
		componentGroup: Label.docs.componentGroup
	};
}
