import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FreezeLayer from '../FreezeLayer';

export default class FreezeLayer__Default extends Component {
	render() {
		return (
			<div>
				<FreezeLayer
					zIndexLevel="max_level_2"
					onClick={ev => {
						console.log(' default ', 'onClicked ');
					}}
					onEscKeyUp={ev => {
						console.log(' default ', ev.keyCode);
					}}
				/>

				<FreezeLayer
					styleId="myfreeze"
					zIndexLevel="max_level_1"
					onClick={ev => {
						console.log(' myfreeze ', 'onClicked ');
					}}
					onEscKeyUp={ev => {
						console.log(' myfreeze ', ev.keyCode);
					}}
				/>
			</div>
		);
	}
}

if (__DOCS__) {
	FreezeLayer__Default.docs = {
		componentGroup: FreezeLayer.docs.componentGroup
	};
}
