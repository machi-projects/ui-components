"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styleMapping = require("../picture/styleMapping");

var _styleMapping2 = _interopRequireDefault(_styleMapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  "default": {
    picStyles: Object.assign({ groupStyle: "default" }, _styleMapping2.default["default"]),
    textStyle: "default",
    iconStyle: "default"
  },
  "thumbnail_box": {
    picStyles: Object.assign({ groupStyle: "thumbnail_group" }, _styleMapping2.default["thumbnail_group"]),
    textStyle: "thumbnail_text",
    iconStyle: "thumbnail_icon"
  }

  // "styleId" : [ "pictureStyleId",  "textStylesId" , "iconStyleId" ]

};