'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RadioBoxItemBase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PickOneGroupBase = require('../core/PickOneGroupBase');

var _PickOneGroupBase2 = _interopRequireDefault(_PickOneGroupBase);

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

var RadioBoxItemBase = exports.RadioBoxItemBase = function (_React$Component) {
	_inherits(RadioBoxItemBase, _React$Component);

	function RadioBoxItemBase() {
		_classCallCheck(this, RadioBoxItemBase);

		return _possibleConstructorReturn(this, (RadioBoxItemBase.__proto__ || Object.getPrototypeOf(RadioBoxItemBase)).apply(this, arguments));
	}

	_createClass(RadioBoxItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return RadioBoxItemBase;
}(_react2.default.Component);

RadioBoxItemBase.propTypes = {
	value: _propTypes2.default.string.isRequired,
	tabIndex: _propTypes2.default.string,
	styles: {
		inputStyle: _propTypes2.default.string,
		labelStyle: _propTypes2.default.string
	}
};

var RadioBoxGroupBase = function (_React$Component2) {
	_inherits(RadioBoxGroupBase, _React$Component2);

	function RadioBoxGroupBase(props) {
		_classCallCheck(this, RadioBoxGroupBase);

		var _this2 = _possibleConstructorReturn(this, (RadioBoxGroupBase.__proto__ || Object.getPrototypeOf(RadioBoxGroupBase)).call(this, props));

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

			return _react2.default.createElement(
				_PickOneGroupBase2.default,
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
				_react2.default.Children.map(this.props.children, function (child, i) {
					var checked = stateSelectedItem == child.props.value;

					//controlled RadioBoxItemBase..
					var childStyles = child.props.styles || {};
					return _react2.default.createElement(
						_PickOneGroupBase.PickOneItemBase,
						{ key: i, pickId: child.props.value, tabIndex: child.props.tabIndex },
						_react2.default.createElement(_InputButtonBoxBase2.default, {
							type: 'radio',
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

	return RadioBoxGroupBase;
}(_react2.default.Component);

exports.default = RadioBoxGroupBase;


RadioBoxGroupBase.defaultProps = {
	styles: {}
};

RadioBoxGroupBase.propTypes = {
	styles: _propTypes2.default.shape({
		group: _propTypes2.default.string,
		item: _propTypes2.default.string,
		active: _propTypes2.default.string
	}),

	required: _propTypes2.default.bool,

	groupName: _propTypes2.default.string,
	selectedItem: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,

	fireEvent: _propTypes2.default.string,
	tabIndex: _propTypes2.default.string,
	focusIn: _propTypes2.default.func,
	focusOut: _propTypes2.default.func,
	onClick: _propTypes2.default.func,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['RadioBoxItemBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['RadioBoxItemBase']) }))])
};