'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PickItemBase = undefined;

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

var PickItemBase = exports.PickItemBase = function (_React$Component) {
	_inherits(PickItemBase, _React$Component);

	function PickItemBase(props) {
		_classCallCheck(this, PickItemBase);

		var _this = _possibleConstructorReturn(this, (PickItemBase.__proto__ || Object.getPrototypeOf(PickItemBase)).call(this, props));

		_this.onPickItem = _this.onPickItem.bind(_this);
		_this.state = { timeStamp: 0 };
		return _this;
	}

	_createClass(PickItemBase, [{
		key: 'onPickItem',
		value: function onPickItem(newSelectedItemPid, ev) {
			this.props.onSelectItem(newSelectedItemPid, ev.target);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var itemPid = this.props.pickId;

			var selectedItemStyle = this.props.selectedItems.indexOf(itemPid) != -1 ? this.props.selectedItemStyle : null;
			var itemStyles = (selectedItemStyle || '') + ' ' + (this.props.normalItemStyle || '');

			var events = {};
			events[this.props.pickOn] = this.props.itemsControls ? null : function (ev) {
				_this2.onPickItem(itemPid, ev);
			};

			return itemPid ? _react2.default.createElement(
				'div',
				_extends({ className: itemStyles }, events, { tabIndex: this.props.tabIndex, onFocus: this.props.focusIn, onBlur: this.props.focusOut }),
				this.props.children
			) : null;
		}
	}]);

	return PickItemBase;
}(_react2.default.Component);

PickItemBase.propTypes = {
	pickId: _propTypes2.default.string.isRequired,
	tabIndex: _propTypes2.default.string,
	focusIn: _propTypes2.default.func,
	focusOut: _propTypes2.default.func
};

var PickMultiGroupBase = function (_React$Component2) {
	_inherits(PickMultiGroupBase, _React$Component2);

	function PickMultiGroupBase(props) {
		_classCallCheck(this, PickMultiGroupBase);

		// Bind the method to the component context
		var _this3 = _possibleConstructorReturn(this, (PickMultiGroupBase.__proto__ || Object.getPrototypeOf(PickMultiGroupBase)).call(this, props));

		_this3.renderChildren = _this3.renderChildren.bind(_this3);
		_this3.onSelectItem = _this3.onSelectItem.bind(_this3);
		_this3.state = { selectedItems: _this3.props.selectedItems };
		_this3.validateOnSelect = _this3.validateOnSelect.bind(_this3);

		_this3.setRef = _this3.setRef.bind(_this3);
		return _this3;
	}

	_createClass(PickMultiGroupBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var previousPids = (this.props.selectedItems || []).join('');
			var nextPids = (nextProps.selectedItems || []).join('');
			if (previousPids != nextPids) {
				var pickGroupTag = this.elementRef;
				onSelectItem(nextProps.selectedItems, pickGroupTag, nextProps);
			}

			if (nextProps.validation != null && nextProps.validation.validate) {
				this.validateOnSelect(this.state.selectedItems, nextProps);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var _this4 = this;

			if (this.props.fireEvent !== prevProps.fireEvent && this.props.fireEvent) {
				requestAnimationFrame(function () {
					_this4.elementRef && _this4.elementRef[_this4.props.fireEvent] && _this4.elementRef[_this4.props.fireEvent]();
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this5 = this;

			if (this.props.validation != null && this.props.validation.validate) {
				this.validateOnSelect(this.state.selectedItems, this.props);
			}

			if (this.props.fireEvent != null) {
				requestAnimationFrame(function () {
					_this5.elementRef && _this5.elementRef[_this5.props.fireEvent] && _this5.elementRef[_this5.props.fireEvent]();
				});
			}
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(values, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required'];
			var defaultType = 'multigroup';

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

				_validator2.default.executeValidation(values, targetTag, validationObj, defaultType);
			} else {
				onPassValidation && onPassValidation(values, targetTag);
			}
		}
	}, {
		key: 'onSelectItem',
		value: function onSelectItem(newSelectedPid, ev, nextProps) {
			this.setState(function (state) {
				var selectedItems = state.selectedItems;
				var itemPosition = selectedItems.indexOf(newSelectedPid);
				if (itemPosition == -1) {
					selectedItems.push(newSelectedPid);
				} else {
					selectedItems.splice(itemPosition, 1);
				}

				return { selectedItems: selectedItems };
			}, function () {
				var selectedItems = this.state.selectedItems;
				var itemPosition = selectedItems.indexOf(newSelectedPid);

				this.props.onSelect && this.props.onSelect(selectedItems, {
					id: newSelectedPid,
					active: itemPosition !== -1
				}, ev.currentTarget);

				if (this.props.validation && this.props.validation.validateOn) {
					this.validateOnSelect(selectedItems, nextProps || this.props);
				}
			});
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var _this6 = this;

			return _react2.default.Children.map(this.props.children, function (child) {
				return _react2.default.cloneElement(child, {
					selectedItems: _this6.state.selectedItems,
					onSelectItem: _this6.onSelectItem,
					selectedItemStyle: _this6.props.styles.active,
					normalItemStyle: _this6.props.styles.item,
					itemsControls: _this6.props.itemsControls,
					pickOn: _this6.props.pickOn
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				{ className: this.props.styles.group, ref: this.setRef, tabIndex: this.props.tabIndex,
					onFocus: this.props.focusIn,
					onBlur: this.props.focusOut,
					onClick: this.props.onClick },
				this.renderChildren()
			);
		}
	}]);

	return PickMultiGroupBase;
}(_react2.default.Component);

exports.default = PickMultiGroupBase;


PickMultiGroupBase.defaultProps = {
	styles: {},
	itemsControls: false,
	pickOn: 'onClick'
};

PickMultiGroupBase.propTypes = {
	styles: _propTypes2.default.shape({
		group: _propTypes2.default.string,
		item: _propTypes2.default.string,
		active: _propTypes2.default.string
	}),
	required: _propTypes2.default.bool,

	itemsControls: _propTypes2.default.bool,
	selectedItems: _propTypes2.default.arrayOf(_propTypes2.default.string),
	onSelect: _propTypes2.default.func,
	pickOn: _propTypes2.default.string,

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

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['PickItemBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['PickItemBase']) }))])
};