import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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

var Icon = function (_Component) {
	_inherits(Icon, _Component);

	function Icon() {
		_classCallCheck(this, Icon);

		return _possibleConstructorReturn(this, (Icon.__proto__ || _Object$getPrototypeOf(Icon)).apply(this, arguments));
	}

	_createClass(Icon, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (document.getElementById('zohohc-asap-common-icons-holder') == null) {
				var child = document.createElement('div');
				child.id = 'zohohc-asap-common-icons-holder';
				document.body.appendChild(child);
			}

			if (document.getElementById('zohohc-asap-common-icons') == null) {
				ReactDOM.render(React.createElement(IconContent, null), document.getElementById('zohohc-asap-common-icons-holder'));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    styleId = _props.styleId,
			    id = _props.id,
			    size = _props.size,
			    color = _props.color,
			    bgColor = _props.bgColor,
			    _props$onClick = _props.onClick,
			    onClick = _props$onClick === undefined ? null : _props$onClick,
			    iconsMapping = _props.iconsMapping;

			var classNames = cx(iconStyles['iconbase'], iconStyles[styleId], colorsStyles['clr_' + color], colorsStyles['bg_' + bgColor], sizesStyles[size], iconStyles[id + '_global']);

			var newIconsMapping = iconsMapping ? iconsMapping[id] : iconIdsMapping[id];
			return React.createElement(IconSvgBase, { icon: iconIdsMapping[id], className: classNames, onClick: onClick });
		}
	}]);

	return Icon;
}(Component);

export default Icon;


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