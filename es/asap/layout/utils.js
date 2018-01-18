import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import PropTypes from 'prop-types';

export var ColumnSizeType = PropTypes.oneOfType([PropTypes.number, PropTypes.bool]);
export var ViewportSizeType = PropTypes.oneOf(['xs', 'sm', 'md', 'lg']);

export function getClass(styles, className) {
	return styles && styles[className] ? styles[className] : className;
}

export function createProps(propTypes, props, classNames) {
	var newProps = {};

	_Object$keys(props).filter(function (key) {
		return key === 'children' || !propTypes[key];
	}).forEach(function (key) {
		return newProps[key] = props[key];
	});

	var className = classNames.filter(function (cn) {
		return cn;
	}).join(' ');
	return _Object$assign({}, newProps, { className: className });
}

export function isInteger(value) {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}