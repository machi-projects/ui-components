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

	function FormFieldBase() {
		_classCallCheck(this, FormFieldBase);

		return _possibleConstructorReturn(this, (FormFieldBase.__proto__ || Object.getPrototypeOf(FormFieldBase)).apply(this, arguments));
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

			var FieldChild = _react2.default.Children.only(this.props.children);
			var childOnPassValidation = FieldChild.props.onPassValidation;
			var childOnFailValidation = FieldChild.props.onFailValidation;

			return _react2.default.createElement(
				'div',
				{ className: fieldStyle, tabIndex: tabIndex },
				_react2.default.cloneElement(FieldChild, {
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
}(_react.Component);

FormFieldBase.propTypes = {
	fieldStyle: _propTypes2.default.string,
	tabIndex: _propTypes2.default.string
};

var FormFieldSetBase = function (_React$Component) {
	_inherits(FormFieldSetBase, _React$Component);

	function FormFieldSetBase(props) {
		_classCallCheck(this, FormFieldSetBase);

		var _this4 = _possibleConstructorReturn(this, (FormFieldSetBase.__proto__ || Object.getPrototypeOf(FormFieldSetBase)).call(this, props));

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


			return _react2.default.createElement(
				'div',
				{ className: fieldSetStyle, tabIndex: '-1' },
				_react2.default.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						var FieldLabelChild = _react2.default.Children.only(childComponent.props.children);
						return _react2.default.cloneElement(FieldLabelChild, Object.assign((0, _objectUtils.omit)(childComponent.props, ['children']), {
							errored: _this7.state.errored,
							focused: _this7.state.errored && focusFieldOnError
						}));
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return _react2.default.cloneElement(childComponent, {
							errored: _this7.state.errored,
							focused: _this7.state.errored && focusFieldOnError,
							valid: !_this7.state.errored,
							validation: Object.assign({}, childComponent.props.validation, validation, {
								validate: _this7.state.validate
							}),
							onPassValidation: _this7.onPassValidationItem,
							onFailValidation: _this7.onFailValidationItem
						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						var FieldMsgChild = _react2.default.Children.only(childComponent.props.children);

						return _react2.default.cloneElement(FieldMsgChild, Object.assign((0, _objectUtils.omit)(childComponent.props, ['children']), {
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
}(_react2.default.Component);

exports.default = FormFieldSetBase;


FormFieldSetBase.propTypes = {
	fieldSetStyle: _propTypes2.default.string,

	fieldId: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.any,

	hideMessageOnValid: _propTypes2.default.bool,
	focusFieldOnError: _propTypes2.default.bool,

	infoMessage: _propTypes2.default.string,
	errMessage: _propTypes2.default.string,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
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