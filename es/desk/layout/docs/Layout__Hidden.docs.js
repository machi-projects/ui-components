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

var Layout__Hidden = function (_React$Component) {
	_inherits(Layout__Hidden, _React$Component);

	function Layout__Hidden(props) {
		_classCallCheck(this, Layout__Hidden);

		return _possibleConstructorReturn(this, (Layout__Hidden.__proto__ || _Object$getPrototypeOf(Layout__Hidden)).call(this, props));
	}

	_createClass(Layout__Hidden, [{
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
						{ xs: 0, sm: 3, md: 2, lg: 1 },
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						{ xs: 6, sm: 6, md: 8, lg: 10 },
						React.createElement(YourContent, null)
					),
					React.createElement(
						Box,
						{ xs: 6, sm: 3, md: 2, lg: 1 },
						React.createElement(YourContent, null)
					)
				)
			);
		}
	}]);

	return Layout__Hidden;
}(React.Component);

export default Layout__Hidden;


Layout__Hidden.docs = {
	componentGroup: 'Template'
};