import _Object$assign from "babel-runtime/core-js/object/assign";
import pictureStyleMapping from '../picture/styleMapping';

export default {

  "default": {
    picStyles: _Object$assign({ groupStyle: "default" }, pictureStyleMapping["default"]),
    textStyle: "default",
    iconStyle: "default"
  },
  "myavatar": {
    picStyles: _Object$assign({ groupStyle: "default" }, pictureStyleMapping["default"]),
    textStyle: "default",
    iconStyle: "default"
  }

  // "styleId" : [ "pictureStyleId",  "textStylesId" , "iconStyleId" ]

};