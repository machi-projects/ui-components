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

var Layout__Offset = function (_React$Component) {
	_inherits(Layout__Offset, _React$Component);

	function Layout__Offset(props) {
		_classCallCheck(this, Layout__Offset);

		return _possibleConstructorReturn(this, (Layout__Offset.__proto__ || _Object$getPrototypeOf(Layout__Offset)).call(this, props));
	}

	_createClass(Layout__Offset, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				View,
				null,
				React.createElement(
					Box,
					{ xsOffset: 11, xs: 1 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 10, xs: 2 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 9, xs: 3 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 8, xs: 4 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 7, xs: 5 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 6, xs: 6 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 5, xs: 7 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 4, xs: 8 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 3, xs: 9 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 2, xs: 10 },
					React.createElement(YourContent, null)
				),
				React.createElement(
					Box,
					{ xsOffset: 1, xs: 11 },
					React.createElement(YourContent, null)
				)
			);
		}
	}]);

	return Layout__Offset;
}(React.Component);

export default Layout__Offset;


Layout__Offset.docs = {
	componentGroup: 'Template'
};