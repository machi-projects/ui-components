import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import { omit, extract, equals } from '../../utils/objectUtils';

var MultiLineInputBase = function (_React$Component) {
	_inherits(MultiLineInputBase, _React$Component);

	function MultiLineInputBase(props) {
		_classCallCheck(this, MultiLineInputBase);

		var _this = _possibleConstructorReturn(this, (MultiLineInputBase.__proto__ || _Object$getPrototypeOf(MultiLineInputBase)).call(this, props));

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
			if (equals(nextProps, this.props) && nextState.text && this.state.text && nextState.text == this.state.text) {
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
				this.validateInputBox(null, textareaTag, null, extract(nextProps, ["validation", "onPassValidation", "onFailValidation"]));
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
				this.validateInputBox(null, textareaTag, null, extract(this.props, ["validation", "onPassValidation", "onFailValidation"]));
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
				validator.executeValidation(targetTag.value, targetTag, validationProps, defaultType);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var validationObj = extract(this.props, ["validation", "onPassValidation", "onFailValidation"]);

			var _ref = validationObj || {},
			    validation = _ref.validation;

			var newProps = omit(this.props, ["fireEvent", "autoExpandX", "autoExpandY", "validation", "onPassValidation", "onFailValidation"]);

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

			return React.createElement('textArea', _extends({}, newProps, { ref: this.setRef, value: this.state.text }));
		}
	}]);

	return MultiLineInputBase;
}(React.Component);

export default MultiLineInputBase;


MultiLineInputBase.propTypes = {

	id: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	fireEvent: PropTypes.string,
	tabIndex: PropTypes.string,
	autoExpandY: PropTypes.bool,
	autoExpandX: PropTypes.bool,

	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	value: PropTypes.string,

	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),
	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func

};