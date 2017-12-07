'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _docs = require('./docs.js');

Object.keys(_docs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _docs[key];
    }
  });
});