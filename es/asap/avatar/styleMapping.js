import _Object$assign from "babel-runtime/core-js/object/assign";
import pictureStyleMapping from '../picture/styleMapping';

export default {

  "default": {
    picStyles: _Object$assign({ groupStyle: "default" }, pictureStyleMapping["default"]),
    textStyle: "default",
    iconStyle: "default"
  },
  "thumbnail_box": {
    picStyles: _Object$assign({ groupStyle: "thumbnail_group" }, pictureStyleMapping["thumbnail_group"]),
    textStyle: "thumbnail_text",
    iconStyle: "thumbnail_icon"
  }

  // "styleId" : [ "pictureStyleId",  "textStylesId" , "iconStyleId" ]

};