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

import sizeStyles from '../common-css/layoutunits/units.css';
import borderStyles from '../common-css/borders/borders.css';
import fontSizeStyles from '../common-css/font-sizes/fontsizes.css';
import lineHeightStyles from '../common-css/layoutunits/units.css';
export default class Avatar extends React.Component {

  render() {

  	let {
      styleId,
      type,
      picture,
      text,
      name,
      iconId,
      onPictureError,

      shape,
      bgColor,
      textColor,
      textBorderColor,
      size,
      borderSize,
      fontSize,
      lineHeight

    } = this.props;

    let styleMappings = styleMapping[ styleId ];
    let classNames = cx( styles[ styleId ],

    styles[ "avatar_"+type] ,
    borderStyles[ "bdr_"+shape ] ,
    sizeStyles[ "dm_"+size ] ,
    borderStyles[ "bdr_"+borderSize ] ,
    fontSizeStyles[ "fs_"+fontSize ],
    lineHeightStyles[ "lh_"+lineHeight],

    colorsStyles[ "bg_"+bgColor ],
    colorsStyles[ "clr_"+textColor ] ,
    colorsStyles[ "foto_set_"+textBorderColor ]  );
    
    return(<FrameShapeBase type={type} picture={picture} text={text} name={name} iconId={iconId}

          onPictureError={onPictureError}
    		  frameStyle={ classNames }
          textStyle = { textStyles[ styleMappings.textStyle ] }
          iconStyle = { iconStyles[ styleMappings.iconStyle ] }
          picStyles = {{
            groupStyle : pictureStyles[ styleMappings.picStyles.groupStyle ] ,
            sourceStyle : pictureStyles[ styleMappings.picStyles.sourceStyle ] ,
            captionStyle : pictureStyles[ styleMappings.picStyles.captionStyle ]
          }}

    />);

  }

}

Avatar.defaultProps = {
  styleId : "default"
}

Avatar.propTypes = {

  type : PropTypes.oneOf(["picture","text","icon"]),

  picture : PropTypes.string,
  text : PropTypes.string,
  name : PropTypes.string,
  iconId : PropTypes.string,

  onPictureError : PropTypes.func,
  shape : PropTypes.string,
  size : PropTypes.string ,
  borderSize : PropTypes.string,
  frameStyle : PropTypes.string,

  bgColor : PropTypes.string,
  textColor : PropTypes.string,

  styleId : PropTypes.string,
  fontSize : PropTypes.string,
  lineHeight : PropTypes.string,
  
  textBorderColor:PropTypes.string
}


if(__DOCS__){
  Avatar.docs = {
    componentGroup: "Atom"
  };
}
