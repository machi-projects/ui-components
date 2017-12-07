var exports = {};

var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

var type = function type() {
  return Object.prototype.toString.call(this).slice(8, -1);
};

for (var i = types.length; i--;) {
  exports['is' + types[i]] = function (self) {
    return function (elem) {
      return type.call(elem) === self;
    };
  }(types[i]);
}

export default exports;