import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconSvgBase from '../../js/IconSvgBase';

import iconStyles from './icon.css';
import fontsizesStyles from '../common-css/font-sizes/fontsizes.css';
import colorsStyles from '../common-css/colors/colors.css';

import iconIdsMapping from './iconIdsMapping';
import cx from '../../utils/classNamesUtils/classNames';

export default class Icon extends Component {
	render() {
		let { styleId, id, size, color, bgColor, onClick = null, className } = this.props;

		let classNames = cx(
			iconStyles[styleId],
			colorsStyles['clr_' + color],
			colorsStyles['bg_' + bgColor],
			fontsizesStyles['fs_' + size],
			iconStyles[id + '_global']
		);

		//name={name}

		return <IconSvgBase icon={iconIdsMapping[id]} className={classNames} onClick={onClick} />;
	}
}

Icon.propTypes = {
	styleId: PropTypes.string,
	id: PropTypes.string.isRequired,
	size: PropTypes.string,
	color: PropTypes.string,
	bgColor: PropTypes.string,
	onClick: PropTypes.func
};

if (__DOCS__) {
	Icon.docs = {
		componentGroup: 'Atom'
	};
}

//_global - className {iconId}__global
