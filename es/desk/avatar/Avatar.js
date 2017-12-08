import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FrameShapeBase from '../../js/FrameShapeBase';

import styles from './avatar.css';
import colorsStyles from '../common-css/colors/colors.css';
import bordersStyles from '../common-css/borders/borders.css';

import pictureStyles from '../picture/picturebox.css';
import textStyles from '../plaintext/plaintext.css';
import iconStyles from '../icons/icon.css';

import styleMapping from './styleMapping';
import cx from '../../utils/classNamesUtils/classNames';

var Avatar = function (_React$Component) {
  _inherits(Avatar, _React$Component);

  function Avatar() {
    _classCallCheck(this, Avatar);

    return _possibleConstructorReturn(this, (Avatar.__proto__ || _Object$getPrototypeOf(Avatar)).apply(this, arguments));
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
          shape = _props.shape,
          bgColor = _props.bgColor,
          textColor = _props.textColor,
          size = _props.size,
          borderSize = _props.borderSize;


      var styleMappings = styleMapping[styleId];
      var classNames = cx(styles[styleId], styles["avatar_" + type], styles["shape_" + shape], styles["size_" + size], bordersStyles["bdr_" + borderSize], colorsStyles["bg_" + bgColor], colorsStyles["clr_" + textColor]);

      return React.createElement(FrameShapeBase, { type: type, picture: picture, text: text, name: name, iconId: iconId,

        avatarStyle: classNames,
        textStyle: textStyles[styleMappings.textStyle],
        iconStyle: iconStyles[styleMappings.iconStyle],
        picStyles: {
          groupStyle: pictureStyles[styleMappings.picStyles.groupStyle],
          sourceStyle: pictureStyles[styleMappings.picStyles.sourceStyle],
          captionStyle: pictureStyles[styleMappings.picStyles.captionStyle]
        }

      });
    }
  }]);

  return Avatar;
}(React.Component);

export default Avatar;


Avatar.defaultProps = {
  styleId: "default"
};

Avatar.propTypes = {

  type: PropTypes.oneOf(["picture", "text", "icon"]),

  picture: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  iconId: PropTypes.string,

  shape: PropTypes.string,
  size: PropTypes.string,
  borderSize: PropTypes.string,

  bgColor: PropTypes.string,
  textColor: PropTypes.string,

  styleId: PropTypes.string

};

if (__DOCS__) {
  Avatar.docs = {
    componentGroup: "Atom"
  };
}