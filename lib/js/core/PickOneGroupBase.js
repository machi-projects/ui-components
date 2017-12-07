'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PickOneItemBase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _validator = require('../../utils/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickOneItemBase = exports.PickOneItemBase = function (_React$Component) {
	_inherits(PickOneItemBase, _React$Component);

	function PickOneItemBase(props) {
		_classCallCheck(this, PickOneItemBase);

		var _this = _possibleConstructorReturn(this, (PickOneItemBase.__proto__ || Object.getPrototypeOf(PickOneItemBase)).call(this, props));

		_this.onPickItem = _this.onPickItem.bind(_this);
		return _this;
	}

	_createClass(PickOneItemBase, [{
		key: 'onPickItem',
		value: function onPickItem(newSelectedItemPid, ev) {
			this.props.onSelectItem(newSelectedItemPid, ev);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var itemPid = this.props.pickId;

			var selectedItemStyle = this.props.selectedItem == itemPid ? this.props.selectedItemStyle : '';
			var itemStyles = (selectedItemStyle || '') + ' ' + (this.props.normalItemStyle || '');

			var events = {};
			events[this.props.pickOn] = this.props.itemsControls ? null : function (ev) {
				_this2.onPickItem(itemPid, ev);
			};

			return itemPid ? _react2.default.createElement(
				'div',
				_extends({ className: itemStyles }, events, { tabIndex: this.props.tabIndex }),
				this.props.children
			) : null;
		}
	}]);

	return PickOneItemBase;
}(_react2.default.Component);

PickOneItemBase.propTypes = {
	pickId: _propTypes2.default.string.isRequired,
	tabIndex: _propTypes2.default.string
};

var PickOneGroupBase = function (_React$Component2) {
	_inherits(PickOneGroupBase, _React$Component2);

	function PickOneGroupBase(props) {
		_classCallCheck(this, PickOneGroupBase);

		// Bind the method to the component context
		var _this3 = _possibleConstructorReturn(this, (PickOneGroupBase.__proto__ || Object.getPrototypeOf(PickOneGroupBase)).call(this, props));

		_this3.renderChildren = _this3.renderChildren.bind(_this3);
		_this3.onSelectItem = _this3.onSelectItem.bind(_this3);
		_this3.state = { selectedItem: _this3.props.selectedItem };
		_this3.validateOnSelect = _this3.validateOnSelect.bind(_this3);

		_this3.setRef = _this3.setRef.bind(_this3);
		return _this3;
	}

	_createClass(PickOneGroupBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.selectedItem !== nextProps.selectedItem) {
				var pickGroupTag = this.elementRef;
				this.onSelectItem(nextProps.selectedItem, pickGroupTag);
			}

			if (nextProps.validation != null && nextProps.validation.validate) {
				this.validateOnSelect(this.state.selectedItem, nextProps);
			}
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(value, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required'];
			var defaultType = 'onegroup';

			var validation = props.validation,
			    onPassValidation = props.onPassValidation,
			    onFailValidation = props.onFailValidation;


			var targetTag = this.elementRef;
			if (validation != null) {
				//validateOn won't work here ...
				var newValidation = _validator2.default.combinePropsValidation(this.props, defaultType, props.pickOn, validation, defaultCheckPropsRules, defaultValidateRules);

				var validationObj = {
					validation: newValidation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				};

				_validator2.default.executeValidation(value, targetTag, validationObj);
			} else {
				onPassValidation && onPassValidation(value, targetTag);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.validation != null && this.props.validation.validate) {
				this.validateOnSelect(this.state.selectedItem, this.props);
			}
		}
	}, {
		key: 'onSelectItem',
		value: function onSelectItem(newSelectedPid, ev) {
			var currentTarget = ev.currentTarget;
			this.setState({ selectedItem: newSelectedPid }, function () {
				this.props.onSelect && this.props.onSelect(this.state.selectedItem, currentTarget);
				if (this.props.validation != null && this.props.validation.validateOn) {
					this.validateOnSelect(this.state.selectedItem, this.props);
				}
			});
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var _this4 = this;

			return _react2.default.Children.map(this.props.children, function (child, i) {
				return _react2.default.cloneElement(child, {
					key: i,
					selectedItem: _this4.state.selectedItem,
					onSelectItem: _this4.onSelectItem,
					selectedItemStyle: _this4.props.styles.active,
					normalItemStyle: _this4.props.styles.item,
					itemsControls: _this4.props.itemsControls,
					pickOn: _this4.props.pickOn
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: this.props.styles.group, ref: this.setRef, tabIndex: this.props.tabIndex },
				this.renderChildren()
			);
		}
	}]);

	return PickOneGroupBase;
}(_react2.default.Component);

exports.default = PickOneGroupBase;


PickOneGroupBase.defaultProps = {
	styles: {},
	itemsControls: false,
	pickOn: 'onClick'
};

PickOneGroupBase.propTypes = {
	styles: _propTypes2.default.shape({
		group: _propTypes2.default.string,
		item: _propTypes2.default.string,
		active: _propTypes2.default.string
	}),
	required: _propTypes2.default.bool,

	tabIndex: _propTypes2.default.string,
	itemsControls: _propTypes2.default.bool,
	selectedItem: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,
	pickOn: _propTypes2.default.string,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.string,
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['PickOneItemBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['PickOneItemBase']) }))])
};