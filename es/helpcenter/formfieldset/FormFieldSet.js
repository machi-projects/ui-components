import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormFieldSetBase, { FormFieldBase, FormFieldMsgBase, FormFieldLabelBase } from '../../js/form/FormFieldSetBase';
import styles from './formfieldset.css';
import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

import { Label, Message } from '../index';

export var FormField = function (_Component) {
	_inherits(FormField, _Component);

	function FormField() {
		_classCallCheck(this, FormField);

		return _possibleConstructorReturn(this, (FormField.__proto__ || _Object$getPrototypeOf(FormField)).apply(this, arguments));
	}

	_createClass(FormField, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return FormField;
}(Component);

var FormFieldSet = function (_Component2) {
	_inherits(FormFieldSet, _Component2);

	function FormFieldSet() {
		_classCallCheck(this, FormFieldSet);

		return _possibleConstructorReturn(this, (FormFieldSet.__proto__ || _Object$getPrototypeOf(FormFieldSet)).apply(this, arguments));
	}

	_createClass(FormFieldSet, [{
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
			    raised = _props.raised;


			var newProps = omit(this.props, ['className', 'styleId', 'readOnly', 'disabled', 'hidden', 'focused', 'errored', 'raised']);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'raised', raised), _cx));

			var styleMappings = styleMapping[styleId];
			var fieldStyle = styles[styleMappings.fieldStyle];

			//styleId={styleMappings.labelStyle}
			//styleId={styleMappings.messageStyle}
			return React.createElement(
				FormFieldSetBase,
				_extends({}, newProps, { fieldSetStyle: classNames }),
				React.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === Label.prototype) {
						return React.createElement(
							FormFieldLabelBase,
							_extends({}, childComponent.props, {
								disabled: disabled,
								errored: errored,
								focused: focused
							}),
							childComponent
						);
					} else if (childComponent.type.prototype == FormField.prototype) {
						return React.createElement(FormFieldBase, _extends({}, childComponent.props, {
							disabled: disabled,
							readOnly: readOnly,
							focused: focused,
							errored: errored,
							fieldStyle: fieldStyle
						}));
					} else if (childComponent.type.prototype === Message.prototype) {
						return React.createElement(
							FormFieldMsgBase,
							_extends({}, childComponent.props, {
								disabled: disabled,
								errored: errored,
								focused: focused
							}),
							childComponent
						);
					}

					return null;
				})
			);
		}
	}]);

	return FormFieldSet;
}(Component);

export default FormFieldSet;


FormFieldSet.defaultProps = {
	styleId: 'default'
};

FormFieldSet.propTypes = {

	fieldSetErrorStyle: PropTypes.string,

	tabIndex: PropTypes.string,
	fieldId: PropTypes.string.isRequired,
	value: PropTypes.any,

	fireFocusIn: PropTypes.bool,
	hideMessageOnValid: PropTypes.bool,
	focusFieldOnChange: PropTypes.bool,
	raiseLabelOnChange: PropTypes.bool,

	infoMessage: PropTypes.string,
	errMessage: PropTypes.string,

	validate: PropTypes.bool,

	validation: PropTypes.shape({
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({
		name: PropTypes.oneOf(['Label', 'FormField', 'Message'])
	}), PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.oneOf(['Label', 'FormField', 'Message'])
	}))]),

	styleId: PropTypes.string,

	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	required: PropTypes.bool,
	readOnly: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	hidden: PropTypes.bool,
	raised: PropTypes.bool
};

if (__DOCS__) {
	FormFieldSet.docs = {
		componentGroup: 'Atom'
	};
}