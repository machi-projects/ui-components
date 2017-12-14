import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return <div style={{ background: '#007fff', minHeight: '1rem', marginBottom: '1rem' }} />;
}
export default class Layout__FixedLeftPanel extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Grid style={{ width: '100%' }}>
				<View style={{ height: '100vh' }}>
					<div
						style={{
							width: '300px',
							marginRight: '5px',
							background: '#007fff'
						}}
					/>
					<Box
						xs
						sm
						md
						lg
						style={{
							height: '100vh',
							background: '#007fff'
						}}
					/>
				</View>
			</Grid>
		);
	}
}
if (__DOCS__) {
	Layout__FixedLeftPanel.docs = {
		componentGroup: 'Template'
	};
}
