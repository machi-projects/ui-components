'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwn = {}.hasOwnProperty;

exports.default = function () {
	for (var _len = arguments.length, argumentsList = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		argumentsList[_key - 1] = arguments[_key];
	}

	var _this = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var classes = {};

	for (var i = 0; i < argumentsList.length; i++) {
		var arg = argumentsList[i];
		if (!arg) continue;

		var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

		if (argType == 'string' || argType == 'number') {
			classes.push(_this && _this[arg] || arg);
		} else if (Array.isArray(arg)) {
			classes.push(classNames.apply(_this, arg));
		} else if (argType == 'object') {
			for (var key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(_this && _this[key] || key);
				}
			}
		}
	}

	return classes.join(' ');
};