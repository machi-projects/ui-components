import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import Box from '../Box';
import View from '../View';
function YourContent() {
	return React.createElement('div', { style: { background: '#007fff', minHeight: '1rem', marginBottom: '1rem' } });
}

var Layout__FixedLeftPanel = function (_Component) {
	_inherits(Layout__FixedLeftPanel, _Component);

	function Layout__FixedLeftPanel(props) {
		_classCallCheck(this, Layout__FixedLeftPanel);

		return _possibleConstructorReturn(this, (Layout__FixedLeftPanel.__proto__ || _Object$getPrototypeOf(Layout__FixedLeftPanel)).call(this, props));
	}

	_createClass(Layout__FixedLeftPanel, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				Grid,
				{ style: { width: '100%' } },
				React.createElement(
					View,
					{ style: { height: '100vh' } },
					React.createElement('div', {
						style: {
							width: '300px',
							marginRight: '5px',
							background: '#007fff'
						}
					}),
					React.createElement(Box, {
						xs: true,
						sm: true,
						md: true,
						lg: true,
						style: {
							height: '100vh',
							background: '#007fff'
						}
					})
				)
			);
		}
	}]);

	return Layout__FixedLeftPanel;
}(Component);

export default Layout__FixedLeftPanel;

if (__DOCS__) {
	Layout__FixedLeftPanel.docs = {
		componentGroup: 'Template'
	};
}