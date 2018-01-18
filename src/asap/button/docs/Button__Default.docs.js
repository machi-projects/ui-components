import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../index';

export default class Button__Default extends Component {
	render() {
		return (

				<div>

						Button styles
						<Button> Hello machi </Button>


				</div>
		)
	}
}

if (__DOCS__) {
	Button__Default.docs = {
		componentGroup: Button.docs.componentGroup
	};
}
