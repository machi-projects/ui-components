import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormFieldsGroup } from '../index';
import { FormFieldSet, FormField, Message, Label, CheckBoxGroup, CheckBoxItem, MultiLineInput, PickOneGroup, PickOneItem } from '../../index';

var FormFieldsGroup__Default = function (_Component) {
	_inherits(FormFieldsGroup__Default, _Component);

	function FormFieldsGroup__Default() {
		_classCallCheck(this, FormFieldsGroup__Default);

		return _possibleConstructorReturn(this, (FormFieldsGroup__Default.__proto__ || _Object$getPrototypeOf(FormFieldsGroup__Default)).apply(this, arguments));
	}

	_createClass(FormFieldsGroup__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					FormFieldsGroup,
					{ validate: false },
					React.createElement(
						FormFieldSet,
						{
							fieldId: 'Fruits',
							value: ['B', 'C'],
							validation: {
								rules: {
									required: true
								},
								rulesOrder: ['required'],
								messages: {
									required: 'Select At least one tag...'
								}
							},
							onPassValidation: function onPassValidation(a, b) {}
						},
						React.createElement(
							Label,
							null,
							' Choose your Fav '
						),
						React.createElement(
							FormField,
							null,
							React.createElement(
								CheckBoxGroup,
								{ selectedItems: ['B', 'C'] },
								React.createElement(
									CheckBoxItem,
									{ value: 'A' },
									' Apple '
								),
								React.createElement(
									CheckBoxItem,
									{ value: 'B' },
									' Banana '
								),
								React.createElement(
									CheckBoxItem,
									{ value: 'C' },
									' Cadddde '
								)
							)
						),
						React.createElement(
							Message,
							null,
							' choose the fruits you like.... '
						)
					),
					React.createElement(
						FormFieldSet,
						{
							fieldId: 'Text-X',
							value: null,
							validation: {
								rules: {
									maxLength: '10'
								},
								validateOn: 'onChange',
								rulesOrder: ['maxLength'],
								messages: {
									maxLength: function maxLength(a, b) {
										return 'Exceeds characters --> ' + a.length + '/100';
									}
								}
							},
							onPassValidation: function onPassValidation(a, b) {}
						},
						React.createElement(
							Label,
							null,
							' Text messages ( allowed 10 characters ) '
						),
						React.createElement(
							FormField,
							null,
							React.createElement(MultiLineInput, null)
						),
						React.createElement(
							Message,
							null,
							' type text :-) '
						)
					),
					React.createElement(
						FormFieldSet,
						{
							fieldId: 'Pick-One-Box',
							value: ['B', 'C'],
							validation: {
								messages: {
									required: 'select at least from item'
								}
							}
						},
						React.createElement(
							Label,
							null,
							' PickOneGroup ( required )'
						),
						React.createElement(
							FormField,
							null,
							React.createElement(
								PickOneGroup,
								{ styleId: 'mypick', required: true },
								React.createElement(
									PickOneItem,
									{ pickId: 'red' },
									' red '
								),
								React.createElement(
									PickOneItem,
									{ pickId: 'green' },
									' green '
								),
								React.createElement(
									PickOneItem,
									{ pickId: 'yellow' },
									' yellow '
								)
							)
						),
						React.createElement(
							Message,
							null,
							' Pick one info ...msg '
						)
					)
				)
			);
		}
	}]);

	return FormFieldsGroup__Default;
}(Component);

export default FormFieldsGroup__Default;


if (__DOCS__) {
	FormFieldsGroup__Default.docs = {
		componentGroup: FormFieldsGroup.docs.componentGroup
	};
}