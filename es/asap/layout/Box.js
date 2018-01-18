import _Number$isInteger from 'babel-runtime/core-js/number/is-integer';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import React from 'react';
import PropTypes from 'prop-types';
import style from './Layout.css';
import { createProps, getClass, ColumnSizeType, ViewportSizeType } from './utils';

var propTypes = {
	xs: ColumnSizeType,
	sm: ColumnSizeType,
	md: ColumnSizeType,
	lg: ColumnSizeType,
	xsOffset: PropTypes.number,
	smOffset: PropTypes.number,
	mdOffset: PropTypes.number,
	lgOffset: PropTypes.number,
	first: ViewportSizeType,
	last: ViewportSizeType,
	className: PropTypes.string,
	tagName: PropTypes.string,
	children: PropTypes.node
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
		extraClasses.push(getClass(style, 'first-' + props.first));
	}

	if (props.last) {
		extraClasses.push(getClass(style, 'last-' + props.last));
	}

	return _Object$keys(props).filter(function (key) {
		return classMap[key];
	}).map(function (key) {
		var colsAmount = props[key];
		if (_Number$isInteger(colsAmount) && colsAmount === 0) {
			return style[hiddenMap[key]];
		} else if (_Number$isInteger(colsAmount)) {
			return style[classMap[key] + '-' + colsAmount];
		}
		return style[classMap[key]];
	}).concat(extraClasses);
}

export function getColumnProps(props) {
	return createProps(propTypes, props, getColClassNames(props));
}
export default function Box(props) {
	var tagName = props.tagName;

	var columnProps = _Object$keys(props).reduce(function (res, next) {
		if (next !== 'tagName') {
			res[next] = props[next];
		}
		return res;
	}, {});
	return React.createElement(tagName || 'div', getColumnProps(columnProps));
}

Box.propTypes = propTypes;