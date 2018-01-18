import _typeof from 'babel-runtime/helpers/typeof';
var _arguments = arguments;
export default classNames = function (_classNames) {
  function classNames() {
    return _classNames.apply(this, arguments);
  }

  classNames.toString = function () {
    return _classNames.toString();
  };

  return classNames;
}(function () {
  var classes = [];

  for (var i = 0; i < _arguments.length; i++) {
    var arg = _arguments[i];
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