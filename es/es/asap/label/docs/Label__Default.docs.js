import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../index';

var Label__Default = function (_Component) {
	_inherits(Label__Default, _Component);

	function Label__Default() {
		_classCallCheck(this, Label__Default);

		return _possibleConstructorReturn(this, (Label__Default.__proto__ || _Object$getPrototypeOf(Label__Default)).apply(this, arguments));
	}

	_createClass(Label__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					Label,
					null,
					' primary '
				),
				React.createElement(
					Label,
					{ styleId: 'primary' },
					' primary '
				),
				React.createElement(
					Label,
					{ styleId: 'info' },
					' info '
				),
				React.createElement(
					Label,
					{ styleId: 'warning' },
					' warning '
				)
			);
		}
	}]);

	return Label__Default;
}(Component);

export default Label__Default;


if (__DOCS__) {
	Label__Default.docs = {
		componentGroup: Label.docs.componentGroup
	};
}