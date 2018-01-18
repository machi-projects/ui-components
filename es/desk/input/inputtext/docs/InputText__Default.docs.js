import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../InputText';

var InputText__Default = function (_Component) {
	_inherits(InputText__Default, _Component);

	function InputText__Default() {
		_classCallCheck(this, InputText__Default);

		return _possibleConstructorReturn(this, (InputText__Default.__proto__ || _Object$getPrototypeOf(InputText__Default)).apply(this, arguments));
	}

	_createClass(InputText__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'b',
					null,
					' Input + custom styles '
				),
				React.createElement(InputText, { type: 'email' }),
				React.createElement('br', null),
				React.createElement(InputText, { type: 'url' }),
				React.createElement('br', null),
				React.createElement(InputText, { type: 'text', focused: true }),
				React.createElement('br', null),
				React.createElement(InputText, {
					type: 'number',
					raised: true,
					required: true,
					validation: {
						validate: false,
						validateOn: 'onChange',
						rules: {
							digits: true,
							custom1: function custom1(val) {
								return parseInt(val) < 10;
							},
							custom2: function custom2(val) {
								return parseInt(val) < 100;
							}
						},
						rulesOrder: ['required', 'digits', 'custom1', 'custom2'],
						messages: {
							required: "shouldn't  be blank",
							digits: "shouldn't  be blank ",
							custom1: 'failed custom1',
							custom2: function custom2(text, el) {
								return 'failed custom2' + text;
							}
						}
					},
					onFailValidation: function onFailValidation(rule, message, inputTag) {},
					onPassValidation: function onPassValidation(text, inputTag) {}
				}),
				React.createElement(InputText, { type: 'range' }),
				React.createElement('br', null),
				React.createElement(InputText, { type: 'color' }),
				React.createElement('br', null),
				React.createElement(InputText, { type: 'date', autoFocus: true })
			);
		}
	}]);

	return InputText__Default;
}(Component);

export default InputText__Default;


if (__DOCS__) {
	InputText__Default.docs = {
		componentGroup: InputText.docs.componentGroup
	};
}