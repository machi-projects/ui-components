import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropDown } from '../index';

import { SearchBox } from '../../index';

export default class DropDown__Default extends Component {
	render() {
		return (
			<div>
				<DropDown selectedItem="D">
					<DropDownSelection
						showOnSelection={selectedItem => {
							return 'sdasd';
						}}
					/>
					<SearchBox styleId="mysearch" viewOrder={['textbox', 'searchIcon']} />
					<DropDownItems>
						<DropDownItem value="A"> Apple </DropDownItem>
						<DropDownItem value="B"> Banana </DropDownItem>
						<DropDownItem value="C"> Car </DropDownItem>
						<DropDownItem value="D"> Dog </DropDownItem>
						<DropDownItem value="E"> Earned </DropDownItem>
						<DropDownItem value="G"> sfff </DropDownItem>
					</DropDownItems>
				</DropDown>
			</div>
		);
	}
}

if (__DOCS__) {
	DropDown__Default.docs = {
		componentGroup: DropDown.docs.componentGroup
	};
}
