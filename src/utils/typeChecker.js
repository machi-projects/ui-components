const exports = {};

let types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

let type = function () {
return Object.prototype.toString.call(this).slice(8, -1);
};

for (var i = types.length; i--;) {
exports['is' + types[i]] = (function (self) {
    return function (elem) {
     return type.call(elem) === self;
    };
  })(types[i]);
}

export default exports;
