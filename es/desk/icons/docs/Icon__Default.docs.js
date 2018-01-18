import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

var Icon__Default = function (_Component) {
	_inherits(Icon__Default, _Component);

	function Icon__Default() {
		_classCallCheck(this, Icon__Default);

		return _possibleConstructorReturn(this, (Icon__Default.__proto__ || _Object$getPrototypeOf(Icon__Default)).apply(this, arguments));
	}

	_createClass(Icon__Default, [{
		key: 'render',
		value: function render() {

			return React.createElement(
				'div',
				null,
				React.createElement(Icon, { id: 'searchIcon', color: 'green', size: 'small' }),
				React.createElement(Icon, { id: 'datePicker', size: 'small' }),
				React.createElement(Icon, { id: 'Refresh', size: 'small' })
			);
		}
	}]);

	return Icon__Default;
}(Component);

export default Icon__Default;


if (__DOCS__) {
	Icon__Default.docs = {
		componentGroup: Icon.docs.componentGroup
	};
}