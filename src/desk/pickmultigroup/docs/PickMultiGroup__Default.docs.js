import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PickMultiGroup, PickItem } from '../index';

export default class PickMultiGroup__Default extends Component {
	render() {
		return (
			<div>
				<b> Pick multi item in group of items + custom styles </b> <br /> <br />
				Group 1 : <br />
				<PickMultiGroup selectedItems={['red']}>
					<PickItem pickId="red"> red </PickItem>
					<PickItem pickId="green"> green </PickItem>
					<PickItem pickId="yellow"> yellow </PickItem>
				</PickMultiGroup>
				<PickMultiGroup
					styleId="mypick"
					required
					selectedItems={['green']}
					validation={{
						rules: {
							maxLengthX: function(val, el) {
								return val.length < 3;
							}
						},
						rulesOrder: ['required', 'maxLengthX'],
						messages: {
							required: 'select at least one item',
							maxLengthX: 'at least two item'
						}
					}}
					onFailValidation={(a, b) => {}}
					onPassValidation={(a, b) => {}}
				>
					<PickItem pickId="red"> red </PickItem>
					<PickItem pickId="green"> green </PickItem>
					<PickItem pickId="yellow"> yellow </PickItem>
					<PickItem pickId="blue"> Blue </PickItem>
					<PickItem pickId="white"> white </PickItem>
				</PickMultiGroup>
			</div>
		);
	}
}

if (__DOCS__) {
	PickMultiGroup__Default.docs = {
		componentGroup: PickMultiGroup.docs.componentGroup
	};
}
