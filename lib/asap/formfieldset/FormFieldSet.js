'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormField = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormFieldSetBase = require('../../js/form/FormFieldSetBase');

var _FormFieldSetBase2 = _interopRequireDefault(_FormFieldSetBase);

var _formfieldset = require('./formfieldset.css');

var _formfieldset2 = _interopRequireDefault(_formfieldset);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

var _objectUtils = require('../../utils/objectUtils');

var _classNamesBind = require('../../utils/classNamesUtils/classNamesBind');

var _classNamesBind2 = _interopRequireDefault(_classNamesBind);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormField = exports.FormField = function (_Component) {
	_inherits(FormField, _Component);

	function FormField() {
		_classCallCheck(this, FormField);

		return _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).apply(this, arguments));
	}

	_createClass(FormField, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return FormField;
}(_react.Component);

var FormFieldSet = function (_Component2) {
	_inherits(FormFieldSet, _Component2);

	function FormFieldSet() {
		_classCallCheck(this, FormFieldSet);

		return _possibleConstructorReturn(this, (FormFieldSet.__proto__ || Object.getPrototypeOf(FormFieldSet)).apply(this, arguments));
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


			var newProps = (0, _objectUtils.omit)(this.props, ['className', 'styleId', 'readOnly', 'disabled', 'hidden', 'focused', 'errored', 'raised']);

			var classNames = (0, _classNamesBind2.default)(_formfieldset2.default, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'raised', raised), _cx));

			var styleMappings = _styleMapping2.default[styleId];
			var fieldStyle = _formfieldset2.default[styleMappings.fieldStyle];

			return _react2.default.createElement(
				_FormFieldSetBase2.default,
				_extends({}, newProps, { fieldSetStyle: classNames }),
				_react2.default.Children.map(this.props.children, function (childComponent, i) {
					if (childComponent.type.prototype === _index.Label.prototype) {
						return _react2.default.createElement(
							_FormFieldSetBase.FormFieldLabelBase,
							{
								mandatory: required,
								disabled: disabled,
								focused: focused,
								errored: errored,
								raised: raised,
								styleId: styleMappings.labelStyle
							},
							childComponent
						);
					} else if (childComponent.type.prototype == FormField.prototype) {
						return _react2.default.createElement(_FormFieldSetBase.FormFieldBase, _extends({}, childComponent.props, {
							required: required,
							disabled: disabled,
							readOnly: readOnly,
							focused: focused,
							errored: errored,
							raised: raised,
							fieldStyle: fieldStyle
						}));
					} else if (childComponent.type.prototype === _index.Message.prototype) {
						return _react2.default.createElement(
							_FormFieldSetBase.FormFieldMsgBase,
							{
								required: required,
								disabled: disabled,
								focused: focused,
								errored: errored,
								raised: raised,
								styleId: styleMappings.messageStyle
							},
							childComponent
						);
					}

					return null;
				})
			);
		}
	}]);

	return FormFieldSet;
}(_react.Component);

exports.default = FormFieldSet;


FormFieldSet.defaultProps = {
	styleId: 'default'
};

FormFieldSet.propTypes = {

	fieldSetErrorStyle: _propTypes2.default.string,

	fieldId: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.any,

	hideMessageOnValid: _propTypes2.default.bool,
	focusFieldOnError: _propTypes2.default.bool,

	infoMessage: _propTypes2.default.string,
	errMessage: _propTypes2.default.string,

	fireValidation: _propTypes2.default.bool,

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
		name: _propTypes2.default.oneOf(['Label', 'FormField', 'Message'])
	}), _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.oneOf(['Label', 'FormField', 'Message'])
	}))]),

	styleId: _propTypes2.default.string,

	disabled: _propTypes2.default.bool,
	focused: _propTypes2.default.bool,
	required: _propTypes2.default.bool,
	readOnly: _propTypes2.default.bool,
	errored: _propTypes2.default.bool,
	valid: _propTypes2.default.bool,
	hidden: _propTypes2.default.bool,
	raised: _propTypes2.default.bool
};

if (__DOCS__) {
	FormFieldSet.docs = {
		componentGroup: 'Atom'
	};
}