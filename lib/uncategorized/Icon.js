'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('./css/Icon.css');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon(props) {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, props));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var icons = { searchIcon: "#search", xCloseIcon: "#x" };
      var _props = this.props,
          icon = _props.icon,
          _props$size = _props.size,
          size = _props$size === undefined ? "" : _props$size,
          iconColor = _props.iconColor,
          hoverColor = _props.hoverColor,
          _props$onClick = _props.onClick,
          onClick = _props$onClick === undefined ? null : _props$onClick;

      var hoverColorClass = hoverColor ? _Icon2.default[hoverColor] : "";
      iconColor = iconColor ? _Icon2.default[iconColor] : "";
      return _react2.default.createElement(
        'svg',
        { 'data-testid': 'icon', className: _Icon2.default.icon + " " + _Icon2.default[size] + " " + iconColor + " " + hoverColorClass, onClick: onClick },
        _react2.default.createElement('use', { xlinkHref: icons[icon] })
      );
    }
  }]);

  return Icon;
}(_react2.default.Component);

exports.default = Icon;


Icon.propTypes = {
  icon: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.string,
  iconColor: _propTypes2.default.string
};