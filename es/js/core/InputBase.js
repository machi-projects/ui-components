import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import { omit, extract, deepEqualObject } from '../../utils/objectUtils';

var InputBase = function (_React$Component) {
	_inherits(InputBase, _React$Component);

	function InputBase(props) {
		_classCallCheck(this, InputBase);

		var _this = _possibleConstructorReturn(this, (InputBase.__proto__ || _Object$getPrototypeOf(InputBase)).call(this, props));

		_this.state = { text: _this.props.value || '' };
		_this.onChangeValue = _this.onChangeValue.bind(_this);
		_this.validateInputBox = _this.validateInputBox.bind(_this);
		_this.setTextValue = _this.setTextValue.bind(_this);
		_this.setRef = _this.setRef.bind(_this);
		return _this;
	}

	_createClass(InputBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
			this.props.getElementRef && this.props.getElementRef(el);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return deepEqualObject(nextProps, this.props) == false || deepEqualObject(nextState, this.state) == false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (nextProps.value != this.state.text) {
				this.setTextValue(nextProps.value || '');
			}

			if (deepEqualObject(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
				var inputTag = this.elementRef;
				this.validateInputBox(null, inputTag, null, extract(nextProps, ['validation', 'onPassValidation', 'onFailValidation']));
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var inputTag = this.elementRef;
			if (this.props.validation != null && this.props.validation.validate) {

				this.validateInputBox(null, inputTag, null, extract(this.props, ['validation', 'onPassValidation', 'onFailValidation']));
			}
		}
	}, {
		key: 'setTextValue',
		value: function setTextValue(text) {
			var _this2 = this;

			this.setState({ text: text }, function () {
				_this2.props.getValue && _this2.props.getValue(_this2.state.text);
			});
		}
	}, {
		key: 'onChangeValue',
		value: function onChangeValue(ev, callback) {
			if (callback) {
				callback(ev);
			}

			if (ev.target.type !== 'checkbox' || ev.target.type !== 'radio') {
				this.setTextValue(ev.target.value);
			}
		}
	}, {
		key: 'validateInputBox',
		value: function validateInputBox(ev, targetTag, callback, validationProps) {
			if (callback) {
				callback(ev);
			}

			if (validationProps != null) {
				validator.executeValidation(targetTag.value, targetTag, validationProps, this.props.type);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var removeTabIndex = this.props.tabIndex < 0 ? 'tabIndex' : '';
			var validationObj = extract(this.props, ['validation', 'onPassValidation', 'onFailValidation']);

			var _ref = validationObj || {},
			    validation = _ref.validation;

			var newProps = omit(this.props, [removeTabIndex, 'getValue', 'getElementRef', 'validation', 'onPassValidation', 'onFailValidation']);

			var onChangeEventFunc = newProps.onChange;
			newProps.onChange = function (ev) {
				_this3.onChangeValue(ev, onChangeEventFunc);
			};

			if (validation.validateOn) {
				var tempFunc = newProps[validation.validateOn];
				newProps[validation.validateOn] = function (ev) {
					_this3.validateInputBox(ev, ev.target, tempFunc, validationObj);
				};
			}

			return React.createElement('input', _extends({}, newProps, { ref: this.setRef, value: this.state.text }));
		}
	}]);

	return InputBase;
}(React.Component);

export default InputBase;


InputBase.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,

	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	list: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	autoFocus: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	checked: PropTypes.bool,
	autoComplete: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	value: PropTypes.string,

	getElementRef: PropTypes.func,
	tabIndex: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
	getValue: PropTypes.func,

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