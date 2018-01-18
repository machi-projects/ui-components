import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

import MessageBase from '../../js/MessageBase';
import styles from './message.css';
import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

var Message = function (_React$Component) {
	_inherits(Message, _React$Component);

	function Message() {
		_classCallCheck(this, Message);

		return _possibleConstructorReturn(this, (Message.__proto__ || _Object$getPrototypeOf(Message)).apply(this, arguments));
	}

	_createClass(Message, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    src = _props.src,
			    alt = _props.alt,
			    text = _props.text,
			    disabled = _props.disabled,
			    focused = _props.focused,
			    primary = _props.primary,
			    success = _props.success,
			    info = _props.info,
			    warning = _props.warning,
			    danger = _props.danger,
			    errored = _props.errored,
			    valid = _props.valid,
			    hovered = _props.hovered,
			    hidden = _props.hidden,
			    raised = _props.raised;


			var newProps = omit(this.props, ['className', 'styleId', 'disabled', 'focused', 'primary', 'success', 'info', 'warning', 'danger', 'valid', 'errored', 'hovered', 'raised']);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'primary', primary), _defineProperty(_cx, 'success', success), _defineProperty(_cx, 'info', info), _defineProperty(_cx, 'warning', warning), _defineProperty(_cx, 'danger', danger), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'hovered', hovered), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'raised', raised), _cx));

			return React.createElement(MessageBase, _extends({}, newProps, { className: classNames }));
		}
	}]);

	return Message;
}(React.Component);

export default Message;


Message.defaultProps = {
	styleId: 'default'
};

Message.propTypes = {
	styleId: PropTypes.string,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,

	primary: PropTypes.bool,
	success: PropTypes.bool,
	info: PropTypes.bool,
	warning: PropTypes.bool,
	danger: PropTypes.bool,

	hovered: PropTypes.bool,
	hidden: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	Message.docs = {
		componentGroup: 'Atom'
	};
}