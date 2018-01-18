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

var _ButtonBase = require('../../js/ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _button = require('./button.css');

var _button2 = _interopRequireDefault(_button);

var _objectUtils = require('../../utils/objectUtils');

var _classNamesBind = require('../../utils/classNamesUtils/classNamesBind');

var _classNamesBind2 = _interopRequireDefault(_classNamesBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
	_inherits(Button, _React$Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    disabled = _props.disabled,
			    focused = _props.focused,
			    mandatory = _props.mandatory,
			    primary = _props.primary,
			    success = _props.success,
			    info = _props.info,
			    warning = _props.warning,
			    danger = _props.danger,
			    hovered = _props.hovered,
			    errored = _props.errored,
			    hidden = _props.hidden,
			    raised = _props.raised;


			var newProps = (0, _objectUtils.omit)(this.props, ["className", "styleId", "disabled", "focused", "mandatory", "primary", "success", "info", "warning", "danger", "hovered", "errored", "raised"]);

			var classNames = (0, _classNamesBind2.default)(_button2.default, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'mandatory', mandatory), _defineProperty(_cx, 'primary', primary), _defineProperty(_cx, 'success', success), _defineProperty(_cx, 'info', info), _defineProperty(_cx, 'warning', warning), _defineProperty(_cx, 'danger', danger), _defineProperty(_cx, 'hovered', hovered), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'raised', raised), _cx));

			return _react2.default.createElement(_ButtonBase2.default, _extends({}, newProps, { className: classNames }));
		}
	}]);

	return Button;
}(_react2.default.Component);

exports.default = Button;


Button.defaultProps = {
	styleId: "default"

	/*
 		Button.stateStyles = [ "disabled", "enabled" , "focused" , "mandatory" , "primary" , "success" , "info",
 	"warning", "danger", "hovered" , "errored" , "hidden", , "errored", "raised" ]
 	*/

};Button.propTypes = {

	id: _propTypes2.default.string,
	htmlFor: _propTypes2.default.string,
	styleId: _propTypes2.default.string,

	disabled: _propTypes2.default.bool,
	focused: _propTypes2.default.bool,

	mandatory: _propTypes2.default.bool,
	primary: _propTypes2.default.bool,
	success: _propTypes2.default.bool,
	info: _propTypes2.default.bool,
	warning: _propTypes2.default.bool,
	danger: _propTypes2.default.bool,

	hovered: _propTypes2.default.bool,
	errored: _propTypes2.default.bool,
	hidden: _propTypes2.default.bool,
	raised: _propTypes2.default.bool

};

if (__DOCS__) {
	Button.docs = {
		componentGroup: "Atom"
	};
}