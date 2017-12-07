import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import validator from '../../../utils/validator';
import PropTypes from 'prop-types';
import { omit, extract, equals } from '../../../utils/objectUtils';

var MultiLineInputBase = function (_React$Component) {
	_inherits(MultiLineInputBase, _React$Component);

	function MultiLineInputBase(props) {
		_classCallCheck(this, MultiLineInputBase);

		var _this = _possibleConstructorReturn(this, (MultiLineInputBase.__proto__ || _Object$getPrototypeOf(MultiLineInputBase)).call(this, props));

		_this.state = { text: _this.props.value };
		_this.onChangeText = _this.onChangeText.bind(_this);
		_this.validateInputBox = _this.validateInputBox.bind(_this);
		_this.setTextValue = _this.setTextValue.bind(_this);
		return _this;
	}

	_createClass(MultiLineInputBase, [{
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

			if (nextProps.validation != null && nextProps.validation.validate && this.props.validation && this.props.validation.validate) {
				var textareaTag = ReactDOM.findDOMNode(this);
				this.validateInputBox(null, textareaTag, null, extract(nextProps, ["validation", "onPassValidation", "onFailValidation"]));
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			if (this.props.validation != null && this.props.validation.validate) {
				var textareaTag = ReactDOM.findDOMNode(this);
				this.validateInputBox(null, textareaTag, null, extract(this.props, ["validation", "onPassValidation", "onFailValidation"]));
			}
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
		}
	}, {
		key: 'validateInputBox',
		value: function validateInputBox(ev, targetTag, callback, validationProps) {

			if (callback) {
				callback(ev);
			}

			if (validationProps != null) {
				validator.executeValidation(targetTag.value, targetTag, validationProps);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var validationObj = extract(this.props, ["validation", "onPassValidation", "onFailValidation"]);

			var _ref = validationObj || {},
			    validation = _ref.validation;

			var newProps = omit(this.props, ["validation", "onPassValidation", "onFailValidation"]);

			var onChangeEventFunc = newProps.onChange;
			newProps.onChange = function (ev) {
				_this2.onChangeText(ev, onChangeEventFunc);
			};

			if (validation.validateOn) {

				var tempFunc = newProps[validation.validateOn];
				newProps[validation.validateOn] = function (ev) {
					_this2.validateInputBox(ev, ev.target, tempFunc, validationObj);
				};
			}

			return React.createElement('textArea', _extends({}, newProps, { value: this.state.text }));
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