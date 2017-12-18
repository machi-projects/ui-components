'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsBody = exports.TabContent = exports.TabsHeader = exports.TabItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TabsBase = require('../../js/core/TabsBase');

var _TabsBase2 = _interopRequireDefault(_TabsBase);

var _tabs = require('./tabs.css');

var _tabs2 = _interopRequireDefault(_tabs);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabItem = exports.TabItem = function (_Component) {
  _inherits(TabItem, _Component);

  function TabItem() {
    _classCallCheck(this, TabItem);

    return _possibleConstructorReturn(this, (TabItem.__proto__ || Object.getPrototypeOf(TabItem)).apply(this, arguments));
  }

  _createClass(TabItem, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabItem;
}(_react.Component);

TabItem.propTypes = {
  id: _propTypes2.default.string.isRequired
};

var TabsHeader = exports.TabsHeader = function (_Component2) {
  _inherits(TabsHeader, _Component2);

  function TabsHeader() {
    _classCallCheck(this, TabsHeader);

    return _possibleConstructorReturn(this, (TabsHeader.__proto__ || Object.getPrototypeOf(TabsHeader)).apply(this, arguments));
  }

  _createClass(TabsHeader, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabsHeader;
}(_react.Component);

TabsHeader.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(["TabItem"]) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(["TabItem"]) }))])
};

var TabContent = exports.TabContent = function (_Component3) {
  _inherits(TabContent, _Component3);

  function TabContent() {
    _classCallCheck(this, TabContent);

    return _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).apply(this, arguments));
  }

  _createClass(TabContent, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabContent;
}(_react.Component);

TabContent.propTypes = {
  id: _propTypes2.default.string.isRequired
};

var TabsBody = exports.TabsBody = function (_Component4) {
  _inherits(TabsBody, _Component4);

  function TabsBody() {
    _classCallCheck(this, TabsBody);

    return _possibleConstructorReturn(this, (TabsBody.__proto__ || Object.getPrototypeOf(TabsBody)).apply(this, arguments));
  }

  _createClass(TabsBody, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TabsBody;
}(_react.Component);

TabsBody.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(["TabContent"]) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(["TabContent"]) }))])
};

var Tabs = function (_Component5) {
  _inherits(Tabs, _Component5);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styleId = _props.styleId,
          selectedTab = _props.selectedTab,
          onSelectTab = _props.onSelectTab,
          groupName = _props.groupName;


      var tabsStyle = _tabs2.default[styleId];

      var headerStyleMappings = _styleMapping2.default[styleId].headerStyles;
      var bodStyleMappings = _styleMapping2.default[styleId].bodyStyles;

      var tabsHeaderStyles = {
        active: _tabs2.default[headerStyleMappings.selectedItemStyle],
        item: _tabs2.default[headerStyleMappings.itemStyle],
        group: _tabs2.default[headerStyleMappings.groupStyle]
      };

      var tabsBodyStyles = {
        active: _tabs2.default[bodStyleMappings.selectedItemStyle],
        item: _tabs2.default[bodStyleMappings.itemStyle],
        group: _tabs2.default[bodStyleMappings.groupStyle]
      };

      return _react2.default.createElement(
        _TabsBase2.default,
        { groupName: groupName, tabsStyle: tabsStyle, selectedTab: selectedTab, onSelectTab: onSelectTab },
        _react2.default.Children.map(this.props.children, function (child, i) {

          if (child.type.prototype === TabsHeader.prototype) {
            return _react2.default.createElement(_TabsBase.TabsHeaderBase, _extends({}, child.props, { styles: tabsHeaderStyles }));
          } else if (child.type.prototype === TabsBody.prototype) {
            return _react2.default.createElement(_TabsBase.TabsBodyBase, _extends({}, child.props, { styles: tabsBodyStyles }));
          }
        })
      );
    }
  }]);

  return Tabs;
}(_react.Component);

exports.default = Tabs;


Tabs.defaultProps = {
  styleId: "default"
};

Tabs.propTypes = {

  styleId: _propTypes2.default.string,
  selectedTab: _propTypes2.default.string,
  onSelectTab: _propTypes2.default.func,

  children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(["TabsHeader", "TabsBody"]) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(["TabsHeader", "TabsBody"]) }))])

};

if (__DOCS__) {
  Tabs.docs = {
    componentGroup: "Molecule"
  };
}