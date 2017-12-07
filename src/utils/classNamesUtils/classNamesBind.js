let hasOwn = {}.hasOwnProperty;
export default (_this = {}, ...argumentsList) => {
	var classes = [];

	for (var i = 0; i < argumentsList.length; i++) {
		var arg = argumentsList[i];
		if (!arg) continue;

		var argType = typeof arg;

		if (argType == 'string' || argType == 'number') {
			classes.push((_this && _this[arg]) || arg);
		} else if (Array.isArray(arg)) {
			classes.push(classNames.apply(_this, arg));
		} else if (argType == 'object') {
			for (var key in arg) {
				if (hasOwn.call(arg, key) && arg[key] && (_this && _this[key])) {
					classes.push(_this[key]);
				}
			}
		}
	}

	return classes.join(' ');
};
