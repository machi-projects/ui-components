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

var _MultiLineInputBoxBase = require('../../js/form/MultiLineInputBoxBase');

var _MultiLineInputBoxBase2 = _interopRequireDefault(_MultiLineInputBoxBase);

var _multilineinput = require('./multilineinput.css');

var _multilineinput2 = _interopRequireDefault(_multilineinput);

var _objectUtils = require('../../utils/objectUtils');

var _classNamesBind = require('../../utils/classNamesUtils/classNamesBind');

var _classNamesBind2 = _interopRequireDefault(_classNamesBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiLineInput = function (_Component) {
	_inherits(MultiLineInput, _Component);

	function MultiLineInput() {
		_classCallCheck(this, MultiLineInput);

		return _possibleConstructorReturn(this, (MultiLineInput.__proto__ || Object.getPrototypeOf(MultiLineInput)).apply(this, arguments));
	}

	_createClass(MultiLineInput, [{
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
			    raised = _props.raised,
			    autoExpandX = _props.autoExpandX,
			    autoExpandY = _props.autoExpandY;


			var newProps = (0, _objectUtils.omit)(this.props, ['className', 'styleId', 'focused', 'errored', 'valid', 'raised']);

			var classNames = (0, _classNamesBind2.default)(_multilineinput2.default, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _defineProperty(_cx, 'autoExpandX', autoExpandX), _defineProperty(_cx, 'autoExpandY', autoExpandY), _cx));

			//let onPassValidation = validation.validate ?  errored =  true

			return _react2.default.createElement(_MultiLineInputBoxBase2.default, _extends({}, newProps, { className: classNames }));
		}
	}]);

	return MultiLineInput;
}(_react.Component);

exports.default = MultiLineInput;

MultiLineInput.defaultProps = {
	styleId: 'default'
};

MultiLineInput.propTypes = {
	styleId: _propTypes2.default.string,

	id: _propTypes2.default.string,
	name: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	readOnly: _propTypes2.default.bool,
	maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	rows: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	cols: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	autoExpandY: _propTypes2.default.bool,
	autoExpandX: _propTypes2.default.bool,

	autoFocus: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	hidden: _propTypes2.default.bool,
	required: _propTypes2.default.bool,
	value: _propTypes2.default.string,

	getElementRef: _propTypes2.default.func,
	onKeyDown: _propTypes2.default.func,
	onKeyUp: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onInput: _propTypes2.default.func,
	getValue: _propTypes2.default.func,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rules: _propTypes2.default.object,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		messages: _propTypes2.default.object
	}),

	onFailValidation: _propTypes2.default.func,
	onPassValidation: _propTypes2.default.func,

	focused: _propTypes2.default.bool,
	errored: _propTypes2.default.bool,
	valid: _propTypes2.default.bool,
	raised: _propTypes2.default.bool
};

if (__DOCS__) {
	MultiLineInput.docs = {
		componentGroup: 'Atom'
	};
}