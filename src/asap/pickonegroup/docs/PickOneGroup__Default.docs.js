import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PickOneGroup, PickOneItem } from '../../index';

export default class PickOneGroup__Default extends Component {
	render() {
		return (
			<div>
				<b> Pick one item in group of items + custom styles </b> <br /> <br />
				Group 1 : <br />
				<PickOneGroup selectedItem="red">
					<PickOneItem pickId="red"> red </PickOneItem>
					<PickOneItem pickId="green"> green </PickOneItem>
					<PickOneItem pickId="yellow"> yellow </PickOneItem>
				</PickOneGroup>
				<PickOneGroup
					styleId="mypick"
					selectedItem="green"
					required
					validation={{
						messages: {
							required: 'select at least one item'
						}
					}}
					onFailValidation={(a, b) => {}}
					onPassValidation={(a, b) => {}}
				>
					<PickOneItem pickId="red"> red </PickOneItem>
					<PickOneItem pickId="green"> green </PickOneItem>
					<PickOneItem pickId="yellow"> yellow </PickOneItem>
				</PickOneGroup>
			</div>
		);
	}
}

if (__DOCS__) {
	PickOneGroup__Default.docs = {
		componentGroup: PickOneGroup.docs.componentGroup
	};
}
