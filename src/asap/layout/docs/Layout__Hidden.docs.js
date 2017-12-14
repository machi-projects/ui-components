import React, { PropTypes } from 'react';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return <div style={{ background: '#007fff', minHeight: '1rem', marginBottom: '1rem' }} />;
}
export default class Layout__Hidden extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid fluid>
				<View>
					<Box xs={0} sm={3} md={2} lg={1}>
						<YourContent />
					</Box>
					<Box xs={6} sm={6} md={8} lg={10}>
						<YourContent />
					</Box>
					<Box xs={6} sm={3} md={2} lg={1}>
						<YourContent />
					</Box>
				</View>
			</Grid>
		);
	}
}

Layout__Hidden.docs = {
	componentGroup: 'Template'
};
