'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormFieldsGroupBase = require('../../js/form/FormFieldsGroupBase');

var _FormFieldsGroupBase2 = _interopRequireDefault(_FormFieldsGroupBase);

var _formfieldsgroup = require('./formfieldsgroup.css');

var _formfieldsgroup2 = _interopRequireDefault(_formfieldsgroup);

var _objectUtils = require('../../utils/objectUtils');

var _classNamesBind = require('../../utils/classNamesUtils/classNamesBind');

var _classNamesBind2 = _interopRequireDefault(_classNamesBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormFieldsGroup = function (_Component) {
	_inherits(FormFieldsGroup, _Component);

	function FormFieldsGroup() {
		_classCallCheck(this, FormFieldsGroup);

		return _possibleConstructorReturn(this, (FormFieldsGroup.__proto__ || Object.getPrototypeOf(FormFieldsGroup)).apply(this, arguments));
	}

	_createClass(FormFieldsGroup, [{
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

			var classNames = (0, _classNamesBind2.default)(_formfieldsgroup2.default, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'raised', raised), _cx));

			return _react2.default.createElement(_FormFieldsGroupBase2.default, _extends({}, newProps, { formFieldsGroupStyle: classNames }));
		}
	}]);

	return FormFieldsGroup;
}(_react.Component);

exports.default = FormFieldsGroup;


FormFieldsGroup.defaultProps = {
	styleId: 'default'
};

FormFieldsGroup.propTypes = {
	formFieldsGroupStyle: _propTypes2.default.string,

	validate: _propTypes2.default.bool,
	onFailValidation: _propTypes2.default.func,
	onPassValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['FormFieldSet']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['FormFieldSet']) }))]),

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
	FormFieldsGroup.docs = {
		componentGroup: 'Atom'
	};
}