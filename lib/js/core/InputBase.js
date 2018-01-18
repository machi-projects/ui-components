'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validator = require('../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectUtils = require('../../utils/objectUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputBase = function (_React$Component) {
	_inherits(InputBase, _React$Component);

	function InputBase(props) {
		_classCallCheck(this, InputBase);

		var _this = _possibleConstructorReturn(this, (InputBase.__proto__ || Object.getPrototypeOf(InputBase)).call(this, props));

		_this.state = { text: _this.props.value || '' };
		_this.onChangeValue = _this.onChangeValue.bind(_this);
		_this.validateInputBox = _this.validateInputBox.bind(_this);
		_this.setTextValue = _this.setTextValue.bind(_this);
		_this.setRef = _this.setRef.bind(_this);
		return _this;
	}

	_createClass(InputBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
			this.props.getElementRef && this.props.getElementRef(el);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return (0, _objectUtils.deepEqualObject)(nextProps, this.props) == false || (0, _objectUtils.deepEqualObject)(nextState, this.state) == false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.value != this.state.text) {
				this.setTextValue(nextProps.value || '');
			}

			if ((0, _objectUtils.deepEqualObject)(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
				var inputTag = this.elementRef;
				this.validateInputBox(null, inputTag, null, (0, _objectUtils.extract)(nextProps, ['validation', 'onPassValidation', 'onFailValidation']));
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var inputTag = this.elementRef;
			if (this.props.validation != null && this.props.validation.validate) {

				this.validateInputBox(null, inputTag, null, (0, _objectUtils.extract)(this.props, ['validation', 'onPassValidation', 'onFailValidation']));
			}
		}
	}, {
		key: 'setTextValue',
		value: function setTextValue(text) {
			var _this2 = this;

			this.setState({ text: text }, function () {
				_this2.props.getValue && _this2.props.getValue(_this2.state.text);
			});
		}
	}, {
		key: 'onChangeValue',
		value: function onChangeValue(ev, callback) {
			if (callback) {
				callback(ev);
			}

			if (ev.target.type !== 'checkbox' || ev.target.type !== 'radio') {
				this.setTextValue(ev.target.value);
			}
		}
	}, {
		key: 'validateInputBox',
		value: function validateInputBox(ev, targetTag, callback, validationProps) {
			if (callback) {
				callback(ev);
			}

			if (validationProps != null) {
				_validator2.default.executeValidation(targetTag.value, targetTag, validationProps, this.props.type);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var removeTabIndex = this.props.tabIndex < 0 ? 'tabIndex' : '';
			var validationObj = (0, _objectUtils.extract)(this.props, ['validation', 'onPassValidation', 'onFailValidation']);

			var _ref = validationObj || {},
			    validation = _ref.validation;

			var newProps = (0, _objectUtils.omit)(this.props, [removeTabIndex, 'getValue', 'getElementRef', 'validation', 'onPassValidation', 'onFailValidation']);

			var onChangeEventFunc = newProps.onChange;
			newProps.onChange = function (ev) {
				_this3.onChangeValue(ev, onChangeEventFunc);
			};

			if (validation.validateOn) {
				var tempFunc = newProps[validation.validateOn];
				newProps[validation.validateOn] = function (ev) {
					_this3.validateInputBox(ev, ev.target, tempFunc, validationObj);
				};
			}

			return _react2.default.createElement('input', _extends({}, newProps, { ref: this.setRef, value: this.state.text }));
		}
	}]);

	return InputBase;
}(_react2.default.Component);

exports.default = InputBase;


InputBase.propTypes = {
	id: _propTypes2.default.string,
	type: _propTypes2.default.string.isRequired,
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
	defaultChecked: _propTypes2.default.bool,
	checked: _propTypes2.default.bool,
	autoComplete: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	required: _propTypes2.default.bool,
	pattern: _propTypes2.default.string,
	value: _propTypes2.default.string,

	getElementRef: _propTypes2.default.func,
	tabIndex: _propTypes2.default.string,
	onFocus: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	onKeyDown: _propTypes2.default.func,
	onKeyUp: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onInput: _propTypes2.default.func,
	getValue: _propTypes2.default.func,

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