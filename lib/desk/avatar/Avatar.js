'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FrameShapeBase = require('../../js/FrameShapeBase');

var _FrameShapeBase2 = _interopRequireDefault(_FrameShapeBase);

var _avatar = require('./avatar.css');

var _avatar2 = _interopRequireDefault(_avatar);

var _colors = require('../common-css/colors/colors.css');

var _colors2 = _interopRequireDefault(_colors);

var _borders = require('../common-css/borders/borders.css');

var _borders2 = _interopRequireDefault(_borders);

var _picturebox = require('../picture/picturebox.css');

var _picturebox2 = _interopRequireDefault(_picturebox);

var _plaintext = require('../plaintext/plaintext.css');

var _plaintext2 = _interopRequireDefault(_plaintext);

var _icon = require('../icons/icon.css');

var _icon2 = _interopRequireDefault(_icon);

var _styleMapping = require('./styleMapping');

var _styleMapping2 = _interopRequireDefault(_styleMapping);

var _classNames = require('../../utils/classNamesUtils/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _units = require('../common-css/layoutunits/units.css');

var _units2 = _interopRequireDefault(_units);

var _fontsizes = require('../common-css/font-sizes/fontsizes.css');

var _fontsizes2 = _interopRequireDefault(_fontsizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_React$Component) {
  _inherits(Avatar, _React$Component);

  function Avatar() {
    _classCallCheck(this, Avatar);

    return _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).apply(this, arguments));
  }

  _createClass(Avatar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          styleId = _props.styleId,
          type = _props.type,
          picture = _props.picture,
          text = _props.text,
          name = _props.name,
          iconId = _props.iconId,
          onPictureError = _props.onPictureError,
          shape = _props.shape,
          bgColor = _props.bgColor,
          textColor = _props.textColor,
          textBorderColor = _props.textBorderColor,
          size = _props.size,
          borderSize = _props.borderSize,
          fontSize = _props.fontSize,
          lineHeight = _props.lineHeight;


      var styleMappings = _styleMapping2.default[styleId];
      var classNames = (0, _classNames2.default)(_avatar2.default[styleId], _avatar2.default["avatar_" + type], _borders2.default["bdr_" + shape], _units2.default["dm_" + size], _borders2.default["bdr_" + borderSize], _fontsizes2.default["fs_" + fontSize], _units2.default["lh_" + lineHeight], _colors2.default["bg_" + bgColor], _colors2.default["clr_" + textColor], _colors2.default["foto_set_" + textBorderColor]);

      return _react2.default.createElement(_FrameShapeBase2.default, { type: type, picture: picture, text: text, name: name, iconId: iconId,

        onPictureError: onPictureError,
        frameStyle: classNames,
        textStyle: _plaintext2.default[styleMappings.textStyle],
        iconStyle: _icon2.default[styleMappings.iconStyle],
        picStyles: {
          groupStyle: _picturebox2.default[styleMappings.picStyles.groupStyle],
          sourceStyle: _picturebox2.default[styleMappings.picStyles.sourceStyle],
          captionStyle: _picturebox2.default[styleMappings.picStyles.captionStyle]
        }

      });
    }
  }]);

  return Avatar;
}(_react2.default.Component);

exports.default = Avatar;


Avatar.defaultProps = {
  styleId: "default"
};

Avatar.propTypes = {

  type: _propTypes2.default.oneOf(["picture", "text", "icon"]),

  picture: _propTypes2.default.string,
  text: _propTypes2.default.string,
  name: _propTypes2.default.string,
  iconId: _propTypes2.default.string,

  onPictureError: _propTypes2.default.func,
  shape: _propTypes2.default.string,
  size: _propTypes2.default.string,
  borderSize: _propTypes2.default.string,
  frameStyle: _propTypes2.default.string,

  bgColor: _propTypes2.default.string,
  textColor: _propTypes2.default.string,

  styleId: _propTypes2.default.string,
  fontSize: _propTypes2.default.string,
  lineHeight: _propTypes2.default.string,

  textBorderColor: _propTypes2.default.string
};

if (__DOCS__) {
  Avatar.docs = {
    componentGroup: "Atom"
  };
}