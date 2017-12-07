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

var _index2 = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormFieldSet__Default = function (_Component) {
	_inherits(FormFieldSet__Default, _Component);

	function FormFieldSet__Default() {
		_classCallCheck(this, FormFieldSet__Default);

		return _possibleConstructorReturn(this, (FormFieldSet__Default.__proto__ || Object.getPrototypeOf(FormFieldSet__Default)).apply(this, arguments));
	}

	_createClass(FormFieldSet__Default, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_index.FormFieldSet,
					{
						fieldId: 'Fruits',
						value: ['B', 'C'],
						focusFieldOnError: true,
						validation: {
							rules: {
								required: true
							},
							rulesOrder: ['required'],
							messages: {
								required: 'Select At least one tag...'
							}
						},
						onPassValidation: function onPassValidation(a, b) {}
					},
					_react2.default.createElement(
						_index2.Label,
						null,
						' Choose your Fav '
					),
					_react2.default.createElement(
						_index.FormField,
						null,
						_react2.default.createElement(
							_index2.CheckBoxGroup,
							{ selectedItems: ['B', 'C'] },
							_react2.default.createElement(
								_index2.CheckBoxItem,
								{ value: 'A' },
								' Apple '
							),
							_react2.default.createElement(
								_index2.CheckBoxItem,
								{ value: 'B' },
								' Banana '
							),
							_react2.default.createElement(
								_index2.CheckBoxItem,
								{ value: 'C' },
								' Cadddde '
							)
						)
					),
					_react2.default.createElement(
						_index2.Message,
						null,
						' choose the fruits you like.... '
					)
				),
				_react2.default.createElement('hr', null),
				_react2.default.createElement('hr', null),
				_react2.default.createElement(
					_index.FormFieldSet,
					{
						fieldId: 'Text-X',
						value: null,
						validation: {
							rules: {
								maxLength: '10'
							},
							validateOn: 'onChange',
							rulesOrder: ['maxLength'],
							messages: {
								maxLength: function maxLength(a, b) {
									return 'Exceeds characters --> ' + a.length + '/100';
								}
							}
						},
						onPassValidation: function onPassValidation(a, b) {}
					},
					_react2.default.createElement(
						_index2.Label,
						null,
						' Text messages ( allowed 10 characters ) '
					),
					_react2.default.createElement(
						_index.FormField,
						null,
						_react2.default.createElement(_index2.MultiLineInput, null)
					),
					_react2.default.createElement(
						_index2.Message,
						null,
						' type text :-) '
					)
				),
				_react2.default.createElement('hr', null),
				_react2.default.createElement('hr', null),
				_react2.default.createElement(
					_index.FormFieldSet,
					{
						fieldId: 'Pick-One-Box',
						value: ['B', 'C'],
						validation: {
							validate: true,
							messages: {
								required: 'select at least from item'
							}
						}
					},
					_react2.default.createElement(
						_index2.Label,
						null,
						' PickOneGroup ( required )'
					),
					_react2.default.createElement(
						_index.FormField,
						null,
						_react2.default.createElement(
							_index2.PickOneGroup,
							{ styleId: 'mypick', required: true },
							_react2.default.createElement(
								_index2.PickOneItem,
								{ pickId: 'red' },
								' red '
							),
							_react2.default.createElement(
								_index2.PickOneItem,
								{ pickId: 'green' },
								' green '
							),
							_react2.default.createElement(
								_index2.PickOneItem,
								{ pickId: 'yellow' },
								' yellow '
							)
						)
					),
					_react2.default.createElement(
						_index2.Message,
						null,
						' Pick one info ...msg '
					)
				)
			);
		}
	}]);

	return FormFieldSet__Default;
}(_react.Component);

exports.default = FormFieldSet__Default;


if (__DOCS__) {
	FormFieldSet__Default.docs = {
		componentGroup: _index.FormFieldSet.docs.componentGroup
	};
}