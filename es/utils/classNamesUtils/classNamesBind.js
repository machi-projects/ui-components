import _typeof from 'babel-runtime/helpers/typeof';
var hasOwn = {}.hasOwnProperty;
export default (function () {
	for (var _len = arguments.length, argumentsList = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		argumentsList[_key - 1] = arguments[_key];
	}

	var _this = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var classes = [];

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
				if (hasOwn.call(arg, key) && arg[key] && _this && _this[key]) {
					classes.push(_this[key]);
				}
			}
		}
	}

	return classes.join(' ');
});