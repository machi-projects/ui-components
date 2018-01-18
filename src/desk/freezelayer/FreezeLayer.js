import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FreezeLayerBase from '../../js/FreezeLayerBase';
import styles from './freezelayer.css';
import zIndexStyles from '../common-css/zindexes/zindex.css';
import colorsStyles from '../common-css/colors/colors.css';
import stylesMapping from './styleMapping';

import cx from '../../utils/classNamesUtils/classNames';

export default class FreezeLayer extends React.Component {
	render() {
		let { styleId, zIndexLevel, onClick, executeClickOn, onEscKeyUp, executeEscKeyUpOn } = this.props;
		let classNames = cx(
			styles[styleId],
			colorsStyles['bg_' + stylesMapping[styleId].bgStyleId],
			zIndexStyles[zIndexLevel]
		);

		return (
			<FreezeLayerBase
				onClick={onClick}
				executeClickOn={executeClickOn}
				onEscKeyUp={onEscKeyUp}
				executeClickOn={executeClickOn}
				executeEscKeyUpOn={executeEscKeyUpOn}
				freezeStyle={classNames}
			>
				{this.props.children}
			</FreezeLayerBase>
		);
	}
}

FreezeLayer.defaultProps = {
	styleId: 'default',
	zIndex: 'max_level_1'
};

FreezeLayer.propTypes = {
	styleId: PropTypes.string,
	zIndexLevel: PropTypes.string,
	onClick: PropTypes.func,
	executeClickOn: PropTypes.func,
	onEscKeyUp: PropTypes.func,
	executeEscKeyUpOn: PropTypes.func
};

if (__DOCS__) {
	FreezeLayer.docs = {
		componentGroup: 'Atom'
	};
}
