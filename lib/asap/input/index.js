'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InputButton = require('./inputbutton/InputButton');

Object.defineProperty(exports, 'InputButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputButton).default;
  }
});

var _InputText = require('./inputtext/InputText');

Object.defineProperty(exports, 'InputText', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputText).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }