import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MultiLineInput } from '../index';

var MultiLineInput__Default = function (_Component) {
	_inherits(MultiLineInput__Default, _Component);

	function MultiLineInput__Default() {
		_classCallCheck(this, MultiLineInput__Default);

		return _possibleConstructorReturn(this, (MultiLineInput__Default.__proto__ || _Object$getPrototypeOf(MultiLineInput__Default)).apply(this, arguments));
	}

	_createClass(MultiLineInput__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'test multilineinput;',
				React.createElement(MultiLineInput, {
					required: true,
					validation: {
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
					},
					onFailValidation: function onFailValidation(rule, message, inputTag) {},
					onPassValidation: function onPassValidation(text, inputTag) {}
				}),
				React.createElement(MultiLineInput, { styleId: 'myinput' })
			);
		}
	}]);

	return MultiLineInput__Default;
}(Component);

export default MultiLineInput__Default;


if (__DOCS__) {
	MultiLineInput__Default.docs = {
		componentGroup: MultiLineInput.docs.componentGroup
	};
}