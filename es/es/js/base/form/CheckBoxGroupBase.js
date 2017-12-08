import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PickMultiGroupBase, { PickItemBase } from '../core/PickMultiGroupBase';
import PropTypes from 'prop-types';
import InputButtonBoxBase from './InputButtonBoxBase';
import LabelBoxBase from './LabelBoxBase';

export var CheckBoxItemBase = function (_React$Component) {
	_inherits(CheckBoxItemBase, _React$Component);

	function CheckBoxItemBase() {
		_classCallCheck(this, CheckBoxItemBase);

		return _possibleConstructorReturn(this, (CheckBoxItemBase.__proto__ || _Object$getPrototypeOf(CheckBoxItemBase)).apply(this, arguments));
	}

	_createClass(CheckBoxItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return CheckBoxItemBase;
}(React.Component);

CheckBoxItemBase.propTypes = {
	value: PropTypes.string.isRequired
};

var CheckBoxGroupBase = function (_React$Component2) {
	_inherits(CheckBoxGroupBase, _React$Component2);

	function CheckBoxGroupBase(props) {
		_classCallCheck(this, CheckBoxGroupBase);

		var _this2 = _possibleConstructorReturn(this, (CheckBoxGroupBase.__proto__ || _Object$getPrototypeOf(CheckBoxGroupBase)).call(this, props));

		_this2.state = {
			uniqueName: Date.now() + '_checkbox',
			selectedItems: _this2.props.selectedItems || []
		};
		_this2.onSelectedItem = _this2.onSelectedItem.bind(_this2);
		return _this2;
	}

	_createClass(CheckBoxGroupBase, [{
		key: 'onSelectedItem',
		value: function onSelectedItem(newSelectedItems, currObjState, el) {
			var _this3 = this;

			this.setState(function (prevState) {
				prevState.selectedItems = newSelectedItems;
				return prevState;
			}, function () {
				_this3.props.onSelect && _this3.props.onSelect(_this3.props.groupName, _this3.state.selectedItems, currObjState, el);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectedItems = _props.selectedItems,
			    _props$styles = _props.styles,
			    styles = _props$styles === undefined ? {} : _props$styles,
			    required = _props.required,
			    hidden = _props.hidden,
			    groupName = _props.groupName,
			    validation = _props.validation,
			    onPassValidation = _props.onPassValidation,
			    onFailValidation = _props.onFailValidation;


			var uniqueName = this.state.uniqueName;
			var allStyles = { styles: styles };

			var stateSelectedItems = this.state.selectedItems;

			return React.createElement(
				PickMultiGroupBase,
				_extends({
					required: required,
					validation: validation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				}, allStyles, {
					selectedItems: selectedItems,
					onSelect: this.onSelectedItem
				}),
				React.Children.map(this.props.children, function (child, i) {
					var checked = stateSelectedItems.indexOf(child.props.value) !== -1;

					//controlled CheckBoxItemBase..

					var childStyles = child.props.styles || {};
					return React.createElement(
						PickItemBase,
						{ key: i, pickId: child.props.value },
						React.createElement(InputButtonBoxBase, {
							type: 'checkbox',
							name: uniqueName,
							className: childStyles.inputStyle,
							checked: checked,
							required: required
						}),
						React.createElement(
							LabelBoxBase,
							{ className: childStyles.labelStyle },
							child.props.children
						)
					);
				})
			);
		}
	}]);

	return CheckBoxGroupBase;
}(React.Component);

export default CheckBoxGroupBase;


CheckBoxGroupBase.defaultProps = {
	styles: {}
};

CheckBoxGroupBase.propTypes = {
	styles: PropTypes.shape({
		selectedItemStyle: PropTypes.string,
		itemStyle: PropTypes.string,
		groupStyle: PropTypes.string
	}),
	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItems: PropTypes.arrayOf(PropTypes.string),
	onSelect: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.oneOf(['onClick']),
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItemBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['CheckBoxItemBase']) }))])
};