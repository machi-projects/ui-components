import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../index';

var Button__Default = function (_Component) {
	_inherits(Button__Default, _Component);

	function Button__Default() {
		_classCallCheck(this, Button__Default);

		return _possibleConstructorReturn(this, (Button__Default.__proto__ || _Object$getPrototypeOf(Button__Default)).apply(this, arguments));
	}

	_createClass(Button__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				'Button styles',
				React.createElement(
					Button,
					null,
					' Hello machi '
				)
			);
		}
	}]);

	return Button__Default;
}(Component);

export default Button__Default;


if (__DOCS__) {
	Button__Default.docs = {
		componentGroup: Button.docs.componentGroup
	};
}