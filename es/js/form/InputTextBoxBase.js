import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import InputBase from '../core/InputBase';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import { deepEqualObject } from '../../utils/objectUtils';

var InputTextBoxBase = function (_React$Component) {
	_inherits(InputTextBoxBase, _React$Component);

	function InputTextBoxBase() {
		_classCallCheck(this, InputTextBoxBase);

		return _possibleConstructorReturn(this, (InputTextBoxBase.__proto__ || _Object$getPrototypeOf(InputTextBoxBase)).apply(this, arguments));
	}

	_createClass(InputTextBoxBase, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return deepEqualObject(nextProps, this.props) == false || deepEqualObject(nextState, this.state) == false;
		}
	}, {
		key: 'render',
		value: function render() {
			var defaultCheckPropsRules = ['required', 'min', 'minLength', 'range', 'rangeLength', 'max', 'maxLength', 'step', 'pattern'];
			var defaultValidateRules = ['required', 'min', 'minLength', 'range', 'rangeLength', 'max', 'maxLength', 'step', 'pattern', 'email', 'integer', 'digits', 'double', 'phone', 'url', 'hexcode', 'month', 'date', 'time', 'datetime', 'cleartextpattern'];

			var defaultType = 'text';

			var _props = this.props,
			    type = _props.type,
			    validation = _props.validation;


			var newType = type || defaultType;
			var newValidation = validator.combinePropsValidation(this.props, newType, 'onBlur', validation, defaultCheckPropsRules, defaultValidateRules);

			return React.createElement(InputBase, _extends({}, this.props, { type: newType, validation: newValidation }));
		}
	}]);

	return InputTextBoxBase;
}(React.Component);

export default InputTextBoxBase;


InputTextBoxBase.defaultProps = {
	type: 'text'
};

InputTextBoxBase.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf(['number', 'email', 'text', 'range', 'color', 'phone', 'file', 'search', 'tel', 'url', 'month', 'week', 'date', 'time', 'datetime-local', 'hidden']).isRequired,
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

	tabIndex: PropTypes.string,
	autoComplete: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	value: PropTypes.string,

	getElementRef: PropTypes.func,
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