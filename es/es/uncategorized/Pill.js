import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import style from './css/Pill.css';

var Pill = function (_React$Component) {
  _inherits(Pill, _React$Component);

  function Pill(props) {
    _classCallCheck(this, Pill);

    var _this = _possibleConstructorReturn(this, (Pill.__proto__ || _Object$getPrototypeOf(Pill)).call(this, props));

    _this.onBackIconClick = _this.onBackIconClick.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(Pill, [{
    key: 'onClick',
    value: function onClick(e) {
      var _props = this.props,
          onClick = _props.onClick,
          link = _props.link;

      if (onClick) {
        e.preventDefault();
        onClick(link);
      }
    }
  }, {
    key: 'onBackIconClick',
    value: function onBackIconClick(e) {
      var _props2 = this.props,
          id = _props2.id,
          onBackIconClick = _props2.onBackIconClick;

      onBackIconClick(id, e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          _props3$link = _props3.link,
          link = _props3$link === undefined ? null : _props3$link,
          text = _props3.text,
          frontIcon = _props3.frontIcon,
          backIcon = _props3.backIcon,
          _props3$fronIconClick = _props3.fronIconClick,
          fronIconClick = _props3$fronIconClick === undefined ? null : _props3$fronIconClick,
          type = _props3.type;

      return React.createElement(
        'span',
        { className: type == "tag" ? style.tag : style.pill },
        React.createElement(
          'span',
          { className: style.pillBody, onClick: this.onClick },
          frontIcon && React.createElement(
            'span',
            { className: style.pillTypeIcon },
            React.createElement(Icon, { icon: frontIcon.name, size: frontIcon.size })
          ),
          React.createElement(
            'span',
            { className: type == "tag" ? style.tagColor + " " + style.pillLabel : style.pillLabel, title: text },
            text
          )
        ),
        backIcon && React.createElement(
          'span',
          { className: style.pillRemove },
          React.createElement(
            'span',
            null,
            React.createElement(Icon, { icon: backIcon.name, size: backIcon.size, onClick: this.onBackIconClick })
          )
        )
      );
    }
  }]);

  return Pill;
}(React.Component);

export default Pill;


Pill.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  frontIcon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  }),
  backIcon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  })
};