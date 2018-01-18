import React, { PropTypes } from 'react';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return <div style={{ background: '#007fff', minHeight: '1rem', marginBottom: '1rem' }} />;
}

export default class Layout__Offset extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Box xsOffset={11} xs={1}>
					<YourContent />
				</Box>
				<Box xsOffset={10} xs={2}>
					<YourContent />
				</Box>
				<Box xsOffset={9} xs={3}>
					<YourContent />
				</Box>
				<Box xsOffset={8} xs={4}>
					<YourContent />
				</Box>
				<Box xsOffset={7} xs={5}>
					<YourContent />
				</Box>
				<Box xsOffset={6} xs={6}>
					<YourContent />
				</Box>
				<Box xsOffset={5} xs={7}>
					<YourContent />
				</Box>
				<Box xsOffset={4} xs={8}>
					<YourContent />
				</Box>
				<Box xsOffset={3} xs={9}>
					<YourContent />
				</Box>
				<Box xsOffset={2} xs={10}>
					<YourContent />
				</Box>
				<Box xsOffset={1} xs={11}>
					<YourContent />
				</Box>
			</View>
		);
	}
}

Layout__Offset.docs = {
	componentGroup: 'Template'
};
