import _typeof from "babel-runtime/helpers/typeof";
export function bind() {
	var _this = this;

	for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
		handlers[_key] = arguments[_key];
	}

	handlers.forEach(function (handler) {
		_this[handler] = _this[handler].bind(_this);
	});
}

export function formatValue() {
	var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var valueField = arguments[1];
	var textField = arguments[2];

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

export function getSelectedValue() {
	var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var valueField = arguments[1];


	return values.map(function (obj, index) {

		return obj[valueField];
	});
}

export function formatSelectedValue() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var value = arguments[1];
	var valueField = arguments[2];
	var textField = arguments[3];

	var selected = value,
	    count = 0,
	    selectedOptName = value;

	var formatedOptions = options.map(function (opt, index) {
		var val = opt,
		    name = opt;
		if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) == 'object') {
			val = opt[valueField];
			name = opt[textField];
		}

		if (value == val) {
			selected = val;
			count = index;
			selectedOptName = name;
		}
	});
	return { selected: selected, count: count, selectedOptName: selectedOptName, formatedOptions: formatedOptions, options: options };
};