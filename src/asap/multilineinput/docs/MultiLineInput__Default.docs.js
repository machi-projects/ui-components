import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MultiLineInput } from '../index';

export default class MultiLineInput__Default extends Component {
	render() {
		return (
			<div>
				test multilineinput;
				<MultiLineInput
					required={true}
					validation={{
						validate: false,
						validateOn: 'onChange',
						rules: {
							rangeLength: '10,100'
						},
						rulesOrder: ['required', 'rangeLength'],
						messages: {
							required: "shouldn't  be blank",
							rangeLength: 'characters should be in-between 10 to 100.'
						}
					}}
					onFailValidation={(rule, message, inputTag) => {}}
					onPassValidation={(text, inputTag) => {}}
				/>
				<MultiLineInput styleId="myinput" />
			</div>
		);
	}
}

if (__DOCS__) {
	MultiLineInput__Default.docs = {
		componentGroup: MultiLineInput.docs.componentGroup
	};
}
