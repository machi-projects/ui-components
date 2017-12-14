import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import MultiLineInputBase from '../core/MultiLineInputBase';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import { equals } from '../../utils/objectUtils';

var MultiLineInputBoxBase = function (_React$Component) {
	_inherits(MultiLineInputBoxBase, _React$Component);

	function MultiLineInputBoxBase() {
		_classCallCheck(this, MultiLineInputBoxBase);

		return _possibleConstructorReturn(this, (MultiLineInputBoxBase.__proto__ || _Object$getPrototypeOf(MultiLineInputBoxBase)).apply(this, arguments));
	}

	_createClass(MultiLineInputBoxBase, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			if (equals(nextProps, this.props)) {
				return false;
			}

			return true;
		}
	}, {
		key: 'render',
		value: function render() {

			var defaultCheckPropsRules = ["required", "minLength", "maxLength", "pattern"];
			var defaultValidateRules = ["required", "minLength", "maxLength"];
			var defaultType = "textarea";

			var _props = this.props,
			    type = _props.type,
			    validation = _props.validation;


			var newValidation = validator.combinePropsValidation(this.props, defaultType, "onBlur", validation, defaultCheckPropsRules, defaultValidateRules);

			return React.createElement(MultiLineInputBase, _extends({}, this.props, { validation: newValidation }));
		}
	}]);

	return MultiLineInputBoxBase;
}(React.Component);

export default MultiLineInputBoxBase;


MultiLineInputBoxBase.propTypes = {

	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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