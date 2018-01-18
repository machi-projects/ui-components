import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../InputText';

export default class InputText__Default extends Component {
	render() {
		return (
			<div>
				<b> Input + custom styles </b>

				<InputText type="email" />
				<br />
				<InputText type="url" />
				<br />
				<InputText type="text" focused={true} />
				<br />

				<InputText
					type="number"
					raised={true}
					required={true}
					validation={{
						validate: false,
						validateOn: 'onChange',
						rules: {
							digits: true,
							custom1: val => {
								return parseInt(val) < 10;
							},
							custom2: val => {
								return parseInt(val) < 100;
							}
						},
						rulesOrder: ['required', 'digits', 'custom1', 'custom2'],
						messages: {
							required: "shouldn't  be blank",
							digits: "shouldn't  be blank ",
							custom1: 'failed custom1',
							custom2: (text, el) => {
								return 'failed custom2' + text;
							}
						}
					}}
					onFailValidation={(rule, message, inputTag) => {}}
					onPassValidation={(text, inputTag) => {}}
				/>

				<InputText type="range" />
				<br />

				<InputText type="color" />
				<br />

				<InputText type="date" autoFocus={true} />
			</div>
		);
	}
}

if (__DOCS__) {
	InputText__Default.docs = {
		componentGroup: InputText.docs.componentGroup
	};
}
