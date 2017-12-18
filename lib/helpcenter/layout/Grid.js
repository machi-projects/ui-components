'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Grid;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('./Layout.css');

var _Layout2 = _interopRequireDefault(_Layout);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	fluid: _propTypes2.default.bool,
	className: _propTypes2.default.string,
	tagName: _propTypes2.default.string,
	children: _propTypes2.default.node
};

function Grid(props) {
	var containerClass = (0, _utils.getClass)(_Layout2.default, props.fluid ? 'container-fluid' : 'container');
	var classNames = [props.className, containerClass];

	return _react2.default.createElement(props.tagName || 'div', (0, _utils.createProps)(propTypes, props, classNames));
}

Grid.propTypes = propTypes;