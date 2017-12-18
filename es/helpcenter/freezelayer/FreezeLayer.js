import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FreezeLayerBase from '../../js/FreezeLayerBase';
import styles from './freezelayer.css';
import zIndexStyles from '../common-css/zindexes/zindex.css';
import colorsStyles from '../common-css/colors/colors.css';
import stylesMapping from './styleMapping';

import cx from '../../utils/classNamesUtils/classNames';

var FreezeLayer = function (_React$Component) {
	_inherits(FreezeLayer, _React$Component);

	function FreezeLayer() {
		_classCallCheck(this, FreezeLayer);

		return _possibleConstructorReturn(this, (FreezeLayer.__proto__ || _Object$getPrototypeOf(FreezeLayer)).apply(this, arguments));
	}

	_createClass(FreezeLayer, [{
		key: 'render',
		value: function render() {
			var _React$createElement;

			var _props = this.props,
			    styleId = _props.styleId,
			    zIndexLevel = _props.zIndexLevel,
			    onClick = _props.onClick,
			    executeClickOn = _props.executeClickOn,
			    onEscKeyUp = _props.onEscKeyUp,
			    executeEscKeyUpOn = _props.executeEscKeyUpOn;

			var classNames = cx(styles[styleId], colorsStyles['bg_' + stylesMapping[styleId].bgStyleId], zIndexStyles[zIndexLevel]);

			return React.createElement(
				FreezeLayerBase,
				(_React$createElement = {
					onClick: onClick,
					executeClickOn: executeClickOn,
					onEscKeyUp: onEscKeyUp
				}, _defineProperty(_React$createElement, 'executeClickOn', executeClickOn), _defineProperty(_React$createElement, 'executeEscKeyUpOn', executeEscKeyUpOn), _defineProperty(_React$createElement, 'freezeStyle', classNames), _React$createElement),
				this.props.children
			);
		}
	}]);

	return FreezeLayer;
}(React.Component);

export default FreezeLayer;


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