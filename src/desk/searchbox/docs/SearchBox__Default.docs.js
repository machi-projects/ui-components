import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from '../index';

export default class SearchBox__Default extends Component {
	render() {
		return (
			<div>
				<b> SearchBox + custom styles </b> <br /> <br />
				<SearchBox viewOrder={['textbox', 'searchIcon', 'clearIcon']} />
			</div>
		);
	}
}

if (__DOCS__) {
	SearchBox__Default.docs = {
		componentGroup: SearchBox.docs.componentGroup
	};
}

// <SearchBox
// 	styleId="mysearch"
// 	onChange={text => {
// 		console.log(text);
// 	}}
// 	searchOn="onBlur"
// />
// <SearchBox viewOrder={['searchIcon', 'textbox', 'clearIcon']} />
// <SearchBox viewOrder={['searchIcon', 'textbox']} />
// <SearchBox viewOrder={['textbox', 'searchIcon']} />
// <SearchBox viewOrder={['textbox']} />
