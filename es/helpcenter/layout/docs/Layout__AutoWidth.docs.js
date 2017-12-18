import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return React.createElement('div', { style: { background: '#007fff', minHeight: '1rem', marginBottom: '1rem' } });
}

var Layout__AutoWidth = function (_React$Component) {
	_inherits(Layout__AutoWidth, _React$Component);

	function Layout__AutoWidth(props) {
		_classCallCheck(this, Layout__AutoWidth);

		return _possibleConstructorReturn(this, (Layout__AutoWidth.__proto__ || _Object$getPrototypeOf(Layout__AutoWidth)).call(this, props));
	}

	_createClass(Layout__AutoWidth, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				Grid,
				{ fluid: true },
				React.createElement(
					View,
					null,
					React.createElement(
						Box,
						{ xs: true },
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						{ xs: true },
						React.createElement(YourContent, null)
					)
				),
				React.createElement(
					View,
					null,
					React.createElement(
						Box,
						null,
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						null,
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						null,
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						null,
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						null,
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						null,
						React.createElement(YourContent, null)
					)
				)
			);
		}
	}]);

	return Layout__AutoWidth;
}(React.Component);

export default Layout__AutoWidth;


Layout__AutoWidth.docs = {
	componentGroup: 'Template'
};