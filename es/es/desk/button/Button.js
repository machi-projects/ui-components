import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonBase from '../../js/ButtonBase';
import styles from './button.css';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

var Button = function (_React$Component) {
	_inherits(Button, _React$Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || _Object$getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    disabled = _props.disabled,
			    focused = _props.focused,
			    mandatory = _props.mandatory,
			    primary = _props.primary,
			    success = _props.success,
			    info = _props.info,
			    warning = _props.warning,
			    danger = _props.danger,
			    hovered = _props.hovered,
			    errored = _props.errored,
			    hidden = _props.hidden,
			    raised = _props.raised;


			var newProps = omit(this.props, ["className", "styleId", "disabled", "focused", "mandatory", "primary", "success", "info", "warning", "danger", "hovered", "errored", "raised"]);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'mandatory', mandatory), _defineProperty(_cx, 'primary', primary), _defineProperty(_cx, 'success', success), _defineProperty(_cx, 'info', info), _defineProperty(_cx, 'warning', warning), _defineProperty(_cx, 'danger', danger), _defineProperty(_cx, 'hovered', hovered), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'raised', raised), _cx));

			return React.createElement(ButtonBase, _extends({}, newProps, { className: classNames }));
		}
	}]);

	return Button;
}(React.Component);

export default Button;


Button.defaultProps = {
	styleId: "default"

	/*
 		Button.stateStyles = [ "disabled", "enabled" , "focused" , "mandatory" , "primary" , "success" , "info",
 	"warning", "danger", "hovered" , "errored" , "hidden", , "errored", "raised" ]
 	*/

};Button.propTypes = {

	id: PropTypes.string,
	htmlFor: PropTypes.string,
	styleId: PropTypes.string,

	disabled: PropTypes.bool,
	focused: PropTypes.bool,

	mandatory: PropTypes.bool,
	primary: PropTypes.bool,
	success: PropTypes.bool,
	info: PropTypes.bool,
	warning: PropTypes.bool,
	danger: PropTypes.bool,

	hovered: PropTypes.bool,
	errored: PropTypes.bool,
	hidden: PropTypes.bool,
	raised: PropTypes.bool

};

if (__DOCS__) {
	Button.docs = {
		componentGroup: "Atom"
	};
}