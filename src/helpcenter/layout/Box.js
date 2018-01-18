import React from 'react';
import PropTypes from 'prop-types';
import style from './Layout.css';
import { createProps, getClass, ColumnSizeType, ViewportSizeType } from './utils';

const propTypes = {
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
const classMap = {
	xs: 'col-xs',
	sm: 'col-sm',
	md: 'col-md',
	lg: 'col-lg',
	xsOffset: 'col-xs-offset',
	smOffset: 'col-sm-offset',
	mdOffset: 'col-md-offset',
	lgOffset: 'col-lg-offset'
};
const hiddenMap = {
	xs: 'hidden-xs',
	sm: 'hidden-sm',
	md: 'hidden-md',
	lg: 'hidden-lg'
};

function getColClassNames(props) {
	const extraClasses = [];

	if (props.className) {
		extraClasses.push(props.className);
	}

	if (props.first) {
		extraClasses.push(getClass(style, 'first-' + props.first));
	}

	if (props.last) {
		extraClasses.push(getClass(style, 'last-' + props.last));
	}

	return Object.keys(props)
		.filter(key => classMap[key])
		.map(key => {
			const colsAmount = props[key];
			if (Number.isInteger(colsAmount) && colsAmount === 0) {
				return style[hiddenMap[key]];
			} else if (Number.isInteger(colsAmount)) {
				return style[`${classMap[key]}-${colsAmount}`];
			}
			return style[classMap[key]];
		})
		.concat(extraClasses);
}

export function getColumnProps(props) {
	return createProps(propTypes, props, getColClassNames(props));
}
export default function Box(props) {
	const { tagName } = props;
	const columnProps = Object.keys(props).reduce((res, next) => {
		if (next !== 'tagName') {
			res[next] = props[next];
		}
		return res;
	}, {});
	return React.createElement(tagName || 'div', getColumnProps(columnProps));
}

Box.propTypes = propTypes;
