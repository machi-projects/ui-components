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

var MultiLineInputBase = function (_React$Component) {
	_inherits(MultiLineInputBase, _React$Component);

	function MultiLineInputBase(props) {
		_classCallCheck(this, MultiLineInputBase);

		var _this = _possibleConstructorReturn(this, (MultiLineInputBase.__proto__ || Object.getPrototypeOf(MultiLineInputBase)).call(this, props));

		_this.state = { text: _this.props.value };
		_this.onChangeText = _this.onChangeText.bind(_this);
		_this.validateInputBox = _this.validateInputBox.bind(_this);
		_this.setTextValue = _this.setTextValue.bind(_this);

		_this.setRef = _this.setRef.bind(_this);
		return _this;
	}

	_createClass(MultiLineInputBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if ((0, _objectUtils.equals)(nextProps, this.props) && nextState.text && this.state.text && nextState.text == this.state.text) {
				return false;
			}

			return true;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.value != this.props.value) {
				this.setTextValue(nextProps.value);
			}

			if (nextProps.validation != null && nextProps.validation.validate) {
				var textareaTag = this.elementRef;
				this.validateInputBox(null, textareaTag, null, (0, _objectUtils.extract)(nextProps, ["validation", "onPassValidation", "onFailValidation"]));
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var _this2 = this;

			if (this.props.fireEvent !== prevProps.fireEvent && this.props.fireEvent) {
				requestAnimationFrame(function () {
					_this2.elementRef && _this2.elementRef[_this2.props.fireEvent] && _this2.elementRef[_this2.props.fireEvent]();
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			var textareaTag = this.elementRef;
			if (this.props.validation != null && this.props.validation.validate) {
				this.validateInputBox(null, textareaTag, null, (0, _objectUtils.extract)(this.props, ["validation", "onPassValidation", "onFailValidation"]));
			}

			if (this.props.fireEvent != null) {
				requestAnimationFrame(function () {
					textareaTag && textareaTag[_this3.props.fireEvent] && textareaTag[_this3.props.fireEvent]();
				});
			}

			requestAnimationFrame(function () {
				if (_this3.props.autoExpandX || _this3.props.autoExpandY) {
					_this3.setState({
						minHeight: textareaTag.clientHeight,
						minWidth: textareaTag.clientWidth,
						xAutoExpand: textareaTag.clientWidth == textareaTag.scrollWidth,
						yAutoExpand: textareaTag.clientHeight == textareaTag.scrollHeight
					});
				}
			});
		}
	}, {
		key: 'setTextValue',
		value: function setTextValue(text) {
			this.setState({ text: text });
		}
	}, {
		key: 'onChangeText',
		value: function onChangeText(ev, callback) {

			if (callback) {
				callback(ev);
			}

			this.setTextValue(ev.target.value);

			if (this.props.autoExpandX || this.props.autoExpandY) {
				this.autoExpand(ev.target);
			}
		}
	}, {
		key: 'autoExpand',
		value: function autoExpand(el) {
			var _this4 = this;

			if (this.props.autoExpandY && this.state.yAutoExpand) {
				requestAnimationFrame(function () {

					if (_this4.state.minHeight < el.scrollHeight) {
						el.style.height = "auto";
						el.style.height = el.scrollHeight + 'px';
					}
				});
			}

			if (this.props.autoExpandX && this.state.xAutoExpand) {
				requestAnimationFrame(function () {
					if (_this4.state.minWidth < el.scrollWidth) {
						el.style.scrollWidth = "auto";
						el.style.width = el.scrollWidth + 'px';
					}
				});
			}
		}
	}, {
		key: 'validateInputBox',
		value: function validateInputBox(ev, targetTag, callback, validationProps) {

			if (callback) {
				callback(ev);
			}

			if (validationProps != null) {
				var defaultType = "textarea";
				_validator2.default.executeValidation(targetTag.value, targetTag, validationProps, defaultType);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var validationObj = (0, _objectUtils.extract)(this.props, ["validation", "onPassValidation", "onFailValidation"]);

			var _ref = validationObj || {},
			    validation = _ref.validation;

			var newProps = (0, _objectUtils.omit)(this.props, ["fireEvent", "autoExpandX", "autoExpandY", "validation", "onPassValidation", "onFailValidation"]);

			var onChangeEventFunc = newProps.onChange;
			newProps.onChange = function (ev) {
				_this5.onChangeText(ev, onChangeEventFunc);
			};

			if (validation.validateOn) {

				var tempFunc = newProps[validation.validateOn];
				newProps[validation.validateOn] = function (ev) {
					_this5.validateInputBox(ev, ev.target, tempFunc, validationObj);
				};
			}

			return _react2.default.createElement('textArea', _extends({}, newProps, { ref: this.setRef, value: this.state.text }));
		}
	}]);

	return MultiLineInputBase;
}(_react2.default.Component);

exports.default = MultiLineInputBase;


MultiLineInputBase.propTypes = {

	id: _propTypes2.default.string,
	name: _propTypes2.default.string,
	className: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	readOnly: _propTypes2.default.bool,
	maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	rows: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	cols: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	fireEvent: _propTypes2.default.string,
	tabIndex: _propTypes2.default.string,
	autoExpandY: _propTypes2.default.bool,
	autoExpandX: _propTypes2.default.bool,

	autoFocus: _propTypes2.default.bool,
	disabled: _propTypes2.default.bool,
	required: _propTypes2.default.bool,
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