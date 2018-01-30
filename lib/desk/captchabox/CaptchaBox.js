'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

var _captchabox = require('./captchabox.css');

var _captchabox2 = _interopRequireDefault(_captchabox);

var _inputtext = require('../input/inputtext/inputtext.css');

var _inputtext2 = _interopRequireDefault(_inputtext);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

var _classNamesBind = require('../../utils/classNamesUtils/classNamesBind');

var _classNamesBind2 = _interopRequireDefault(_classNamesBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CaptchaBox = function (_Component) {
	_inherits(CaptchaBox, _Component);

	function CaptchaBox() {
		_classCallCheck(this, CaptchaBox);

		return _possibleConstructorReturn(this, (CaptchaBox.__proto__ || Object.getPrototypeOf(CaptchaBox)).apply(this, arguments));
	}

	_createClass(CaptchaBox, [{
		key: 'render',
		value: function render() {
			var _cx;

			var _props = this.props,
			    styleId = _props.styleId,
			    disabled = _props.disabled,
			    focused = _props.focused,
			    errored = _props.errored,
			    valid = _props.valid,
			    raised = _props.raised;


			var classNames = (0, _classNamesBind2.default)(_captchabox2.default, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

			var styleMappings = _styleMapping2.default[styleId];
			var textboxViewStyle = _captchabox2.default[styleMappings.textboxViewStyle];
			var captchaInnerViewStyle = _captchabox2.default[styleMappings.captchaInnerView];
			var captchaImgStyle = _captchabox2.default[styleMappings.captchaImgStyle];
			var refreshStyle = _captchabox2.default[styleMappings.refreshStyle];

			var inputStyleId = styleMappings.inputStyleId;

			var _props2 = this.props,
			    value = _props2.value,
			    maxLength = _props2.maxLength,
			    placeholder = _props2.placeholder,
			    getValue = _props2.getValue,
			    captchaUrl = _props2.captchaUrl,
			    onRefresh = _props2.onRefresh,
			    getElementRef = _props2.getElementRef,
			    onChange = _props2.onChange,
			    validation = _props2.validation,
			    onFailValidation = _props2.onFailValidation,
			    onPassValidation = _props2.onPassValidation;


			return _react2.default.createElement(
				'div',
				{ className: classNames },
				_react2.default.createElement('div', { className: textboxViewStyle }),
				_react2.default.createElement(
					'div',
					{ className: captchaInnerViewStyle },
					_react2.default.createElement('img', { className: _captchabox2.default.captchaImgStyle, src: captchaUrl }),
					_react2.default.createElement(
						'span',
						{ className: refreshStyle, onClick: onRefresh },
						_react2.default.createElement(_index.Icon, { id: 'refresh', color: 'dustyGray', styleId: 'refresh_icon' })
					),
					_react2.default.createElement(_index.InputText, { type: 'text',
						styleId: inputStyleId,
						placeholder: placeholder,
						maxLength: maxLength,
						value: value,
						onChange: onChange,
						getElementRef: getElementRef,
						getValue: getValue,
						validation: validation,
						onFailValidation: onFailValidation,
						onPassValidation: onPassValidation
					})
				)
			);
		}
	}]);

	return CaptchaBox;
}(_react.Component);

exports.default = CaptchaBox;


CaptchaBox.defaultProps = {
	styleId: "default"
};

CaptchaBox.propTypes = {

	styleId: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	maxLength: _propTypes2.default.string,
	value: _propTypes2.default.string,
	getValue: _propTypes2.default.func,
	getElementRef: _propTypes2.default.func,

	onChange: _propTypes2.default.func,
	onRefresh: _propTypes2.default.func,
	captchaUrl: _propTypes2.default.string.isRequired,

	onFailValidation: _propTypes2.default.func,
	onPassValidation: _propTypes2.default.func,

	disabled: _propTypes2.default.bool,
	focused: _propTypes2.default.bool,
	errored: _propTypes2.default.bool,
	valid: _propTypes2.default.bool,
	raised: _propTypes2.default.bool,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rules: _propTypes2.default.object,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		messages: _propTypes2.default.object
	})

};

if (__DOCS__) {
	CaptchaBox.docs = {
		componentGroup: 'Atom'
	};
}