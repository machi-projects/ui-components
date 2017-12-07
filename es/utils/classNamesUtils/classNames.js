import _typeof from 'babel-runtime/helpers/typeof';
var hasOwn = {}.hasOwnProperty;
export default (function () {
  for (var _len = arguments.length, argumentsList = Array(_len), _key = 0; _key < _len; _key++) {
    argumentsList[_key] = arguments[_key];
  }

  var classes = [];

  for (var i = 0; i < argumentsList.length; i++) {
    var arg = argumentsList[i];
    if (!arg) continue;

    var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
});