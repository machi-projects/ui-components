'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheckBoxItemBase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PickMultiGroupBase = require('../core/PickMultiGroupBase');

var _PickMultiGroupBase2 = _interopRequireDefault(_PickMultiGroupBase);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputButtonBoxBase = require('./InputButtonBoxBase');

var _InputButtonBoxBase2 = _interopRequireDefault(_InputButtonBoxBase);

var _LabelBoxBase = require('./LabelBoxBase');

var _LabelBoxBase2 = _interopRequireDefault(_LabelBoxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBoxItemBase = exports.CheckBoxItemBase = function (_React$Component) {
	_inherits(CheckBoxItemBase, _React$Component);

	function CheckBoxItemBase() {
		_classCallCheck(this, CheckBoxItemBase);

		return _possibleConstructorReturn(this, (CheckBoxItemBase.__proto__ || Object.getPrototypeOf(CheckBoxItemBase)).apply(this, arguments));
	}

	_createClass(CheckBoxItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return CheckBoxItemBase;
}(_react2.default.Component);

CheckBoxItemBase.propTypes = {
	value: _propTypes2.default.string.isRequired
};

var CheckBoxGroupBase = function (_React$Component2) {
	_inherits(CheckBoxGroupBase, _React$Component2);

	function CheckBoxGroupBase(props) {
		_classCallCheck(this, CheckBoxGroupBase);

		var _this2 = _possibleConstructorReturn(this, (CheckBoxGroupBase.__proto__ || Object.getPrototypeOf(CheckBoxGroupBase)).call(this, props));

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

			return _react2.default.createElement(
				_PickMultiGroupBase2.default,
				_extends({
					required: required,
					validation: validation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				}, allStyles, {
					selectedItems: selectedItems,
					onSelect: this.onSelectedItem,
					tabIndex: '-1'
				}),
				_react2.default.Children.map(this.props.children, function (child, i) {
					var checked = stateSelectedItems.indexOf(child.props.value) !== -1;

					//controlled CheckBoxItemBase..

					var childStyles = child.props.styles || {};
					return _react2.default.createElement(
						_PickMultiGroupBase.PickItemBase,
						{ key: i, pickId: child.props.value },
						_react2.default.createElement(_InputButtonBoxBase2.default, {
							type: 'checkbox',
							name: uniqueName,
							className: childStyles.inputStyle,
							checked: checked,
							required: required
						}),
						_react2.default.createElement(
							_LabelBoxBase2.default,
							{ className: childStyles.labelStyle },
							child.props.children
						)
					);
				})
			);
		}
	}]);

	return CheckBoxGroupBase;
}(_react2.default.Component);

exports.default = CheckBoxGroupBase;


CheckBoxGroupBase.defaultProps = {
	styles: {}
};

CheckBoxGroupBase.propTypes = {
	styles: _propTypes2.default.shape({
		selectedItemStyle: _propTypes2.default.string,
		itemStyle: _propTypes2.default.string,
		groupStyle: _propTypes2.default.string
	}),
	required: _propTypes2.default.bool,

	groupName: _propTypes2.default.string,
	selectedItems: _propTypes2.default.arrayOf(_propTypes2.default.string),
	onSelect: _propTypes2.default.func,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['CheckBoxItemBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['CheckBoxItemBase']) }))])
};