import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PickOneGroupBase, { PickOneItemBase } from '../core/PickOneGroupBase';
import PropTypes from 'prop-types';
import InputButtonBoxBase from './InputButtonBoxBase';
import LabelBoxBase from './LabelBoxBase';

export var RadioBoxItemBase = function (_React$Component) {
	_inherits(RadioBoxItemBase, _React$Component);

	function RadioBoxItemBase() {
		_classCallCheck(this, RadioBoxItemBase);

		return _possibleConstructorReturn(this, (RadioBoxItemBase.__proto__ || _Object$getPrototypeOf(RadioBoxItemBase)).apply(this, arguments));
	}

	_createClass(RadioBoxItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return RadioBoxItemBase;
}(React.Component);

RadioBoxItemBase.propTypes = {
	value: PropTypes.string.isRequired,
	tabIndex: PropTypes.string,
	styles: {
		inputStyle: PropTypes.string,
		labelStyle: PropTypes.string
	}
};

var RadioBoxGroupBase = function (_React$Component2) {
	_inherits(RadioBoxGroupBase, _React$Component2);

	function RadioBoxGroupBase(props) {
		_classCallCheck(this, RadioBoxGroupBase);

		var _this2 = _possibleConstructorReturn(this, (RadioBoxGroupBase.__proto__ || _Object$getPrototypeOf(RadioBoxGroupBase)).call(this, props));

		_this2.state = {
			uniqueName: Date.now() + '_radio',
			selectedItem: _this2.props.selectedItem
		};
		_this2.onSelectedItem = _this2.onSelectedItem.bind(_this2);
		return _this2;
	}

	_createClass(RadioBoxGroupBase, [{
		key: 'onSelectedItem',
		value: function onSelectedItem(newSelectedItem, el) {
			var _this3 = this;

			this.setState(function (prevState) {
				prevState.selectedItem = newSelectedItem;
				return prevState;
			}, function () {
				_this3.props.onSelect && _this3.props.onSelect(_this3.props.groupName, _this3.state.selectedItem, el);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectedItem = _props.selectedItem,
			    _props$styles = _props.styles,
			    styles = _props$styles === undefined ? {} : _props$styles,
			    required = _props.required,
			    onSelect = _props.onSelect,
			    groupName = _props.groupName,
			    validation = _props.validation,
			    onPassValidation = _props.onPassValidation,
			    onFailValidation = _props.onFailValidation,
			    fireEvent = _props.fireEvent,
			    tabIndex = _props.tabIndex,
			    focusIn = _props.focusIn,
			    focusOut = _props.focusOut,
			    onClick = _props.onClick;


			var uniqueName = this.state.uniqueName;
			var allStyles = { styles: styles };

			var stateSelectedItem = this.state.selectedItem;

			return React.createElement(
				PickOneGroupBase,
				_extends({
					required: required,
					validation: validation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				}, allStyles, {
					selectedItem: selectedItem,
					onSelect: this.onSelectedItem,

					fireEvent: fireEvent,
					tabIndex: tabIndex,
					focusIn: focusIn,
					focusOut: focusOut,
					onClick: onClick
				}),
				React.Children.map(this.props.children, function (child, i) {
					var checked = stateSelectedItem == child.props.value;

					//controlled RadioBoxItemBase..
					var childStyles = child.props.styles || {};
					return React.createElement(
						PickOneItemBase,
						{ key: i, pickId: child.props.value, tabIndex: child.props.tabIndex },
						React.createElement(InputButtonBoxBase, {
							type: 'radio',
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

	return RadioBoxGroupBase;
}(React.Component);

export default RadioBoxGroupBase;


RadioBoxGroupBase.defaultProps = {
	styles: {}
};

RadioBoxGroupBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),

	required: PropTypes.bool,

	groupName: PropTypes.string,
	selectedItem: PropTypes.string,
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

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['RadioBoxItemBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['RadioBoxItemBase']) }))])
};