'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputText = require('../InputText');

var _InputText2 = _interopRequireDefault(_InputText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputText__Default = function (_Component) {
	_inherits(InputText__Default, _Component);

	function InputText__Default() {
		_classCallCheck(this, InputText__Default);

		return _possibleConstructorReturn(this, (InputText__Default.__proto__ || Object.getPrototypeOf(InputText__Default)).apply(this, arguments));
	}

	_createClass(InputText__Default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'b',
					null,
					' Input + custom styles '
				),
				_react2.default.createElement(_InputText2.default, { type: 'email' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(_InputText2.default, { type: 'url' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(_InputText2.default, { type: 'text', focused: true }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(_InputText2.default, {
					type: 'number',
					raised: true,
					required: true,
					validation: {
						validate: false,
						validateOn: 'onChange',
						rules: {
							digits: true,
							custom1: function custom1(val) {
								return parseInt(val) < 10;
							},
							custom2: function custom2(val) {
								return parseInt(val) < 100;
							}
						},
						rulesOrder: ['required', 'digits', 'custom1', 'custom2'],
						messages: {
							required: "shouldn't  be blank",
							digits: "shouldn't  be blank ",
							custom1: 'failed custom1',
							custom2: function custom2(text, el) {
								return 'failed custom2' + text;
							}
						}
					},
					onFailValidation: function onFailValidation(rule, message, inputTag) {},
					onPassValidation: function onPassValidation(text, inputTag) {}
				}),
				_react2.default.createElement(_InputText2.default, { type: 'range' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(_InputText2.default, { type: 'color' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement(_InputText2.default, { type: 'date', autoFocus: true })
			);
		}
	}]);

	return InputText__Default;
}(_react.Component);

exports.default = InputText__Default;


if (__DOCS__) {
	InputText__Default.docs = {
		componentGroup: _InputText2.default.docs.componentGroup
	};
}