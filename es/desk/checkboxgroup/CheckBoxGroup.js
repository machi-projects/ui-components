import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBoxGroupBase, { CheckBoxItemBase } from '../../js/form/CheckBoxGroupBase';

import styles from './checkboxgroup.css';
import inputStyles from '../input/inputbutton/inputbutton.css';
import labelStyles from '../label/label.css';

import styleMapping from './styleMapping';

import { omit } from '../../utils/objectUtils';
import cx from '../../utils/classNamesUtils/classNamesBind';

export var CheckBoxItem = function (_Component) {
	_inherits(CheckBoxItem, _Component);

	function CheckBoxItem() {
		_classCallCheck(this, CheckBoxItem);

		return _possibleConstructorReturn(this, (CheckBoxItem.__proto__ || _Object$getPrototypeOf(CheckBoxItem)).apply(this, arguments));
	}

	_createClass(CheckBoxItem, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return CheckBoxItem;
}(Component);

CheckBoxItem.propTypes = {
	value: PropTypes.string.isRequired,
	tabIndex: PropTypes.string,
	focusIn: PropTypes.func,
	focusOut: PropTypes.func
};

var CheckBoxGroup = function (_Component2) {
	_inherits(CheckBoxGroup, _Component2);

	function CheckBoxGroup() {
		_classCallCheck(this, CheckBoxGroup);

		return _possibleConstructorReturn(this, (CheckBoxGroup.__proto__ || _Object$getPrototypeOf(CheckBoxGroup)).apply(this, arguments));
	}

	_createClass(CheckBoxGroup, [{
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
				CheckBoxGroupBase,
				_extends({}, newProps, {
					styles: { group: classNames, item: itemStyle, active: itemActiveStyle }
				}),
				React.Children.map(this.props.children, function (child, i) {
					return React.createElement(CheckBoxItemBase, _extends({}, child.props, {
						key: i,
						styles: { inputStyle: inputStyle, labelStyle: labelStyle }
					}));
				})
			);
		}
	}]);

	return CheckBoxGroup;
}(Component);

export default CheckBoxGroup;


CheckBoxGroup.defaultProps = {
	styleId: 'default'
};

CheckBoxGroup.propTypes = {
	styleId: PropTypes.string,
	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItems: PropTypes.arrayOf(PropTypes.string),
	onSelect: PropTypes.func,

	fireEvent: PropTypes.string,
	tabIndex: PropTypes.string,
	focusIn: PropTypes.func,
	focusOut: PropTypes.func,
	onClick: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	hidden: PropTypes.bool,
	focused: PropTypes.bool,
	errored: PropTypes.bool,
	valid: PropTypes.bool,
	raised: PropTypes.bool,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItem']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItem']) }))])
};

if (__DOCS__) {
	CheckBoxGroup.docs = {
		componentGroup: 'Atom'
	};
}