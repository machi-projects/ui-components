'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputBase = require('../core/InputBase');

var _InputBase2 = _interopRequireDefault(_InputBase);

var _validator = require('../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectUtils = require('../../utils/objectUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputTextBoxBase = function (_React$Component) {
	_inherits(InputTextBoxBase, _React$Component);

	function InputTextBoxBase() {
		_classCallCheck(this, InputTextBoxBase);

		return _possibleConstructorReturn(this, (InputTextBoxBase.__proto__ || Object.getPrototypeOf(InputTextBoxBase)).apply(this, arguments));
	}

	_createClass(InputTextBoxBase, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			if ((0, _objectUtils.equals)(nextProps, this.props)) {
				return false;
			}
			return true;
		}
	}, {
		key: 'render',
		value: function render() {
			var defaultCheckPropsRules = ['required', 'min', 'minLength', 'range', 'rangeLength', 'max', 'maxLength', 'step', 'pattern'];
			var defaultValidateRules = ['required', 'min', 'minLength', 'range', 'rangeLength', 'max', 'maxLength', 'step', 'pattern', 'email', 'integer', 'digits', 'double', 'phone', 'url', 'hexcode', 'month', 'date', 'time', 'datetime'];

			var defaultType = 'text';

			var _props = this.props,
			    type = _props.type,
			    validation = _props.validation;


			var newType = type || defaultType;
			var newValidation = _validator2.default.combinePropsValidation(this.props, newType, 'onBlur', validation, defaultCheckPropsRules, defaultValidateRules);

			return _react2.default.createElement(_InputBase2.default, _extends({}, this.props, { type: newType, validation: newValidation }));
		}
	}]);

	return InputTextBoxBase;
}(_react2.default.Component);

exports.default = InputTextBoxBase;


InputTextBoxBase.defaultProps = {
	type: 'text'
};

InputTextBoxBase.propTypes = {
	id: _propTypes2.default.string,
	type: _propTypes2.default.oneOf(['number', 'email', 'text', 'range', 'color', 'file', 'search', 'tel', 'url', 'month', 'week', 'date', 'time', 'datetime-local', 'hidden']).isRequired,
	name: _propTypes2.default.string,
	className: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	readOnly: _propTypes2.default.bool,
	maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	step: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	list: _propTypes2.default.string,
	size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	autoFocus: _propTypes2.default.bool,

	autoComplete: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	required: _propTypes2.default.bool,
	pattern: _propTypes2.default.string,
	value: _propTypes2.default.string,

	onFocus: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	onKeyDown: _propTypes2.default.func,
	onKeyUp: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onInput: _propTypes2.default.func,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func
};