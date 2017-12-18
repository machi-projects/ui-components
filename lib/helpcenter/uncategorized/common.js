"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
exports.formatValue = formatValue;
function bind() {
  var _this = this;

  for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
    handlers[_key] = arguments[_key];
  }

  handlers.forEach(function (handler) {
    _this[handler] = _this[handler].bind(_this);
  });
}
function formatValue() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var valueField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "id";
  var textField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "name";

  return values && values.map(function (value) {
    var formattedValue = value;
    if (typeof value === "string" || typeof value === "number") {
      formattedValue = {};
      formattedValue[valueField] = value;
      formattedValue[textField] = value;
    }
    return formattedValue;
  }) || [];
}