'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ViewportSizeType = exports.ColumnSizeType = undefined;
exports.getClass = getClass;
exports.createProps = createProps;
exports.isInteger = isInteger;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColumnSizeType = exports.ColumnSizeType = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]);
var ViewportSizeType = exports.ViewportSizeType = _propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg']);

function getClass(styles, className) {
	return styles && styles[className] ? styles[className] : className;
}

function createProps(propTypes, props, classNames) {
	var newProps = {};

	Object.keys(props).filter(function (key) {
		return key === 'children' || !propTypes[key];
	}).forEach(function (key) {
		return newProps[key] = props[key];
	});

	var className = classNames.filter(function (cn) {
		return cn;
	}).join(' ');
	return Object.assign({}, newProps, { className: className });
}

function isInteger(value) {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}