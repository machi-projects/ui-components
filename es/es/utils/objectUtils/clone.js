import _Object$assign from "babel-runtime/core-js/object/assign";
export default clone = function clone() {
  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  return _Object$assign.apply(null, [{}].concat(rest));
};