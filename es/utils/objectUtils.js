import _Object$keys from 'babel-runtime/core-js/object/keys';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$assign from 'babel-runtime/core-js/object/assign';

export var clone = function clone(a, b, c, d, e, f) {
		return _Object$assign(a, b, c, d, e, f);
};

export var extract = function extract(obj, keys, target) {
		target = target || {};
		for (var i in obj) {
				if (keys.indexOf(i) < 0) continue;
				if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
				target[i] = obj[i];
		}
		return target;
};

export var omit = function omit(obj, keys, target) {
		target = target || {};
		for (var i in obj) {
				if (keys.indexOf(i) >= 0) continue;
				if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
				target[i] = obj[i];
		}
		return target;
};

export var equals = function equals(x, y) {
		if (x === y) return true;
		// if both x and y are null or undefined and exactly the same

		if (x == null && y != null || x != null && y == null) return false;
		//break if not same null or undefined

		if (!(x instanceof Object) || !(y instanceof Object)) return false;
		// if they are not strictly equal, they both need to be Objects

		if (x.constructor !== y.constructor) return false;
		// they must have the exact same prototype chain, the closest we can do is
		// test there constructor.


		for (var p in x) {
				if (!x.hasOwnProperty(p)) continue;
				// other properties were tested using x.constructor === y.constructor

				if (!y.hasOwnProperty(p)) return false;
				// allows to compare x[ p ] and y[ p ] when set to undefined

				if (x[p] === y[p]) continue;
				// if they have the same strict value or identity then they are equal

				if (_typeof(x[p]) !== "object") return false;
				// Numbers, Strings, Functions, Booleans must be strictly equal

				if (!equals(x[p], y[p])) return false;
				// Objects and Arrays must be tested recursively
		}

		for (p in y) {
				if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
				// allows x[ p ] to be set to undefined
		}
		return true;
};

export var IsEqualGivenKeys = function IsEqualGivenKeys(a, b) {
		var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


		var equalKeysList = keys.filter(function (keyId, i) {

				if (deepEqualObject(a[keyId], b[keyId])) {
						return true;
				}
				return false;
		});

		return equalKeysList.length == keys.length ? true : false;
};

export var deepEqualObject = function deepEqualObject(a, b) {

		if (a === b) {
				return true;
		}

		//isCaseSensitive
		if (a == b) {
				return true;
		}

		var arrA = Array.isArray(a),
		    arrB = Array.isArray(b),
		    i;

		if (arrA != arrB) return false;

		if (arrA && arrB) {
				if (a.length != b.length) {
						return false;
				}
				for (i = 0; i < a.length; i++) {
						if (!deepEqualObject(a[i], b[i])) {
								return false;
						}
				}
				return true;
		}

		if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
				var keys = _Object$keys(a);
				if (keys.length !== _Object$keys(b).length) {
						return false;
				}

				var dateA = a instanceof Date,
				    dateB = b instanceof Date;
				if (dateA && dateB) {
						return a.getTime() == b.getTime();
				}
				if (dateA != dateB) {
						return false;
				}

				var regexpA = a instanceof RegExp,
				    regexpB = b instanceof RegExp;
				if (regexpA && regexpB) {
						return a.toString() == b.toString();
				};
				if (regexpA != regexpB) {
						return false;
				};

				for (i = 0; i < keys.length; i++) {
						if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
								return false;
						}
				}

				for (i = 0; i < keys.length; i++) {
						if (!deepEqualObject(a[keys[i]], b[keys[i]])) {
								return false;
						}
				}

				return true;
		}

		if (a && b && typeof a === 'function' && typeof b === 'function') {
				return true;
		}

		return false;
};