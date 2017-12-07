'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TabsBodyBase = exports.TabContentBase = exports.TabsHeaderBase = exports.TabItemBase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PickOneGroupBase = require('../core/PickOneGroupBase');

var _PickOneGroupBase2 = _interopRequireDefault(_PickOneGroupBase);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabItemBase = exports.TabItemBase = function (_React$Component) {
	_inherits(TabItemBase, _React$Component);

	function TabItemBase() {
		_classCallCheck(this, TabItemBase);

		return _possibleConstructorReturn(this, (TabItemBase.__proto__ || Object.getPrototypeOf(TabItemBase)).apply(this, arguments));
	}

	_createClass(TabItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return TabItemBase;
}(_react2.default.Component);

TabItemBase.propTypes = {
	id: _propTypes2.default.string.isRequired
};

var TabsHeaderBase = exports.TabsHeaderBase = function (_React$Component2) {
	_inherits(TabsHeaderBase, _React$Component2);

	function TabsHeaderBase() {
		_classCallCheck(this, TabsHeaderBase);

		return _possibleConstructorReturn(this, (TabsHeaderBase.__proto__ || Object.getPrototypeOf(TabsHeaderBase)).apply(this, arguments));
	}

	_createClass(TabsHeaderBase, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    selectedTab = _props.selectedTab,
			    _props$styles = _props.styles,
			    styles = _props$styles === undefined ? {} : _props$styles,
			    onSelectTabItem = _props.onSelectTabItem,
			    groupName = _props.groupName;


			var allStyles = { styles: styles };

			return _react2.default.createElement(
				_PickOneGroupBase2.default,
				_extends({}, allStyles, {
					selectedItem: selectedTab,
					onSelect: function onSelect(val, el) {
						onSelectTabItem && onSelectTabItem(val, el);
					}
				}),
				_react2.default.Children.map(this.props.children, function (child, i) {
					//let uniqueId = uniqueName + (i+1);
					//let childStyles  = child.props.styles || {};
					return _react2.default.createElement(
						_PickOneGroupBase.PickOneItemBase,
						{ key: i, pickId: child.props.id },
						child.props.children
					);
				})
			);
		}
	}]);

	return TabsHeaderBase;
}(_react2.default.Component);

TabsHeaderBase.propTypes = {
	styles: _propTypes2.default.shape({
		group: _propTypes2.default.string,
		item: _propTypes2.default.string,
		active: _propTypes2.default.string
	})
};

var TabContentBase = exports.TabContentBase = function (_React$Component3) {
	_inherits(TabContentBase, _React$Component3);

	function TabContentBase() {
		_classCallCheck(this, TabContentBase);

		return _possibleConstructorReturn(this, (TabContentBase.__proto__ || Object.getPrototypeOf(TabContentBase)).apply(this, arguments));
	}

	_createClass(TabContentBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return TabContentBase;
}(_react2.default.Component);

TabContentBase.propTypes = {
	id: _propTypes2.default.string.isRequired
};

var TabsBodyBase = exports.TabsBodyBase = function (_React$Component4) {
	_inherits(TabsBodyBase, _React$Component4);

	function TabsBodyBase() {
		_classCallCheck(this, TabsBodyBase);

		return _possibleConstructorReturn(this, (TabsBodyBase.__proto__ || Object.getPrototypeOf(TabsBodyBase)).apply(this, arguments));
	}

	_createClass(TabsBodyBase, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    selectedTab = _props2.selectedTab,
			    _props2$styles = _props2.styles,
			    styles = _props2$styles === undefined ? {} : _props2$styles;


			var allStyles = { styles: styles };

			return _react2.default.createElement(
				_PickOneGroupBase2.default,
				_extends({}, allStyles, { selectedItem: selectedTab, itemsControls: true }),
				_react2.default.Children.map(this.props.children, function (child, i) {
					//let childStyles  = child.props.styles || {};
					return _react2.default.createElement(
						_PickOneGroupBase.PickOneItemBase,
						{ key: i, pickId: child.props.id },
						child.props.children
					);
				})
			);
		}
	}]);

	return TabsBodyBase;
}(_react2.default.Component);

TabsBodyBase.propTypes = {
	styles: _propTypes2.default.shape({
		group: _propTypes2.default.string,
		item: _propTypes2.default.string,
		active: _propTypes2.default.string
	})
};

var TabsBase = function (_React$Component5) {
	_inherits(TabsBase, _React$Component5);

	function TabsBase(props) {
		_classCallCheck(this, TabsBase);

		var _this5 = _possibleConstructorReturn(this, (TabsBase.__proto__ || Object.getPrototypeOf(TabsBase)).call(this, props));

		_this5.state = { selectedTab: _this5.props.selectedTab };
		// Bind the method to the component context
		_this5.onSelectTabItem = _this5.onSelectTabItem.bind(_this5);
		return _this5;
	}

	_createClass(TabsBase, [{
		key: 'onSelectTabItem',
		value: function onSelectTabItem(newSelectedTab, el, ev) {
			var currentTarget = ev ? ev.currentTarget : null;
			this.setState({ selectedTab: newSelectedTab }, function () {
				this.props.onSelectTab && this.props.onSelectTab(this.props.groupName, this.state.selectedTab, currentTarget);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _props3 = this.props,
			    tabsStyle = _props3.tabsStyle,
			    groupName = _props3.groupName;


			return _react2.default.createElement(
				'div',
				{ className: tabsStyle },
				_react2.default.Children.map(this.props.children, function (child, i) {
					if (child.type.prototype === TabsHeaderBase.prototype) {
						return _react2.default.cloneElement(child, {
							onSelectTabItem: _this6.onSelectTabItem,
							selectedTab: _this6.state.selectedTab,
							groupName: groupName
						});
					} else if (child.type.prototype === TabsBodyBase.prototype) {
						return _react2.default.cloneElement(child, { selectedTab: _this6.state.selectedTab });
					}
				})
			);
		}
	}]);

	return TabsBase;
}(_react2.default.Component);

exports.default = TabsBase;


TabsBase.defaultProps = {
	styles: {}
};

TabsBase.propTypes = {
	tabsStyle: _propTypes2.default.string,
	groupName: _propTypes2.default.string,
	selectedTab: _propTypes2.default.string,
	onSelectTab: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['TabsHeaderBase', 'TabsBodyBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['TabsHeaderBase', 'TabsBodyBase']) }))])
};