import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioBoxGroupBase, { RadioBoxItemBase } from '../../js/form/RadioBoxGroupBase';

import styles from './radiogroup.css';
import inputStyles from '../input/inputbutton/inputbutton.css';
import labelStyles from '../label/label.css';

import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export var RadioItem = function (_Component) {
	_inherits(RadioItem, _Component);

	function RadioItem() {
		_classCallCheck(this, RadioItem);

		return _possibleConstructorReturn(this, (RadioItem.__proto__ || _Object$getPrototypeOf(RadioItem)).apply(this, arguments));
	}

	_createClass(RadioItem, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return RadioItem;
}(Component);

RadioItem.propTypes = {
	value: PropTypes.string.isRequired,
	tabIndex: PropTypes.string
};

var RadioGroup = function (_Component2) {
	_inherits(RadioGroup, _Component2);

	function RadioGroup() {
		_classCallCheck(this, RadioGroup);

		return _possibleConstructorReturn(this, (RadioGroup.__proto__ || _Object$getPrototypeOf(RadioGroup)).apply(this, arguments));
	}

	_createClass(RadioGroup, [{
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
			    raised = _props.raised;


			var newProps = omit(this.props, ['className', 'styleId', 'readOnly', 'disabled', 'hidden', 'focused', 'errored', 'valid', 'raised']);

			var classNames = cx(styles, (_cx = {}, _defineProperty(_cx, styleId, true), _defineProperty(_cx, 'required', required), _defineProperty(_cx, 'disabled', disabled), _defineProperty(_cx, 'readOnly', readOnly), _defineProperty(_cx, 'hidden', hidden), _defineProperty(_cx, 'focused', focused), _defineProperty(_cx, 'errored', errored), _defineProperty(_cx, 'valid', valid), _defineProperty(_cx, 'raised', raised), _cx));

			//let onPassValidation = validation.validate ?  errored =  true
			var styleMappings = styleMapping[styleId];

			var itemStyle = styles[styleMappings.itemStyle];
			var itemActiveStyle = styles[styleMappings.activeStyle];

			var inputStyle = inputStyles[styleMappings.inputStyle];
			var labelStyle = labelStyles[styleMappings.labelStyle];

			return React.createElement(
				RadioBoxGroupBase,
				_extends({}, newProps, { styles: { group: classNames, item: itemStyle, active: itemActiveStyle } }),
				React.Children.map(this.props.children, function (child, i) {
					return React.createElement(RadioBoxItemBase, _extends({}, child.props, { key: i, styles: { inputStyle: inputStyle, labelStyle: labelStyle } }));
				})
			);
		}
	}]);

	return RadioGroup;
}(Component);

export default RadioGroup;


RadioGroup.defaultProps = {
	styleId: 'default'
};

RadioGroup.propTypes = {
	styleId: PropTypes.string,
	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	fireEvent: PropTypes.string,
	tabIndex: PropTypes.string,
	focusIn: PropTypes.func,
	focusOut: PropTypes.func,
	onClick: PropTypes.func,

	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['RadioItem']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['RadioItem']) }))])
};

if (__DOCS__) {
	RadioGroup.docs = {
		componentGroup: 'Atom'
	};
}