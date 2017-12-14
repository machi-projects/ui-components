'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../asap/index');

var _Pill = require('./Pill.css');

var _Pill2 = _interopRequireDefault(_Pill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pill = function (_React$Component) {
  _inherits(Pill, _React$Component);

  function Pill(props) {
    _classCallCheck(this, Pill);

    var _this = _possibleConstructorReturn(this, (Pill.__proto__ || Object.getPrototypeOf(Pill)).call(this, props));

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

      return _react2.default.createElement(
        'span',
        { className: type == "tag" ? _Pill2.default.tag : _Pill2.default.pill },
        _react2.default.createElement(
          'span',
          { className: _Pill2.default.pillBody, onClick: this.onClick },
          frontIcon && _react2.default.createElement(
            'span',
            { className: _Pill2.default.pillTypeIcon },
            _react2.default.createElement(_index.Icon, { id: frontIcon.name, size: frontIcon.size })
          ),
          _react2.default.createElement(
            'span',
            { className: type == "tag" ? _Pill2.default.tagColor + " " + _Pill2.default.pillLabel : _Pill2.default.pillLabel, title: text },
            text
          )
        ),
        backIcon && _react2.default.createElement(
          'span',
          { className: _Pill2.default.pillRemove },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_index.Icon, { id: backIcon.name, size: backIcon.size, onClick: this.onBackIconClick })
          )
        )
      );
    }
  }]);

  return Pill;
}(_react2.default.Component);

exports.default = Pill;


Pill.propTypes = {
  link: _propTypes2.default.string,
  text: _propTypes2.default.string.isRequired,
  frontIcon: _propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    size: _propTypes2.default.string.isRequired
  }),
  backIcon: _propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    size: _propTypes2.default.string.isRequired
  })
};