import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PickOneGroupBase, { PickOneItemBase } from '../core/PickOneGroupBase';
import PropTypes from 'prop-types';

export var TabItemBase = function (_React$Component) {
	_inherits(TabItemBase, _React$Component);

	function TabItemBase() {
		_classCallCheck(this, TabItemBase);

		return _possibleConstructorReturn(this, (TabItemBase.__proto__ || _Object$getPrototypeOf(TabItemBase)).apply(this, arguments));
	}

	_createClass(TabItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return TabItemBase;
}(React.Component);

TabItemBase.propTypes = {
	id: PropTypes.string.isRequired
};

export var TabsHeaderBase = function (_React$Component2) {
	_inherits(TabsHeaderBase, _React$Component2);

	function TabsHeaderBase() {
		_classCallCheck(this, TabsHeaderBase);

		return _possibleConstructorReturn(this, (TabsHeaderBase.__proto__ || _Object$getPrototypeOf(TabsHeaderBase)).apply(this, arguments));
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

			return React.createElement(
				PickOneGroupBase,
				_extends({}, allStyles, {
					selectedItem: selectedTab,
					onSelect: function onSelect(val, el) {
						onSelectTabItem && onSelectTabItem(val, el);
					}
				}),
				React.Children.map(this.props.children, function (child, i) {
					//let uniqueId = uniqueName + (i+1);
					//let childStyles  = child.props.styles || {};
					return React.createElement(
						PickOneItemBase,
						{ key: i, pickId: child.props.id },
						' ',
						child.props.children,
						' '
					);
				})
			);
		}
	}]);

	return TabsHeaderBase;
}(React.Component);

TabsHeaderBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	})
};

export var TabContentBase = function (_React$Component3) {
	_inherits(TabContentBase, _React$Component3);

	function TabContentBase() {
		_classCallCheck(this, TabContentBase);

		return _possibleConstructorReturn(this, (TabContentBase.__proto__ || _Object$getPrototypeOf(TabContentBase)).apply(this, arguments));
	}

	_createClass(TabContentBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return TabContentBase;
}(React.Component);

TabContentBase.propTypes = {
	id: PropTypes.string.isRequired
};

export var TabsBodyBase = function (_React$Component4) {
	_inherits(TabsBodyBase, _React$Component4);

	function TabsBodyBase() {
		_classCallCheck(this, TabsBodyBase);

		return _possibleConstructorReturn(this, (TabsBodyBase.__proto__ || _Object$getPrototypeOf(TabsBodyBase)).apply(this, arguments));
	}

	_createClass(TabsBodyBase, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    selectedTab = _props2.selectedTab,
			    _props2$styles = _props2.styles,
			    styles = _props2$styles === undefined ? {} : _props2$styles;


			var allStyles = { styles: styles };

			return React.createElement(
				PickOneGroupBase,
				_extends({}, allStyles, { selectedItem: selectedTab, itemsControls: true }),
				React.Children.map(this.props.children, function (child, i) {
					//let childStyles  = child.props.styles || {};
					return React.createElement(
						PickOneItemBase,
						{ key: i, pickId: child.props.id },
						' ',
						child.props.children,
						' '
					);
				})
			);
		}
	}]);

	return TabsBodyBase;
}(React.Component);

TabsBodyBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	})
};

var TabsBase = function (_React$Component5) {
	_inherits(TabsBase, _React$Component5);

	function TabsBase(props) {
		_classCallCheck(this, TabsBase);

		var _this5 = _possibleConstructorReturn(this, (TabsBase.__proto__ || _Object$getPrototypeOf(TabsBase)).call(this, props));

		_this5.state = { selectedTab: _this5.props.selectedTab };

		// Bind the method to the component context
		_this5.onSelectTabItem = _this5.onSelectTabItem.bind(_this5);
		return _this5;
	}

	_createClass(TabsBase, [{
		key: 'onSelectTabItem',
		value: function onSelectTabItem(newSelectedTab, ev) {
			var currentTarget = ev.currentTarget;
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


			return React.createElement(
				'div',
				{ className: tabsStyle },
				React.Children.map(this.props.children, function (child, i) {
					if (child.type.prototype === TabsHeaderBase.prototype) {
						return React.cloneElement(child, {
							onSelectTabItem: _this6.onSelectTabItem,
							selectedTab: _this6.state.selectedTab,
							groupName: groupName
						});
					} else if (child.type.prototype === TabsBodyBase.prototype) {
						return React.cloneElement(child, { selectedTab: _this6.state.selectedTab });
					}
				})
			);
		}
	}]);

	return TabsBase;
}(React.Component);

export default TabsBase;


TabsBase.defaultProps = {
	styles: {}
};

TabsBase.propTypes = {
	tabsStyle: PropTypes.string,
	groupName: PropTypes.string,
	selectedTab: PropTypes.string,
	onSelectTab: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['TabsHeaderBase', 'TabsBodyBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['TabsHeaderBase', 'TabsBodyBase']) }))])
};