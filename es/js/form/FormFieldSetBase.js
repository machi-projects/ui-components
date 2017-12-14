import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from '../../utils/objectUtils';

export var FormFieldLabelBase = function (_Component) {
	_inherits(FormFieldLabelBase, _Component);

	function FormFieldLabelBase() {
		_classCallCheck(this, FormFieldLabelBase);

		return _possibleConstructorReturn(this, (FormFieldLabelBase.__proto__ || _Object$getPrototypeOf(FormFieldLabelBase)).apply(this, arguments));
	}

	_createClass(FormFieldLabelBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return FormFieldLabelBase;
}(Component);

export var FormFieldMsgBase = function (_Component2) {
	_inherits(FormFieldMsgBase, _Component2);

	function FormFieldMsgBase() {
		_classCallCheck(this, FormFieldMsgBase);

		return _possibleConstructorReturn(this, (FormFieldMsgBase.__proto__ || _Object$getPrototypeOf(FormFieldMsgBase)).apply(this, arguments));
	}

	_createClass(FormFieldMsgBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return FormFieldMsgBase;
}(Component);

export var FormFieldBase = function (_Component3) {
	_inherits(FormFieldBase, _Component3);

	function FormFieldBase() {
		_classCallCheck(this, FormFieldBase);

		return _possibleConstructorReturn(this, (FormFieldBase.__proto__ || _Object$getPrototypeOf(FormFieldBase)).apply(this, arguments));
	}

	_createClass(FormFieldBase, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    fieldStyle = _props.fieldStyle,
			    tabIndex = _props.tabIndex,
			    required = _props.required,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly,
			    focused = _props.focused,
			    errored = _props.errored,
			    valid = _props.valid,
			    validation = _props.validation,
			    _onPassValidation = _props.onPassValidation,
			    _onFailValidation = _props.onFailValidation;

			var FieldChild = React.Children.only(this.props.children);
			var childOnPassValidation = FieldChild.props.onPassValidation;
			var childOnFailValidation = FieldChild.props.onFailValidation;

			return React.createElement(
				'div',
				{ className: fieldStyle, tabIndex: tabIndex },
				React.cloneElement(FieldChild, {
					disabled: disabled,
					readOnly: readOnly,
					errored: errored,
					focused: focused,
					valid: valid,
					validation: validation,
					onPassValidation: function onPassValidation(a, b) {
						childOnPassValidation && childOnPassValidation(a, b);
						_onPassValidation && _onPassValidation(a, b);
					},
					onFailValidation: function onFailValidation(a, b, c) {
						childOnFailValidation && childOnFailValidation(a, b, c);
						_onFailValidation && _onFailValidation(a, b, c);
					}
				})
			);
		}
	}]);

	return FormFieldBase;
}(Component);

FormFieldBase.propTypes = {
	fieldStyle: PropTypes.string,
	tabIndex: PropTypes.string
};

var FormFieldSetBase = function (_React$Component) {
	_inherits(FormFieldSetBase, _React$Component);

	function FormFieldSetBase(props) {
		_classCallCheck(this, FormFieldSetBase);

		var _this4 = _possibleConstructorReturn(this, (FormFieldSetBase.__proto__ || _Object$getPrototypeOf(FormFieldSetBase)).call(this, props));

		_this4.state = {
			errored: false,
			errMessage: null,
			validate: props.validation && props.validation.validate ? true : false
		};

		//Bind the method to the component context
		_this4.onPassValidationItem = _this4.onPassValidationItem.bind(_this4);
		_this4.onFailValidationItem = _this4.onFailValidationItem.bind(_this4);
		_this4.focusErrorFieldSet = _this4.focusErrorFieldSet.bind(_this4);
		return _this4;
	}

	_createClass(FormFieldSetBase, [{
		key: 'onPassValidationItem',
		value: function onPassValidationItem(val, el) {
			var _this5 = this;

			this.setState(function (state) {
				state.errored = false;
				state.errMessage = null;
				state.validate = false;
				return state;
			}, function () {
				_this5.props.onPassValidation && _this5.props.onPassValidation(_this5.props.fieldId, val, el);
			});
		}
	}, {
		key: 'focusErrorFieldSet',
		value: function focusErrorFieldSet(el) {
			el.focus && el.focus();
			//React.findDOMNode(this).focus();
			//requestAnimationFrame(()=>{ el.focus && el.focus() });  will be in on the same element id...
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(rule, message, el) {
			var _this6 = this;

			this.setState(function (state) {
				state.errored = true;
				state.errMessage = message;
				state.validate = false;
				return state;
			}, function () {
				requestAnimationFrame(_this6.focusErrorFieldSet.bind(el));
				_this6.props.onFailValidation && _this6.props.onFailValidation(_this6.props.fieldId, rule, _this6.state.errMessage, el);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this7 = this;

			var _props2 = this.props,
			    fieldSetStyle = _props2.fieldSetStyle,
			    focusFieldOnError = _props2.focusFieldOnError,
			    hideMessageOnValid = _props2.hideMessageOnValid,
			    fieldInfo = _props2.fieldInfo,
			    validation = _props2.validation,
			    onPassValidation = _props2.onPassValidation,
			    onFailValidation = _props2.onFailValidation;


			return React.createElement(
				'div',
				{ className: fieldSetStyle, tabIndex: '-1' },
				React.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						var FieldLabelChild = React.Children.only(childComponent.props.children);
						return React.cloneElement(FieldLabelChild, _Object$assign(omit(childComponent.props, ['children']), {
							errored: _this7.state.errored,
							focused: _this7.state.errored && focusFieldOnError
						}));
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return React.cloneElement(childComponent, {
							errored: _this7.state.errored,
							focused: _this7.state.errored && focusFieldOnError,
							valid: !_this7.state.errored,
							validation: _Object$assign({}, childComponent.props.validation, validation, {
								validate: _this7.state.validate
							}),
							onPassValidation: _this7.onPassValidationItem,
							onFailValidation: _this7.onFailValidationItem
						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						var FieldMsgChild = React.Children.only(childComponent.props.children);

						return React.cloneElement(FieldMsgChild, _Object$assign(omit(childComponent.props, ['children']), {
							errored: _this7.state.errored,
							focused: _this7.state.errored && focusFieldOnError,
							valid: !_this7.state.errored,
							hidden: !_this7.state.errored && hideMessageOnValid
						}), _this7.state.errored ? _this7.state.errMessage : _this7.props.infoMessage || FieldMsgChild.props.children);
					}

					return null;
				})
			);
		}
	}]);

	return FormFieldSetBase;
}(React.Component);

export default FormFieldSetBase;


FormFieldSetBase.propTypes = {
	fieldSetStyle: PropTypes.string,

	fieldId: PropTypes.string.isRequired,
	value: PropTypes.any,

	hideMessageOnValid: PropTypes.bool,
	focusFieldOnError: PropTypes.bool,

	infoMessage: PropTypes.string,
	errMessage: PropTypes.string,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({
		name: PropTypes.oneOf(['FormFieldLabelBase', 'FormFieldBase', 'FormFieldMsgBase'])
	}), PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.oneOf(['FormFieldMsgBase', 'FormFieldBase', 'FormFieldMsgBase'])
	}))])
};