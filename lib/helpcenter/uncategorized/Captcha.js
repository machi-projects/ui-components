'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fzI18n = require('fz-i18n');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Form = require('./Form');

var _Captcha = require('./css/Captcha.css');

var _Captcha2 = _interopRequireDefault(_Captcha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Captcha = function (_Component) {
	_inherits(Captcha, _Component);

	function Captcha(props) {
		_classCallCheck(this, Captcha);

		return _possibleConstructorReturn(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).call(this, props));
	}

	_createClass(Captcha, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    maxLength = _props.maxLength,
			    onBlur = _props.onBlur,
			    onChange = _props.onChange,
			    value = _props.value,
			    id = _props.id,
			    captchaUrl = _props.captchaUrl,
			    onKeyDown = _props.onKeyDown,
			    errorMsg = _props.errorMsg,
			    isValid = _props.isValid,
			    onRefresh = _props.onRefresh;

			return _react2.default.createElement(
				'div',
				{ className: _Captcha2.default.captcha },
				_react2.default.createElement(_Input2.default, { maxLength: maxLength, onBlur: onBlur, onKeyDown: onKeyDown, onChange: onChange, id: id, value: value }),
				isValid ? '' : _react2.default.createElement(_Form.ErrorMsg, { errMsg: errorMsg }),
				_react2.default.createElement(
					'div',
					{ className: _Captcha2.default.captchImg },
					_react2.default.createElement('img', { src: captchaUrl }),
					_react2.default.createElement(
						'span',
						{ className: _Captcha2.default.refresh, onMouseDown: onRefresh },
						'Refresh'
					),
					_react2.default.createElement('div', { className: _Captcha2.default.clboth })
				)
			);
		}
	}]);

	return Captcha;
}(_react.Component);

exports.default = Captcha;


Captcha.propTypes = {
	maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	value: _propTypes2.default.string,
	id: _propTypes2.default.string,
	captchaUrl: _propTypes2.default.string.isRequired,
	errorMsg: _propTypes2.default.string,
	isValid: _propTypes2.default.bool.isRequired,
	onKeyDown: _propTypes2.default.func,
	onRefresh: _propTypes2.default.func.isRequired,
	onBlur: _propTypes2.default.func,
	onChange: _propTypes2.default.func.isRequired
};