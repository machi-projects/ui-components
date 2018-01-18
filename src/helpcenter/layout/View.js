import React from 'react';
import PropTypes from 'prop-types';
import style from './Layout.css';
import { createProps, getClass, ViewportSizeType } from './utils';

const rowKeys = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between'];

const propTypes = {
	reverse: PropTypes.bool,
	start: ViewportSizeType,
	center: ViewportSizeType,
	end: ViewportSizeType,
	top: ViewportSizeType,
	middle: ViewportSizeType,
	bottom: ViewportSizeType,
	around: ViewportSizeType,
	between: ViewportSizeType,
	className: PropTypes.string,
	tagName: PropTypes.string
};

function getRowClassNames(props) {
	const modificators = [props.className, getClass(style, 'row')];

	for (let i = 0; i < rowKeys.length; ++i) {
		const key = rowKeys[i];
		const value = props[key];
		if (!Array.isArray(value)) {
			modificators.push(getClass(style, `${key}-${value}`));
		} else {
			value.forEach(val => {
				modificators.push(getClass(style, `${key}-${val}`));
			});
		}
	}

	if (props.reverse) {
		modificators.push(getClass(style, 'reverse'));
	}

	return modificators;
}

export function getRowProps(props) {
	return createProps(propTypes, props, getRowClassNames(props));
}

export default function View(props) {
	return React.createElement(props.tagName || 'div', getRowProps(props));
}

View.propTypes = propTypes;
