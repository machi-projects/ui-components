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
	return React.createElement(
		'div',
		{ style: { background: '#007fff', minHeight: '1rem' } },
		'asdas'
	);
}

var Layout__ViewAutoHeight = function (_Component) {
	_inherits(Layout__ViewAutoHeight, _Component);

	function Layout__ViewAutoHeight(props) {
		_classCallCheck(this, Layout__ViewAutoHeight);

		return _possibleConstructorReturn(this, (Layout__ViewAutoHeight.__proto__ || _Object$getPrototypeOf(Layout__ViewAutoHeight)).call(this, props));
	}

	_createClass(Layout__ViewAutoHeight, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				Grid,
				{ style: { width: '100%' } },
				React.createElement(
					View,
					{ style: { height: '100vh', flexDirection: 'column' } },
					React.createElement(
						Box,
						{
							style: {
								background: 'blue'
							}
						},
						'Header'
					),
					React.createElement(Box, {
						xs: true,
						sm: true,
						md: true,
						lg: true,
						style: {
							background: 'gray'
						}
					})
				)
			);
		}
	}]);

	return Layout__ViewAutoHeight;
}(Component);

export default Layout__ViewAutoHeight;

if (__DOCS__) {
	Layout__ViewAutoHeight.docs = {
		componentGroup: 'Template'
	};
}