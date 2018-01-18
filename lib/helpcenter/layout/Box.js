'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getColumnProps = getColumnProps;
exports.default = Box;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('./Layout.css');

var _Layout2 = _interopRequireDefault(_Layout);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	xs: _utils.ColumnSizeType,
	sm: _utils.ColumnSizeType,
	md: _utils.ColumnSizeType,
	lg: _utils.ColumnSizeType,
	xsOffset: _propTypes2.default.number,
	smOffset: _propTypes2.default.number,
	mdOffset: _propTypes2.default.number,
	lgOffset: _propTypes2.default.number,
	first: _utils.ViewportSizeType,
	last: _utils.ViewportSizeType,
	className: _propTypes2.default.string,
	tagName: _propTypes2.default.string,
	children: _propTypes2.default.node
};
var classMap = {
	xs: 'col-xs',
	sm: 'col-sm',
	md: 'col-md',
	lg: 'col-lg',
	xsOffset: 'col-xs-offset',
	smOffset: 'col-sm-offset',
	mdOffset: 'col-md-offset',
	lgOffset: 'col-lg-offset'
};
var hiddenMap = {
	xs: 'hidden-xs',
	sm: 'hidden-sm',
	md: 'hidden-md',
	lg: 'hidden-lg'
};

function getColClassNames(props) {
	var extraClasses = [];

	if (props.className) {
		extraClasses.push(props.className);
	}

	if (props.first) {
		extraClasses.push((0, _utils.getClass)(_Layout2.default, 'first-' + props.first));
	}

	if (props.last) {
		extraClasses.push((0, _utils.getClass)(_Layout2.default, 'last-' + props.last));
	}

	return Object.keys(props).filter(function (key) {
		return classMap[key];
	}).map(function (key) {
		var colsAmount = props[key];
		if (Number.isInteger(colsAmount) && colsAmount === 0) {
			return _Layout2.default[hiddenMap[key]];
		} else if (Number.isInteger(colsAmount)) {
			return _Layout2.default[classMap[key] + '-' + colsAmount];
		}
		return _Layout2.default[classMap[key]];
	}).concat(extraClasses);
}

function getColumnProps(props) {
	return (0, _utils.createProps)(propTypes, props, getColClassNames(props));
}
function Box(props) {
	var tagName = props.tagName;

	var columnProps = Object.keys(props).reduce(function (res, next) {
		if (next !== 'tagName') {
			res[next] = props[next];
		}
		return res;
	}, {});
	return _react2.default.createElement(tagName || 'div', getColumnProps(columnProps));
}

Box.propTypes = propTypes;