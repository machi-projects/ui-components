import React from 'react';
import PropTypes from 'prop-types';
import style from './Layout.css';
import { createProps, getClass } from './utils';

const propTypes = {
	fluid: PropTypes.bool,
	className: PropTypes.string,
	tagName: PropTypes.string,
	children: PropTypes.node
};

export default function Grid(props) {
	const containerClass = getClass(style, props.fluid ? 'container-fluid' : 'container');
	const classNames = [props.className, containerClass];

	return React.createElement(props.tagName || 'div', createProps(propTypes, props, classNames));
}

Grid.propTypes = propTypes;
