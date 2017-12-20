import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, equals } from '../../utils/objectUtils';

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

	function FormFieldBase(props) {
		_classCallCheck(this, FormFieldBase);

		var _this3 = _possibleConstructorReturn(this, (FormFieldBase.__proto__ || _Object$getPrototypeOf(FormFieldBase)).call(this, props));

		_this3.onFocusInFieldItem = _this3.onFocusInFieldItem.bind(_this3);
		_this3.onFocusOutFieldItem = _this3.onFocusOutFieldItem.bind(_this3);

		_this3.state = {
			fireEvent: props.fireFieldFocusIn ? "focus" : null,
			fireFieldFocusIn: props.fireFieldFocusIn || false
		};
		return _this3;
	}

	_createClass(FormFieldBase, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.fireFieldFocusIn !== this.state.fireFieldFocusIn) {

				this.setState({
					fireEvent: nextProps.fireFieldFocusIn ? "focus" : null,
					fireFieldFocusIn: nextProps.fireFieldFocusIn
				});
			}
		}
	}, {
		key: 'onFocusInFieldItem',
		value: function onFocusInFieldItem(ev) {
			var _this4 = this;

			this.props.onFocusFieldUpdate && this.props.onFocusFieldUpdate("up", null, function () {

				_this4.setState({

					fireEvent: null,
					fireFieldFocusIn: false

				});
			});
		}
	}, {
		key: 'onFocusOutFieldItem',
		value: function onFocusOutFieldItem(ev) {
			var _this5 = this;

			this.props.onFocusFieldUpdate && this.props.onFocusFieldUpdate("down", ev.target.value, function () {

				_this5.setState({

					fireEvent: "blur",
					fireFieldFocusIn: false

				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

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
			    _onFailValidation = _props.onFailValidation,
			    onFocusFieldUpdate = _props.onFocusFieldUpdate;

			var FieldChild = React.Children.only(this.props.children);
			var childOnPassValidation = FieldChild.props.onPassValidation;
			var childOnFailValidation = FieldChild.props.onFailValidation;

			return React.createElement(
				'div',
				{ className: fieldStyle, tabIndex: tabIndex },
				React.cloneElement(FieldChild, {
					ref: function ref(el) {
						_this6.fieldRef = el;
					},
					disabled: disabled,
					readOnly: readOnly,
					errored: errored,
					focused: focused,
					valid: valid,
					fireEvent: this.state.fireFieldFocusIn ? this.state.fireEvent : this.state.fireEvent,
					validation: validation,
					focusIn: this.onFocusInFieldItem,
					focusOut: this.onFocusOutFieldItem,
					tabIndex: FieldChild.props.tabIndex || "-1",
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

		var _this7 = _possibleConstructorReturn(this, (FormFieldSetBase.__proto__ || _Object$getPrototypeOf(FormFieldSetBase)).call(this, props));

		_this7.state = {
			errored: false,
			errMessage: null,
			validate: props.validation && props.validation.validate ? true : false,
			labelRaised: props.raiseLabelOnChange ? props.value ? true : false : false,
			fieldFocused: false,
			fireFocusIn: props.fireFocusIn || false
		};

		//Bind the method to the component context
		_this7.onPassValidationItem = _this7.onPassValidationItem.bind(_this7);
		_this7.onFailValidationItem = _this7.onFailValidationItem.bind(_this7);
		_this7.onFocusFieldUpdate = _this7.onFocusFieldUpdate.bind(_this7);
		_this7.setFieldSetRef = _this7.setFieldSetRef.bind(_this7);
		return _this7;
	}

	_createClass(FormFieldSetBase, [{
		key: 'setFieldSetRef',
		value: function setFieldSetRef(el) {
			this.fieldSetRef = el;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.value != this.props.value || nextProps.validate !== this.props.validate) {

				this.setState({
					validate: nextProps.validate,
					labelRaised: nextProps.raiseLabelOnChange ? nextProps.value ? true : false : false
				});
			}
		}
	}, {
		key: 'onPassValidationItem',
		value: function onPassValidationItem(val, el) {
			var _this8 = this;

			this.setState(function (state) {
				state.errored = false;
				state.errMessage = null;
				state.validate = false;
				return state;
			}, function () {
				_this8.props.onPassValidation && _this8.props.onPassValidation(_this8.props.fieldId, val, el);
			});
		}
	}, {
		key: 'onFocusFieldUpdate',
		value: function onFocusFieldUpdate(type, value, callback) {

			this.setState({
				fieldFocused: type == "up",
				labelRaised: this.props.raiseLabelOnChange && (type == "up" ? true : value && value.length > 0 ? true : false)
			}, function () {
				callback && callback();
				/*if(this.props.fireFocusIn ){
    	requestAnimationFrame(()=>{
    		this.fieldSetRef && this.fieldSetRef.focus && this.fieldSetRef.focus();
    	})
    }*/
			});
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(rule, message, el) {
			var _this9 = this;

			this.setState(function (state) {
				state.errored = true;
				state.errMessage = message;
				state.validate = false;
				return state;
			}, function () {
				_this9.props.onFailValidation && _this9.props.onFailValidation(_this9.props.fieldId, rule, _this9.state.errMessage, el);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this10 = this;

			var _props2 = this.props,
			    fieldSetStyle = _props2.fieldSetStyle,
			    focusFieldOnChange = _props2.focusFieldOnChange,
			    hideMessageOnValid = _props2.hideMessageOnValid,
			    tabIndex = _props2.tabIndex,
			    fieldInfo = _props2.fieldInfo,
			    validation = _props2.validation,
			    onPassValidation = _props2.onPassValidation,
			    onFailValidation = _props2.onFailValidation;


			return React.createElement(
				'div',
				{ className: fieldSetStyle, tabIndex: tabIndex, ref: this.setFieldSetRef },
				React.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						var FieldLabelChild = React.Children.only(childComponent.props.children);
						return React.cloneElement(FieldLabelChild, _Object$assign(omit(childComponent.props, ['children']), {
							errored: _this10.state.errored,
							focused: _this10.state.fieldFocused,
							raised: _this10.state.labelRaised
						}));
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return React.cloneElement(childComponent, {
							errored: _this10.state.errored,

							focused: _this10.state.fieldFocused,
							fireFieldFocusIn: _this10.props.fireFocusIn,
							onFocusFieldUpdate: focusFieldOnChange ? _this10.onFocusFieldUpdate : null,

							valid: !_this10.state.errored,
							validation: _Object$assign({}, childComponent.props.validation, validation, {
								validate: _this10.state.validate
							}),
							onPassValidation: _this10.onPassValidationItem,
							onFailValidation: _this10.onFailValidationItem
						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						var FieldMsgChild = React.Children.only(childComponent.props.children);

						return React.cloneElement(FieldMsgChild, _Object$assign(omit(childComponent.props, ['children']), {
							errored: _this10.state.errored,
							focused: _this10.state.fieldFocused,
							valid: !_this10.state.errored,
							hidden: !_this10.state.errored && hideMessageOnValid
						}), _this10.state.errored ? _this10.state.errMessage : _this10.props.infoMessage || FieldMsgChild.props.children);
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
		name: PropTypes.oneOf(['FormFieldLabelBase', 'FormFieldBase', 'FormFieldMsgBase'])
	}), PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.oneOf(['FormFieldMsgBase', 'FormFieldBase', 'FormFieldMsgBase'])
	}))])
};