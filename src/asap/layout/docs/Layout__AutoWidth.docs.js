import React, { PropTypes } from 'react';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return <div style={{ background: '#007fff', minHeight: '1rem', marginBottom: '1rem' }} />;
}
export default class Layout__AutoWidth extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid fluid>
				<View>
					<Box xs>
						<YourContent />
					</Box>
					<Box xs>
						<YourContent />
					</Box>
				</View>
				<View>
					<Box>
						<YourContent />
					</Box>
					<Box>
						<YourContent />
					</Box>
					<Box>
						<YourContent />
					</Box>
					<Box>
						<YourContent />
					</Box>
					<Box>
						<YourContent />
					</Box>
					<Box>
						<YourContent />
					</Box>
				</View>
			</Grid>
		);
	}
}

Layout__AutoWidth.docs = {
	componentGroup: 'Template'
};
