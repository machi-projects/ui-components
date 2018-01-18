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

var InputButtonBoxBase = function (_React$Component) {
	_inherits(InputButtonBoxBase, _React$Component);

	function InputButtonBoxBase() {
		_classCallCheck(this, InputButtonBoxBase);

		return _possibleConstructorReturn(this, (InputButtonBoxBase.__proto__ || _Object$getPrototypeOf(InputButtonBoxBase)).apply(this, arguments));
	}

	_createClass(InputButtonBoxBase, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return deepEqualObject(nextProps, this.props) == false || deepEqualObject(nextState, this.state) == false;
		}
	}, {
		key: 'render',
		value: function render() {

			var defaultCheckPropsRules = ["required", "pattern"];
			var defaultValidateRules = ["required", "pattern"];
			var defaultType = "radio";

			var _props = this.props,
			    type = _props.type,
			    validation = _props.validation;


			var newType = type || defaultType;
			var newValidation = validator.combinePropsValidation(this.props, newType, "onChange", validation, defaultCheckPropsRules, defaultValidateRules);

			return React.createElement(InputBase, _extends({}, this.props, { type: newType, validation: newValidation }));
		}
	}]);

	return InputButtonBoxBase;
}(React.Component);

export default InputButtonBoxBase;


InputButtonBoxBase.defaultProps = {
	type: "radio"
};

InputButtonBoxBase.propTypes = {

	id: PropTypes.string,
	type: PropTypes.oneOf(["checkbox", "radio"]).isRequired,
	name: PropTypes.string,
	className: PropTypes.string,

	readOnly: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	checked: PropTypes.bool,

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