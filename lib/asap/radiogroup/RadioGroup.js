'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RadioItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RadioBoxGroupBase = require('../../js/form/RadioBoxGroupBase');

var _RadioBoxGroupBase2 = _interopRequireDefault(_RadioBoxGroupBase);

var _inputbutton = require('../input/inputbutton/inputbutton.css');

var _inputbutton2 = _interopRequireDefault(_inputbutton);

var _label = require('../label/label.css');

var _label2 = _interopRequireDefault(_label);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

var _objectUtils = require('../../utils/objectUtils');

var _classNamesBind = require('../../utils/classNamesUtils/classNamesBind');

var _classNamesBind2 = _interopRequireDefault(_classNamesBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioItem = exports.RadioItem = function (_Component) {
	_inherits(RadioItem, _Component);

	function RadioItem() {
		_classCallCheck(this, RadioItem);

		return _possibleConstructorReturn(this, (RadioItem.__proto__ || Object.getPrototypeOf(RadioItem)).apply(this, arguments));
	}

	_createClass(RadioItem, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return RadioItem;
}(_react.Component);

RadioItem.propTypes = {
	value: _propTypes2.default.string.isRequired,
	tabIndex: _propTypes2.default.string
};

var RadioGroup = function (_Component2) {
	_inherits(RadioGroup, _Component2);

	function RadioGroup() {
		_classCallCheck(this, RadioGroup);

		return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
	}

	_createClass(RadioGroup, [{
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
			    valid = _props.valid,
			    raised = _props.raised;


			var newProps = (0, _objectUtils.omit)(this.props, ['className', 'styleId', 'readOnly', 'disabled', 'hidden', 'focused', 'errored', 'valid', 'raised']);

			var classNames = (0, _classNamesBind2.default)(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

			//let onPassValidation = validation.validate ?  errored =  true
			var styleMappings = _styleMapping2.default[styleId];

			var itemStyle = styles[styleMappings.itemStyle];
			var itemActiveStyle = styles[styleMappings.activeStyle];

			var inputStyle = _inputbutton2.default[styleMappings.inputStyle];
			var labelStyle = _label2.default[styleMappings.labelStyle];

			return _react2.default.createElement(
				_RadioBoxGroupBase2.default,
				_extends({}, newProps, { styles: { group: classNames, item: itemStyle, active: itemActiveStyle } }),
				_react2.default.Children.map(this.props.children, function (child, i) {
					return _react2.default.createElement(_RadioBoxGroupBase.RadioBoxItemBase, _extends({}, child.props, { key: i, styles: { inputStyle: inputStyle, labelStyle: labelStyle } }));
				})
			);
		}
	}]);

	return RadioGroup;
}(_react.Component);

exports.default = RadioGroup;


RadioGroup.defaultProps = {
	styleId: 'default'
};

RadioGroup.propTypes = {
	styleId: _propTypes2.default.string,
	required: _propTypes2.default.bool,

	groupName: _propTypes2.default.string,
	selectedItem: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func,

	tabIndex: _propTypes2.default.string,
	getElementRef: _propTypes2.default.func,
	getValue: _propTypes2.default.func,
	onClick: _propTypes2.default.func,

	focused: _propTypes2.default.bool,
	errored: _propTypes2.default.bool,
	valid: _propTypes2.default.bool,
	raised: _propTypes2.default.bool,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['RadioItem']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['RadioItem']) }))])
};

if (__DOCS__) {
	RadioGroup.docs = {
		componentGroup: 'Atom'
	};
}