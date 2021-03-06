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

var getTotalFieldsCount = function getTotalFieldsCount(fieldChildren) {

	var count = 0;
	_react2.default.Children.map(fieldChildren, function (child, i) {
		if (child && child.props.fieldId) {
			count += 1;
		}
	});

	return count;
};

var FormFieldsGroupBase = function (_Component) {
	_inherits(FormFieldsGroupBase, _Component);

	function FormFieldsGroupBase(props) {
		_classCallCheck(this, FormFieldsGroupBase);

		var _this = _possibleConstructorReturn(this, (FormFieldsGroupBase.__proto__ || Object.getPrototypeOf(FormFieldsGroupBase)).call(this, props));

		_this.state = {
			errored: false,
			validFields: {},
			inValidFields: {},
			totalFieldsCount: props.totalFieldsCount ? nextProps.totalFieldsCount : getTotalFieldsCount(props.children),
			errorFocusFieldId: props.errorFocusFieldId || null
		};

		_this.reseSetDoneFieldsCount();
		_this.onValidationDone = _this.onValidationDone.bind(_this);
		_this.getDoneFieldsCount = _this.getDoneFieldsCount.bind(_this);
		_this.reseSetDoneFieldsCount = _this.reseSetDoneFieldsCount.bind(_this);
		_this.addDoneFieldsCount = _this.addDoneFieldsCount.bind(_this);
		return _this;
	}

	_createClass(FormFieldsGroupBase, [{
		key: 'getDoneFieldsCount',
		value: function getDoneFieldsCount() {
			return this.doneFieldsCount;
		}
	}, {
		key: 'reseSetDoneFieldsCount',
		value: function reseSetDoneFieldsCount() {
			this.doneFieldsCount = 0;
		}
	}, {
		key: 'addDoneFieldsCount',
		value: function addDoneFieldsCount() {
			this.doneFieldsCount = this.doneFieldsCount + 1;
		}
	}, {
		key: 'onValidationDone',
		value: function onValidationDone() {
			var _this2 = this;

			var invalidFields = Object.keys(this.state.inValidFields);
			//let numOfValidFields =  Object.keys(this.state.validFields).length;
			if (invalidFields.length > 0) {

				this.props.onFailValidation && this.props.onFailValidation(this.state.inValidFields);
				if (this.props.focusFieldOnError) {
					this.setState({ errorFocusFieldId: invalidFields[0] }, function () {
						_this2.setState({ errorFocusFieldId: null });
					});
				}
			} else {
				this.props.onPassValidation && this.props.onPassValidation(this.state.validFields);
				this.setState({ errorFocusFieldId: null });
			}

			this.reseSetDoneFieldsCount();
		}
	}, {
		key: 'onPassValidationItem',
		value: function onPassValidationItem(fieldId, fieldVal, el) {
			var _this3 = this;

			this.setState(function (state) {
				state.validFields[fieldId] = fieldVal;
				state.inValidFields = (0, _objectUtils.omit)(state.inValidFields, fieldId);
				state.errored = false;
				return state;
			}, function () {

				_this3.addDoneFieldsCount();
				if (_this3.getDoneFieldsCount() === _this3.state.totalFieldsCount) {
					_this3.onValidationDone();
				}
			});
		}
	}, {
		key: 'onFailValidationItem',
		value: function onFailValidationItem(fieldId, rule, message, el) {
			var _this4 = this;

			this.setState(function (state) {
				state.inValidFields[fieldId] = _defineProperty({}, rule, message);
				state.validFields = (0, _objectUtils.omit)(state.validFields, fieldId);
				state.errored = true;
				return state;
			}, function () {

				_this4.addDoneFieldsCount();
				if (_this4.getDoneFieldsCount() === _this4.state.totalFieldsCount) {
					_this4.onValidationDone();
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var _props = this.props,
			    formFieldsGroupStyle = _props.formFieldsGroupStyle,
			    focusFieldOnError = _props.focusFieldOnError,
			    onChangeFieldValue = _props.onChangeFieldValue;

			return _react2.default.createElement(
				'div',
				{ className: formFieldsGroupStyle },
				_react2.default.Children.map(this.props.children, function (child, i) {
					return child ? _react2.default.cloneElement(child, {
						key: i,
						validate: _this5.props.validate,
						resetField: _this5.props.resetForm,
						tabIndex: focusFieldOnError ? "-1" : null,
						focusField: _this5.state.errorFocusFieldId == child.props.fieldId,
						getValue: onChangeFieldValue ? function (val) {
							onChangeFieldValue(child.props.fieldId, val);
						} : null,
						onPassValidation: function onPassValidation(fieldId, fieldVal, el) {
							child.props.onPassValidation && child.props.onPassValidation(fieldId, fieldVal, el);
							_this5.props.validate && _this5.onPassValidationItem(fieldId, fieldVal, el);
						},
						onFailValidation: function onFailValidation(fieldId, rule, message, el) {
							child.props.onFailValidation && child.props.onFailValidation(fieldId, rule, message, el);
							_this5.props.validate && _this5.onFailValidationItem(fieldId, rule, message, el);
						}
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

	focusFieldOnError: _propTypes2.default.bool,
	validate: _propTypes2.default.bool,
	resetForm: _propTypes2.default.bool,
	onFailValidation: _propTypes2.default.func,
	onPassValidation: _propTypes2.default.func,
	onChangeFieldValue: _propTypes2.default.func,

	totalFieldsCount: _propTypes2.default.number,
	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['FormFieldSetBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['FormFieldSetBase']) }))])
};