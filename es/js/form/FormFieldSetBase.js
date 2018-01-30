import _Object$assign from 'babel-runtime/core-js/object/assign';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, deepEqualObject, IsEqualGivenKeys } from '../../utils/objectUtils';

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
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this4 = this;

			if (nextProps.focused != this.props.focused && nextProps.focused) {
				requestAnimationFrame(function () {
					_this4.fieldRef && _this4.fieldRef.focus();
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this,
			    _React$cloneElement;

			var _props = this.props,
			    fieldStyle = _props.fieldStyle,
			    tabIndex = _props.tabIndex,
			    focused = _props.focused,
			    errored = _props.errored,
			    valid = _props.valid,
			    validation = _props.validation,
			    _onPassValidation = _props.onPassValidation,
			    _onFailValidation = _props.onFailValidation,
			    fieldValue = _props.fieldValue,
			    getFieldValue = _props.getFieldValue,
			    valueKey = _props.valueKey,
			    onFoucsField = _props.onFoucsField,
			    onBlurField = _props.onBlurField;


			var FieldChild = React.Children.only(this.props.children);
			var childOnPassValidation = FieldChild.props.onPassValidation;
			var childOnFailValidation = FieldChild.props.onFailValidation;

			return React.createElement(
				'div',
				{ className: fieldStyle },
				React.cloneElement(FieldChild, (_React$cloneElement = {
					getElementRef: function getElementRef(el) {
						_this5.fieldRef = el;
					}

				}, _defineProperty(_React$cloneElement, valueKey, fieldValue), _defineProperty(_React$cloneElement, 'getValue', getFieldValue), _defineProperty(_React$cloneElement, 'errored', errored), _defineProperty(_React$cloneElement, 'valid', valid), _defineProperty(_React$cloneElement, 'onFocus', onFoucsField), _defineProperty(_React$cloneElement, 'onBlur', onBlurField), _defineProperty(_React$cloneElement, 'validation', validation), _defineProperty(_React$cloneElement, 'tabIndex', onFoucsField ? null : "-1"), _defineProperty(_React$cloneElement, 'onPassValidation', function onPassValidation(a, b) {
					childOnPassValidation && childOnPassValidation(a, b);
					_onPassValidation && _onPassValidation(a, b);
				}), _defineProperty(_React$cloneElement, 'onFailValidation', function onFailValidation(a, b, c) {
					childOnFailValidation && childOnFailValidation(a, b, c);
					_onFailValidation && _onFailValidation(a, b, c);
				}), _React$cloneElement))
			);
		}
	}]);

	return FormFieldBase;
}(Component);

FormFieldBase.defaultProps = {
	valueKey: "value"
};

FormFieldBase.propTypes = {
	fieldStyle: PropTypes.string,
	fieldValue: PropTypes.any,
	getFieldValue: PropTypes.func,
	valueKey: PropTypes.string,
	tabIndex: PropTypes.string,
	onFoucsField: PropTypes.func,
	onBlurField: PropTypes.func
};

var FormFieldSetBase = function (_React$Component) {
	_inherits(FormFieldSetBase, _React$Component);

	function FormFieldSetBase(props) {
		_classCallCheck(this, FormFieldSetBase);

		var _this6 = _possibleConstructorReturn(this, (FormFieldSetBase.__proto__ || _Object$getPrototypeOf(FormFieldSetBase)).call(this, props));

		_this6.state = {
			errored: false,
			errMessage: null,
			floatLabel: _this6.props.floatLabel && props.value ? true : false,
			fieldValue: props.value
		};

		//Bind the method to the component context
		_this6.onPassValidationItem = _this6.onPassValidationItem.bind(_this6);
		_this6.onFailValidationItem = _this6.onFailValidationItem.bind(_this6);
		_this6.onValueChangeItem = _this6.onValueChangeItem.bind(_this6);
		_this6.setFieldSetRef = _this6.setFieldSetRef.bind(_this6);

		_this6.onFoucsFieldItem = _this6.onFoucsFieldItem.bind(_this6);
		_this6.onBlurFieldItem = _this6.onBlurFieldItem.bind(_this6);
		return _this6;
	}

	_createClass(FormFieldSetBase, [{
		key: 'setFieldSetRef',
		value: function setFieldSetRef(el) {
			this.fieldSetRef = el;
		}
	}, {
		key: 'onPassValidationItem',
		value: function onPassValidationItem(val, el) {
			var _this7 = this;

			this.setState(function (state) {
				state.errored = false;
				state.errMessage = null;
				return state;
			}, function () {
				_this7.props.onPassValidation && _this7.props.onPassValidation(_this7.props.fieldId, val, el);
			});
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(rule, message, el) {
			var _this8 = this;

			this.setState(function (state) {
				state.errored = true;
				state.errMessage = message;
				return state;
			}, function () {
				_this8.props.onFailValidation && _this8.props.onFailValidation(_this8.props.fieldId, rule, _this8.state.errMessage, el);
			});
		}
	}, {
		key: 'onFoucsFieldItem',
		value: function onFoucsFieldItem() {
			if (this.props.floatingLabel) {
				this.setState({ floatLabel: true });
			}
		}
	}, {
		key: 'onBlurFieldItem',
		value: function onBlurFieldItem() {
			if (this.props.floatingLabel) {
				this.setState({ floatLabel: this.state.fieldValue ? true : false });
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (deepEqualObject(nextProps.value, this.state.fieldValue) == false) {
				this.onValueChangeItem(nextProps.value);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {

			if (prevProps.resetField !== this.props.resetField) {
				this.props.resetField && this.setState({ errored: false, errMessage: null });
			}
		}
	}, {
		key: 'onValueChangeItem',
		value: function onValueChangeItem(fieldValue) {
			var _this9 = this;

			var stateValues = {};
			if (this.props.floatingLabel) {
				stateValues.floatLabel = fieldValue ? true : false;
			}

			stateValues.fieldValue = fieldValue;

			this.setState(stateValues, function () {
				_this9.props.getValue && _this9.props.getValue(_this9.state.fieldValue);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this10 = this;

			var _props2 = this.props,
			    fieldSetStyle = _props2.fieldSetStyle,
			    tabIndex = _props2.tabIndex,
			    floatingLabel = _props2.floatingLabel,
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
							raised: _this10.state.floatLabel
						}));
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return React.cloneElement(childComponent, {

							fieldValue: _this10.state.fieldValue,
							errored: _this10.state.errored,
							valid: !_this10.state.errored,
							focused: _this10.props.focusField,
							getFieldValue: _this10.onValueChangeItem,

							onFoucsField: _this10.props.floatingLabel ? _this10.onFoucsFieldItem : null,
							onBlurField: _this10.props.floatingLabel ? _this10.onBlurFieldItem : null,

							validation: _Object$assign({}, childComponent.props.validation, validation, {
								validate: _this10.props.validate
							}),
							onPassValidation: _this10.onPassValidationItem,
							onFailValidation: _this10.onFailValidationItem

						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						var FieldMsgChild = React.Children.only(childComponent.props.children);

						return React.cloneElement(FieldMsgChild, _Object$assign(omit(childComponent.props, ['children']), {
							errored: _this10.state.errored,
							valid: !_this10.state.errored
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
	getValue: PropTypes.func,

	focusField: PropTypes.bool,
	floatingLabel: PropTypes.bool,

	infoMessage: PropTypes.string,
	errMessage: PropTypes.string,

	validate: PropTypes.bool,
	resetField: PropTypes.bool,

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