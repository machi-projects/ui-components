'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormFieldBase = exports.FormFieldMsgBase = exports.FormFieldLabelBase = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectUtils = require('../../utils/objectUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormFieldLabelBase = exports.FormFieldLabelBase = function (_Component) {
	_inherits(FormFieldLabelBase, _Component);

	function FormFieldLabelBase() {
		_classCallCheck(this, FormFieldLabelBase);

		return _possibleConstructorReturn(this, (FormFieldLabelBase.__proto__ || Object.getPrototypeOf(FormFieldLabelBase)).apply(this, arguments));
	}

	_createClass(FormFieldLabelBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return FormFieldLabelBase;
}(_react.Component);

var FormFieldMsgBase = exports.FormFieldMsgBase = function (_Component2) {
	_inherits(FormFieldMsgBase, _Component2);

	function FormFieldMsgBase() {
		_classCallCheck(this, FormFieldMsgBase);

		return _possibleConstructorReturn(this, (FormFieldMsgBase.__proto__ || Object.getPrototypeOf(FormFieldMsgBase)).apply(this, arguments));
	}

	_createClass(FormFieldMsgBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return FormFieldMsgBase;
}(_react.Component);

var FormFieldBase = exports.FormFieldBase = function (_Component3) {
	_inherits(FormFieldBase, _Component3);

	function FormFieldBase(props) {
		_classCallCheck(this, FormFieldBase);

		var _this3 = _possibleConstructorReturn(this, (FormFieldBase.__proto__ || Object.getPrototypeOf(FormFieldBase)).call(this, props));

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

			var FieldChild = _react2.default.Children.only(this.props.children);
			var childOnPassValidation = FieldChild.props.onPassValidation;
			var childOnFailValidation = FieldChild.props.onFailValidation;

			return _react2.default.createElement(
				'div',
				{ className: fieldStyle, tabIndex: tabIndex },
				_react2.default.cloneElement(FieldChild, {
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
}(_react.Component);

FormFieldBase.propTypes = {
	fieldStyle: _propTypes2.default.string,
	tabIndex: _propTypes2.default.string
};

var FormFieldSetBase = function (_React$Component) {
	_inherits(FormFieldSetBase, _React$Component);

	function FormFieldSetBase(props) {
		_classCallCheck(this, FormFieldSetBase);

		var _this7 = _possibleConstructorReturn(this, (FormFieldSetBase.__proto__ || Object.getPrototypeOf(FormFieldSetBase)).call(this, props));

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


			return _react2.default.createElement(
				'div',
				{ className: fieldSetStyle, tabIndex: tabIndex, ref: this.setFieldSetRef },
				_react2.default.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						var FieldLabelChild = _react2.default.Children.only(childComponent.props.children);
						return _react2.default.cloneElement(FieldLabelChild, Object.assign((0, _objectUtils.omit)(childComponent.props, ['children']), {
							errored: _this10.state.errored,
							focused: _this10.state.fieldFocused,
							raised: _this10.state.labelRaised
						}));
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return _react2.default.cloneElement(childComponent, {
							errored: _this10.state.errored,

							focused: _this10.state.fieldFocused,
							fireFieldFocusIn: _this10.props.fireFocusIn,
							onFocusFieldUpdate: focusFieldOnChange ? _this10.onFocusFieldUpdate : null,

							valid: !_this10.state.errored,
							validation: Object.assign({}, childComponent.props.validation, validation, {
								validate: _this10.state.validate
							}),
							onPassValidation: _this10.onPassValidationItem,
							onFailValidation: _this10.onFailValidationItem
						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						var FieldMsgChild = _react2.default.Children.only(childComponent.props.children);

						return _react2.default.cloneElement(FieldMsgChild, Object.assign((0, _objectUtils.omit)(childComponent.props, ['children']), {
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
}(_react2.default.Component);

exports.default = FormFieldSetBase;


FormFieldSetBase.propTypes = {
	fieldSetStyle: _propTypes2.default.string,

	tabIndex: _propTypes2.default.string,
	fieldId: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.any,

	fireFocusIn: _propTypes2.default.bool,
	hideMessageOnValid: _propTypes2.default.bool,
	focusFieldOnChange: _propTypes2.default.bool,
	raiseLabelOnChange: _propTypes2.default.bool,

	infoMessage: _propTypes2.default.string,
	errMessage: _propTypes2.default.string,

	validate: _propTypes2.default.bool,

	validation: _propTypes2.default.shape({
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({
		name: _propTypes2.default.oneOf(['FormFieldLabelBase', 'FormFieldBase', 'FormFieldMsgBase'])
	}), _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.oneOf(['FormFieldMsgBase', 'FormFieldBase', 'FormFieldMsgBase'])
	}))])
};