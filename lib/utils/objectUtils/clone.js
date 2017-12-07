"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = clone = function clone() {
  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  return Object.assign.apply(null, [{}].concat(rest));
};