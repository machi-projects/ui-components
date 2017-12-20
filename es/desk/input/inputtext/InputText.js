import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputTextBoxBase from '../../../js/form/InputTextBoxBase';
import styles from './inputtext.css';

import { omit } from '../../../utils/objectUtils';
import cx from '../../../utils/classNamesUtils/classNamesBind';

var InputText = function (_Component) {
	_inherits(InputText, _Component);

	function InputText() {
		_classCallCheck(this, InputText);

		return _possibleConstructorReturn(this, (InputText.__proto__ || _Object$getPrototypeOf(InputText)).apply(this, arguments));
	}

	_createClass(InputText, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    required = _props.required,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly,
			    hidden = _props.hidden,
			    focused = _props.focused,
			    errored = _props.errored,
			    valid = _props.valid,
			    raised = _props.raised,
			    focusIn = _props.focusIn,
			    focusOut = _props.focusOut;


			var newProps = omit(this.props, ['className', 'styleId', 'focused', 'errored', 'valid', 'raised', 'focusIn', 'focusOut']);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

			//let onPassValidation = validation.validate ?  errored =  true
			return React.createElement(InputTextBoxBase, _extends({}, newProps, { onFocus: focusIn, onBlur: focusOut, className: classNames }));
		}
	}]);

	return InputText;
}(Component);

export default InputText;

InputText.defaultProps = {
	styleId: 'default'
};

InputText.propTypes = {
	styleId: PropTypes.string,

	id: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	list: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	autoFocus: PropTypes.bool,
	autoComplete: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	value: PropTypes.string,
	hidden: PropTypes.bool,

	fireEvent: PropTypes.string,
	focusIn: PropTypes.func,
	focusOut: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,

	validation: PropTypes.shape({
		show: PropTypes.bool,
		validateOn: PropTypes.string,
		rules: PropTypes.object,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		messages: PropTypes.object
	}),

	onFailValidation: PropTypes.func,
	onPassValidation: PropTypes.func,

	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	InputText.docs = {
		componentGroup: 'Atom'
	};
}