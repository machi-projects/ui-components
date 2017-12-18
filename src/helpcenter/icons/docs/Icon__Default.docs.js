import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

export default class Icon__Default extends Component {

	render() {

		return (

				<div>

						<Icon id="searchIcon" color="green" size="small" />

				</div>
		)
	}
	
}

if (__DOCS__) {
	Icon__Default.docs = {
		componentGroup: Icon.docs.componentGroup
	};
}
