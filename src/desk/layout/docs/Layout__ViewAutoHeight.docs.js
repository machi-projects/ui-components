import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return <div style={{ background: '#007fff', minHeight: '1rem' }}>asdas</div>;
}
export default class Layout__ViewAutoHeight extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Grid style={{ width: '100%' }}>
				<View style={{ height: '100vh', flexDirection: 'column' }}>
					<Box
						style={{
							background: 'blue'
						}}
					>
						Header
					</Box>
					<Box
						xs
						sm
						md
						lg
						style={{
							background: 'gray'
						}}
					/>
				</View>
			</Grid>
		);
	}
}
if (__DOCS__) {
	Layout__ViewAutoHeight.docs = {
		componentGroup: 'Template'
	};
}
