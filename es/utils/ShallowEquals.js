import _Object$keys from "babel-runtime/core-js/object/keys";


export function shallowEqualArrays(arrA, arrB) {
		if (arrA === arrB) {
				return true;
		}

		arrA = arrA || [];
		arrB = arrB || [];

		var len = arrA.length;

		if (arrB.length !== len) {
				return false;
		}

		for (; len > 0; len--) {
				if (arrA[len] !== arrB[len]) {
						return false;
				}
		}

		return true;
};

export function shallowEqualObjects(objA, objB) {
		if (objA === objB) {
				return true;
		}

		var aKeys = _Object$keys(objA);
		var bKeys = _Object$keys(objB);
		var len = aKeys.length;

		if (bKeys.length !== len) {
				return false;
		}

		for (var i = 0; i < len; i++) {
				var key = aKeys[i];

				if (objA[key] !== objB[key]) {
						return false;
				}
		}

		return true;
};