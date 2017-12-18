import React, { PropTypes } from 'react';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return <div style={{ background: '#007fff', minHeight: '1rem', marginBottom: '1rem' }} />;
}
export default class Layout__default extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid fluid>
				<View col>
					<Box xs={12} sm={3} md={2} lg={1}>
						<Box />
					</Box>
					<Box xs={6} sm={6} md={8} lg={10}>
						<Box />
					</Box>
					<Box xs={6} sm={3} md={2} lg={1}>
						<Box />
					</Box>
				</View>
			</Grid>
		);
	}
}

Layout__default.docs = {
	componentGroup: 'Template'
};
