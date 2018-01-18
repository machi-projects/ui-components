import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputButton from '../InputButton';

var InputButton__Default = function (_Component) {
	_inherits(InputButton__Default, _Component);

	function InputButton__Default() {
		_classCallCheck(this, InputButton__Default);

		return _possibleConstructorReturn(this, (InputButton__Default.__proto__ || _Object$getPrototypeOf(InputButton__Default)).apply(this, arguments));
	}

	_createClass(InputButton__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(InputButton, { type: 'radio', name: 'red', defaultChecked: false }),
				' Apple',
				React.createElement(InputButton, { type: 'radio', name: 'red', defaultChecked: false }),
				' Banana',
				React.createElement(InputButton, { type: 'radio', name: 'red', defaultChecked: true }),
				' Coffee',
				React.createElement(
					'b',
					null,
					' Input button + custom styles '
				)
			);
		}
	}]);

	return InputButton__Default;
}(Component);

export default InputButton__Default;


if (__DOCS__) {
	InputButton__Default.docs = {
		componentGroup: InputButton.docs.componentGroup
	};
}