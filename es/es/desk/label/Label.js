import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabelBoxBase from '../../js/form/LabelBoxBase';
import styles from './label.css';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

var Label = function (_React$Component) {
	_inherits(Label, _React$Component);

	function Label() {
		_classCallCheck(this, Label);

		return _possibleConstructorReturn(this, (Label.__proto__ || _Object$getPrototypeOf(Label)).apply(this, arguments));
	}

	_createClass(Label, [{
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
			    up = _props.up,
			    down = _props.down,
			    hovered = _props.hovered,
			    errored = _props.errored,
			    hidden = _props.hidden,
			    raised = _props.raised;


			var newProps = omit(this.props, ['className', 'styleId', 'disabled', 'focused', 'mandatory', 'primary', 'success', 'info', 'warning', 'danger', 'hovered', 'errored', 'raised', 'up', 'down']);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'mandatory', mandatory), _defineProperty(_cx, 'primary', primary), _defineProperty(_cx, 'success', success), _defineProperty(_cx, 'info', info), _defineProperty(_cx, 'warning', warning), _defineProperty(_cx, 'danger', danger), _defineProperty(_cx, 'hovered', hovered), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'raised', raised), _defineProperty(_cx, 'up', up), _defineProperty(_cx, 'down', down), _cx));

			return React.createElement(LabelBoxBase, _extends({}, newProps, { className: classNames }));
		}
	}]);

	return Label;
}(React.Component);

export default Label;


Label.defaultProps = {
	styleId: 'default'
};

Label.propTypes = {
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
	Label.docs = {
		componentGroup: 'Atom'
	};
}

/*

		Label.stateStyles = [ "disabled", "enabled" , "focused" , "mandatory" , "primary" , "success" , "info",
		"warning", "danger", "hovered" , "errored" , "hidden", , "errored", "raised" ]

	*/