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
  "myavatar": {
    picStyles: Object.assign({ groupStyle: "default" }, _styleMapping2.default["default"]),
    textStyle: "default",
    iconStyle: "default"
  }

  // "styleId" : [ "pictureStyleId",  "textStylesId" , "iconStyleId" ]

};