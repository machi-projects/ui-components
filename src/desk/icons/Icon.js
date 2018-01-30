import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import IconSvgBase from '../../js/IconSvgBase';

import iconStyles from './icon.css';
import sizesStyles from '../common-css/sizes/sizes.css';
import colorsStyles from '../common-css/colors/colors.css';

import iconIdsMapping from './iconIdsMapping';
import cx from '../../utils/classNamesUtils/classNames';

import IconContent from './IconContent';

export default class Icon extends Component {
	componentWillUnmount() {}

	componentDidMount() {
		if (document.getElementById('zohodesk-common-icons-holder') == null) {
			let child = document.createElement('div');
			child.id = 'zohodesk-common-icons-holder';
			document.body.appendChild(child);
		}
		
		if (document.getElementById('zohodesk-common-icons') == null) {
			ReactDOM.render(<IconContent />, document.getElementById('zohodesk-common-icons-holder'));
		}
	}

	render() {
		let { styleId, id, size, color, bgColor, onClick = null, iconsMapping } = this.props;
		let classNames = cx(
			iconStyles['iconbase'],
			iconStyles[styleId],
			colorsStyles['clr_' + color],
			colorsStyles['bg_' + bgColor],
			sizesStyles[size],
			iconStyles[id + '_global']
		);

		let newIconsMapping = iconsMapping ? iconsMapping[id] : iconIdsMapping[id];
		return <IconSvgBase icon={iconIdsMapping[id]} className={classNames} onClick={onClick} />;
	}
}

Icon.propTypes = {
	styleId: PropTypes.string,
	id: PropTypes.string.isRequired,
	size: PropTypes.string,
	color: PropTypes.string,
	bgColor: PropTypes.string,
	iconsMapping: PropTypes.object,
	onClick: PropTypes.func
};

if (__DOCS__) {
	Icon.docs = {
		componentGroup: 'Atom'
	};
}

//_global - className {iconId}__global
