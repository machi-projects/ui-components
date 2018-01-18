import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabsBase, { TabsHeaderBase, TabItemBase, TabsBodyBase, TabContentBase } from '../../js/core/TabsBase';

import styleMapping from './styleMapping';

export var TabItem = function (_Component) {
  _inherits(TabItem, _Component);

  function TabItem() {
    _classCallCheck(this, TabItem);

    return _possibleConstructorReturn(this, (TabItem.__proto__ || _Object$getPrototypeOf(TabItem)).apply(this, arguments));
  }

  _createClass(TabItem, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabItem;
}(Component);

TabItem.propTypes = {
  id: PropTypes.string.isRequired
};

export var TabsHeader = function (_Component2) {
  _inherits(TabsHeader, _Component2);

  function TabsHeader() {
    _classCallCheck(this, TabsHeader);

    return _possibleConstructorReturn(this, (TabsHeader.__proto__ || _Object$getPrototypeOf(TabsHeader)).apply(this, arguments));
  }

  _createClass(TabsHeader, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabsHeader;
}(Component);

TabsHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(["TabItem"]) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(["TabItem"]) }))])
};

export var TabContent = function (_Component3) {
  _inherits(TabContent, _Component3);

  function TabContent() {
    _classCallCheck(this, TabContent);

    return _possibleConstructorReturn(this, (TabContent.__proto__ || _Object$getPrototypeOf(TabContent)).apply(this, arguments));
  }

  _createClass(TabContent, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabContent;
}(Component);

TabContent.propTypes = {
  id: PropTypes.string.isRequired
};

export var TabsBody = function (_Component4) {
  _inherits(TabsBody, _Component4);

  function TabsBody() {
    _classCallCheck(this, TabsBody);

    return _possibleConstructorReturn(this, (TabsBody.__proto__ || _Object$getPrototypeOf(TabsBody)).apply(this, arguments));
  }

  _createClass(TabsBody, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabsBody;
}(Component);

TabsBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(["TabContent"]) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(["TabContent"]) }))])
};

var Tabs = function (_Component5) {
  _inherits(Tabs, _Component5);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || _Object$getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styleId = _props.styleId,
          selectedTab = _props.selectedTab,
          onSelectTab = _props.onSelectTab,
          groupName = _props.groupName;


      var tabsStyle = styles[styleId];

      var headerStyleMappings = styleMapping[styleId].headerStyles;
      var bodStyleMappings = styleMapping[styleId].bodyStyles;

      var tabsHeaderStyles = {
        active: styles[headerStyleMappings.selectedItemStyle],
        item: styles[headerStyleMappings.itemStyle],
        group: styles[headerStyleMappings.groupStyle]
      };

      var tabsBodyStyles = {
        active: styles[bodStyleMappings.selectedItemStyle],
        item: styles[bodStyleMappings.itemStyle],
        group: styles[bodStyleMappings.groupStyle]
      };

      return React.createElement(
        TabsBase,
        { groupName: groupName, tabsStyle: tabsStyle, selectedTab: selectedTab, onSelectTab: onSelectTab },
        React.Children.map(this.props.children, function (child, i) {

          if (child.type.prototype === TabsHeader.prototype) {
            return React.createElement(TabsHeaderBase, _extends({}, child.props, { styles: tabsHeaderStyles }));
          } else if (child.type.prototype === TabsBody.prototype) {
            return React.createElement(TabsBodyBase, _extends({}, child.props, { styles: tabsBodyStyles }));
          }
        })
      );
    }
  }]);

  return Tabs;
}(Component);

export default Tabs;


Tabs.defaultProps = {
  styleId: "default"
};

Tabs.propTypes = {

  styleId: PropTypes.string,
  selectedTab: PropTypes.string,
  onSelectTab: PropTypes.func,

  children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(["TabsHeader", "TabsBody"]) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(["TabsHeader", "TabsBody"]) }))])

};

if (__DOCS__) {
  Tabs.docs = {
    componentGroup: "Molecule"
  };
}