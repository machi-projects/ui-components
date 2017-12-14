'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var FormFieldsGroupBase = function (_Component) {
	_inherits(FormFieldsGroupBase, _Component);

	function FormFieldsGroupBase(props) {
		_classCallCheck(this, FormFieldsGroupBase);

		var _this = _possibleConstructorReturn(this, (FormFieldsGroupBase.__proto__ || Object.getPrototypeOf(FormFieldsGroupBase)).call(this, props));

		_this.state = {
			errored: false,
			validate: props.validate,
			validFields: {},
			inValidFields: {}
		};
		return _this;
	}

	_createClass(FormFieldsGroupBase, [{
		key: 'onPassValidationItem',
		value: function onPassValidationItem(onPassValidationCallback) {
			var _this2 = this;

			return function (fieldId, fieldVal, el) {
				onPassValidationCallback && onPassValidationCallback(fieldId, fieldVal, el);

				if (_this2.state.validate) {
					_this2.setState(function (state) {
						state.validFields[fieldId] = fieldVal;
						state.inValidFields = (0, _objectUtils.omit)(state.inValidFields, fieldId);
						state.validate = false;
						state.errored = false;

						return state;
					}, function () {
						Object.keys(state.inValidFields).length == 0 && _this2.props.onPassValidation && _this2.props.onPassValidation(_this2.state.validatedFields);
					});
				}
			};
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(onFailValidationCallback) {
			var _this3 = this;

			return function (fieldId, rule, message, el) {
				onFailValidationCallback && onFailValidationCallback(fieldId, rule, message, el);
				if (_this3.state.validate) {
					_this3.setState(function (state) {
						state.inValidFields[fieldId] = _defineProperty({}, rule, message);
						state.validFields = (0, _objectUtils.omit)(state.validFields, fieldId);
						state.validate = false;
						state.errored = true;
						return state;
					}, function () {
						_this3.props.onFailValidation && _this3.props.onFailValidation(_this3.state.inValidFields);
					});
				}
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var formFieldsGroupStyle = this.props.formFieldsGroupStyle;


			return _react2.default.createElement(
				'div',
				{ className: formFieldsGroupStyle, tabIndex: '-1' },
				_react2.default.Children.map(this.props.children, function (child, i) {
					return child ? _react2.default.cloneElement(child, {
						key: i,
						validation: Object.assign({}, child.props.validation, {
							validate: _this4.state.validate
						}),
						onPassValidation: _this4.onPassValidationItem(child.props.onPassValidation),
						onFailValidation: _this4.onFailValidationItem(child.props.onFailValidation)
					}) : null;
				})
			);
		}
	}]);

	return FormFieldsGroupBase;
}(_react.Component);

exports.default = FormFieldsGroupBase;


FormFieldsGroupBase.propTypes = {
	formFieldsGroupStyle: _propTypes2.default.string,

	validate: _propTypes2.default.bool,
	onFailValidation: _propTypes2.default.func,
	onPassValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['FormFieldSetBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['FormFieldSetBase']) }))])
};