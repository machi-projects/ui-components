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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


			var FieldChild = _react2.default.Children.only(this.props.children);
			var childOnPassValidation = FieldChild.props.onPassValidation;
			var childOnFailValidation = FieldChild.props.onFailValidation;

			return _react2.default.createElement(
				'div',
				{ className: fieldStyle },
				_react2.default.cloneElement(FieldChild, (_React$cloneElement = {
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
}(_react.Component);

FormFieldBase.defaultProps = {
	valueKey: "value"
};

FormFieldBase.propTypes = {
	fieldStyle: _propTypes2.default.string,
	fieldValue: _propTypes2.default.any,
	getFieldValue: _propTypes2.default.func,
	valueKey: _propTypes2.default.string,
	tabIndex: _propTypes2.default.string,
	onFoucsField: _propTypes2.default.func,
	onBlurField: _propTypes2.default.func
};

var FormFieldSetBase = function (_React$Component) {
	_inherits(FormFieldSetBase, _React$Component);

	function FormFieldSetBase(props) {
		_classCallCheck(this, FormFieldSetBase);

		var _this6 = _possibleConstructorReturn(this, (FormFieldSetBase.__proto__ || Object.getPrototypeOf(FormFieldSetBase)).call(this, props));

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

			if ((0, _objectUtils.deepEqualObject)(nextProps.value, this.state.fieldValue) == false) {
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


			return _react2.default.createElement(
				'div',
				{ className: fieldSetStyle, tabIndex: tabIndex, ref: this.setFieldSetRef },
				_react2.default.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === FormFieldLabelBase.prototype) {
						var FieldLabelChild = _react2.default.Children.only(childComponent.props.children);
						return _react2.default.cloneElement(FieldLabelChild, Object.assign((0, _objectUtils.omit)(childComponent.props, ['children']), {
							errored: _this10.state.errored,
							raised: _this10.state.floatLabel
						}));
					} else if (childComponent.type.prototype === FormFieldBase.prototype) {
						return _react2.default.cloneElement(childComponent, {

							fieldValue: _this10.state.fieldValue,
							errored: _this10.state.errored,
							valid: !_this10.state.errored,
							focused: _this10.props.focusField,
							getFieldValue: _this10.onValueChangeItem,

							onFoucsField: _this10.props.floatingLabel ? _this10.onFoucsFieldItem : null,
							onBlurField: _this10.props.floatingLabel ? _this10.onBlurFieldItem : null,

							validation: Object.assign({}, childComponent.props.validation, validation, {
								validate: _this10.props.validate
							}),
							onPassValidation: _this10.onPassValidationItem,
							onFailValidation: _this10.onFailValidationItem

						});
					} else if (childComponent.type.prototype === FormFieldMsgBase.prototype) {
						var FieldMsgChild = _react2.default.Children.only(childComponent.props.children);

						return _react2.default.cloneElement(FieldMsgChild, Object.assign((0, _objectUtils.omit)(childComponent.props, ['children']), {
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
}(_react2.default.Component);

exports.default = FormFieldSetBase;


FormFieldSetBase.propTypes = {
	fieldSetStyle: _propTypes2.default.string,

	tabIndex: _propTypes2.default.string,
	fieldId: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.any,
	getValue: _propTypes2.default.func,

	focusField: _propTypes2.default.bool,
	floatingLabel: _propTypes2.default.bool,

	infoMessage: _propTypes2.default.string,
	errMessage: _propTypes2.default.string,

	validate: _propTypes2.default.bool,
	resetField: _propTypes2.default.bool,

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