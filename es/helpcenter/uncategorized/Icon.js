import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import style from './css/Icon.css';

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon(props) {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || _Object$getPrototypeOf(Icon)).call(this, props));
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

      var hoverColorClass = hoverColor ? style[hoverColor] : "";
      iconColor = iconColor ? style[iconColor] : "";
      return React.createElement(
        'svg',
        { 'data-testid': 'icon', className: style.icon + " " + style[size] + " " + iconColor + " " + hoverColorClass, onClick: onClick },
        React.createElement('use', { xlinkHref: icons[icon] })
      );
    }
  }]);

  return Icon;
}(React.Component);

export default Icon;


Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  iconColor: PropTypes.string
};