import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormFieldSet, FormField } from '../index';
import { Message, Label, CheckBoxGroup, CheckBoxItem, MultiLineInput, PickOneGroup, PickOneItem } from '../../index';

export default class FormFieldSet__Default extends Component {
	render() {
		return (
			<div>
				<FormFieldSet
					fieldId="Fruits"
					value={['B', 'C']}
					focusFieldOnError={true}
					validation={{
						rules: {
							required: true
						},
						rulesOrder: ['required'],
						messages: {
							required: 'Select At least one tag...'
						}
					}}
					onPassValidation={(a, b) => {}}
				>
					<Label> Choose your Fav </Label>

					<FormField>
						<CheckBoxGroup selectedItems={['B', 'C']}>
							<CheckBoxItem value="A"> Apple </CheckBoxItem>
							<CheckBoxItem value="B"> Banana </CheckBoxItem>
							<CheckBoxItem value="C"> Cadddde </CheckBoxItem>
						</CheckBoxGroup>
					</FormField>

					<Message> choose the fruits you like.... </Message>
				</FormFieldSet>

				<hr />
				<hr />

				<FormFieldSet
					fieldId="Text-X"
					value={null}
					validation={{
						rules: {
							maxLength: '10'
						},
						validateOn: 'onChange',
						rulesOrder: ['maxLength'],
						messages: {
							maxLength: function(a, b) {
								return 'Exceeds characters --> ' + a.length + '/100';
							}
						}
					}}
					onPassValidation={(a, b) => {}}
				>
					<Label> Text messages ( allowed 10 characters ) </Label>

					<FormField>
						<MultiLineInput />
					</FormField>

					<Message> type text :-) </Message>
				</FormFieldSet>

				<hr />
				<hr />

				<FormFieldSet
					fieldId="Pick-One-Box"
					value={['B', 'C']}
					validation={{
						validate: true,
						messages: {
							required: 'select at least from item'
						}
					}}
				>
					<Label> PickOneGroup ( required )</Label>

					<FormField>
						<PickOneGroup styleId="mypick" required>
							<PickOneItem pickId="red"> red </PickOneItem>
							<PickOneItem pickId="green"> green </PickOneItem>
							<PickOneItem pickId="yellow"> yellow </PickOneItem>
						</PickOneGroup>
					</FormField>

					<Message> Pick one info ...msg </Message>
				</FormFieldSet>
			</div>
		);
	}
}

if (__DOCS__) {
	FormFieldSet__Default.docs = {
		componentGroup: FormFieldSet.docs.componentGroup
	};
}
