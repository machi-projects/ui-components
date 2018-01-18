import _Number$isSafeInteger from 'babel-runtime/core-js/number/is-safe-integer';
import _Number$isFinite from 'babel-runtime/core-js/number/is-finite';
import _Number$isNaN from 'babel-runtime/core-js/number/is-nan';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import typeChecker from './typeChecker';
import { clone } from './objectUtils';

var validator = {
	combinePropsValidation: function combinePropsValidation(currentProps, type, validateOn, validationObj, defaultCheckPropsRules, defaultValidateRules) {
		var newType = type.toLowerCase();

		var newValidation = clone({}, validationObj);
		var validationRules = newValidation.rules;
		var validationRulesOrder = newValidation.rulesOrder;
		var validationMessages = newValidation.messages;

		var newValidationRulesOrder = validationRulesOrder ? [].concat(_toConsumableArray(validationRulesOrder)) : [];
		var newValidationRules = validationRules ? validationRules : {};

		var checkPropsRules = defaultCheckPropsRules;
		var checkPropsOrder = [];
		for (var i = 0; i < checkPropsRules.length; i++) {
			var prop = checkPropsRules[i];
			if (currentProps.hasOwnProperty(prop)) {
				if (newValidationRulesOrder.indexOf(prop) == -1) {
					checkPropsOrder.push(prop);
				}

				if (!newValidationRules.hasOwnProperty(prop)) {
					newValidationRules[prop] = currentProps[prop];
				}
			}
		}

		newValidationRulesOrder = !newValidation.hasOwnProperty('rulesOrder') ? checkPropsOrder.concat(newValidationRulesOrder) : validationRulesOrder;

		var isRulesFound = _Object$keys(newValidationRules).length;
		newValidationRules = isRulesFound ? validator.composeRulesForValidation(newType, defaultValidateRules, newValidationRules) : newValidationRules;

		return {
			validate: newValidation.validate,
			validateOn: newValidation.hasOwnProperty('validateOn') ? newValidation.validateOn : validateOn,
			validationRules: newValidationRules,
			validationRulesOrder: newValidationRulesOrder,
			validationMessages: validationMessages
		};
	},
	executeValidation: function executeValidation(text, inputTag, validationObj, fieldType) {
		var validation = validationObj.validation;
		var validationRulesOrder = validation.validationRulesOrder || [];
		var validationRules = validation.validationRules || {};
		var validationMessages = validation.validationMessages || {};

		var onPassValidation = validationObj.onPassValidation;
		var onFailValidation = validationObj.onFailValidation;

		var skipIfEmptyField = null;
		if (validationRules.required == false && (fieldType !== 'radio' || fieldType !== 'checkbox')) {
			skipIfEmptyField = function skipIfEmptyField(val) {

				if (fieldType == 'onegroup' || fieldType == 'multigroup') {
					return !val || !(val.length > 0);
				}

				var value = (val || '').trim();
				return value.length < 1;
			};
		}

		if (skipIfEmptyField == null || skipIfEmptyField(text) == false) {

			for (var i = 0, len = validationRulesOrder.length; i < len; i++) {
				var rule = validationRulesOrder[i];
				if (!validationRules[rule] || !typeChecker.isFunction(validationRules[rule])) {
					continue;
				}

				var isInValid = validationRules[rule](text, inputTag);

				if (isInValid) {
					var message = validationMessages[rule] && typeChecker.isFunction(validationMessages[rule]) ? validationMessages[rule](text, inputTag) : validationMessages[rule];
					onFailValidation && onFailValidation(rule, message, inputTag);
					return;
				}
			}
		}

		onPassValidation && onPassValidation(text, inputTag);
	},

	composeRulesForValidation: function composeRulesForValidation(type, defaultValidateRules, newValidationRules) {
		var defaultPatterns = validator.regexs;

		var _loop = function _loop(i, len) {
			var rule = defaultValidateRules[i];
			var ruleInfo = newValidationRules[rule] || '';

			if (ruleInfo && !typeChecker.isFunction(ruleInfo)) {
				if (rule == 'required' && ruleInfo === true) {
					newValidationRules[rule] = function (val, el) {
						if (el.willValidate && el.validity.valueMissing) {
							return true;
						}

						if (type == 'radio' || type == 'checkbox') {
							return el.checked == false;
						}

						if (type == 'onegroup' || type == 'multigroup') {
							return !val || val.length < 1;
						}

						var value = (val || '').replace(/\s{2,}/g, ' ').trim();
						return value.length < 1;
					};
				} else if (rule == 'maxLength' && !_Number$isNaN(ruleInfo) && _Number$isFinite(ruleInfo)) {
					var maxLength = Number(ruleInfo);
					newValidationRules[rule] = function (val, el) {
						if (el.willValidate && el.validity.tooLong) {
							return true;
						}

						var value = val || '';
						if (type !== 'multigroup') {
							value = val.trim();
						}

						return !(value.length <= maxLength);
					};
				} else if (rule == 'minLength' && !_Number$isNaN(ruleInfo) && _Number$isFinite(ruleInfo)) {
					var minLength = Number(ruleInfo);
					newValidationRules[rule] = function (val, el) {

						var value = val || '';
						if (type !== 'multigroup') {
							value = val.trim();
						}

						return !(value.length >= minLength);
					};
				} else if (rule == 'rangeLength' && /^([\-\+\d]+)*([\,]{1,1}([\-\+\d]+))$/.test(ruleInfo) == true) {
					var rangeLength = ruleInfo;
					rangeLength = rangeLength.split(',').map(function (a, i) {
						return Number(a);
					});

					newValidationRules[rule] = function (val, el) {
						var value = (val || '').trim();
						return !(value.length >= rangeLength[0] && value.length <= rangeLength[1]);
					};
				} else if (rule == 'step' && ruleInfo) {
					var step = Number(ruleInfo);
					var stepTypes = ['number', 'range', 'date', 'datetime', 'datetime-local', 'month', 'time', 'week'];
					newValidationRules[rule] = function (val, el) {
						if (stepTypes.indexOf(type) != -1) {
							if (el.willValidate && el.validity.stepMismatch) {
								return true;
							}

							return false;
						}

						var value = (val || '').trim();
						value = Number(value);

						if (_Number$isNaN(value) || !_Number$isFinite(value) || _Number$isNaN(step) || !_Number$isFinite(step)) {
							return true;
						}

						return !(value % step == 0);
					};
				} else if (rule == 'max') {
					var max = Number(ruleInfo);
					var maxTypes = ['number', 'range', 'date', 'datetime', 'datetime-local', 'month', 'time', 'week'];
					newValidationRules[rule] = function (val, el) {
						if (maxTypes.indexOf(type) != -1) {
							if (el.willValidate && el.validity.rangeOverflow) {
								return true;
							}

							return false;
						}

						var value = (val || '').trim();
						value = Number(value);

						if (_Number$isNaN(value) || !_Number$isFinite(value) || _Number$isNaN(max) || !_Number$isFinite(max)) {
							return true;
						}

						return !(value <= max);
					};
				} else if (rule == 'min') {
					var min = Number(ruleInfo);
					var minTypes = ['number', 'range', 'date', 'datetime', 'datetime-local', 'month', 'time', 'week'];
					newValidationRules[rule] = function (val, el) {
						if (minTypes.indexOf(type) != -1) {
							if (el.willValidate && el.validity.rangeUnderflow) {
								return true;
							}

							return false;
						}

						var value = (val || '').trim();
						value = Number(value);

						if (_Number$isNaN(value) || !_Number$isFinite(value) || _Number$isNaN(min) || !_Number$isFinite(min)) {
							return true;
						}

						return !(value >= min);
					};
				} else if (rule == 'range' && /^([\-\+\d]+)*([\,]{1,1}([\-\+\d]+))$/.test(ruleInfo) == true) {
					var ranges = ranges.split(',').map(function (a, i) {
						return Number(a);
					});
					newValidationRules[rule] = function (val, el) {
						var value = (val || '').trim();
						value = Number(value);

						if (_Number$isNaN(value) || !_Number$isFinite(value)) {
							return true;
						}

						return !(value >= ranges[0] && value <= ranges[1]);
					};
				} else if ((rule == 'digits' || rule == 'integer' || rule == 'double') && ruleInfo === true) {

					newValidationRules[rule] = function (val, el) {
						var value = (val || '').trim();
						value = Number(value);

						if (_Number$isNaN(value) || !_Number$isFinite(value)) {
							return true;
						}

						var condition = true;
						if (rule == 'integer') {
							condition = _Number$isSafeInteger(value);
						}

						if (rule == 'double') {
							condition = -Number.MAX_VALUE <= value && Number.MAX_VALUE >= value;
						}

						return !defaultPatterns[rule].test(value) && condition;
					};
				} else if ((rule == 'timezonedate' || rule == 'datetimezone' || rule == "date" || rule == "datetime") && ruleInfo === true) {
					newValidationRules[rule] = function (val, el) {
						var value = (val || '').trim();

						if (!defaultPatterns[rule].test(value)) {
							return true;
						}

						if (rule == 'datetime') {
							value = value.split('T')[0];
							//let timings = value[1].replace("Z","").split(":")
							//let 
							//if( !defaultPatterns[rule].test(value); )
						}

						value = value.replace('/', '-');
						value = value.replace(':', '-');
						var values = value.split('-');

						// Extract the string into month, date and year
						var yy = parseInt(values[0]);
						var mm = parseInt(values[1]);
						var dd = parseInt(values[2]);

						// Create list of days of a month [assume there is no leap year by default]
						var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

						if (mm == 1 || mm > 2) {
							if (dd > ListofDays[mm - 1]) {
								return true;
							}
						}

						if (mm == 2) {
							var lyear = false;
							if (!(yy % 4) && yy % 100 || !(yy % 400)) {
								lyear = true;
							}

							if (lyear == false && dd >= 29) {
								return true;
							}

							if (lyear == true && dd > 29) {
								return true;
							}
						}
					};
				} else if (rule == 'pattern' && ruleInfo && ruleInfo.constructor == RegExp) {
					newValidationRules[rule] = function (val, el) {
						var value = (val || '').trim();
						return !new RegExp(ruleInfo).test(value);
					};
				} else if ((rule == 'email' || rule == 'month' || rule == 'time' || rule == 'phone' || rule == 'url' || rule == 'hexcode' || rule == 'cleartextpattern') && ruleInfo === true) {
					newValidationRules[rule] = function (val, el) {
						var value = (val || '').trim();
						return !defaultPatterns[rule].test(value);
					};
				}
			}
		};

		for (var i = 0, len = defaultValidateRules.length; i < len; i++) {
			_loop(i, len);
		}

		return newValidationRules;
	},

	regexs: {
		integer: /^[-+]?[0-9]+$/,
		digits: /^[0-9]+$/,
		double: /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/,
		email: /^[\w]([\w\-\.\+\'\/]*)@([\w\-\.]*)(\.[A-z]{2,22}(\.[a-zA-Z]{2}){0,2})$/,
		phone: /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g,
		hexcode: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
		month: /^(\d{4,6})[\/\-\:](1[0-2]|0[1-9])$/,
		date: /^(\d{4,6})[\/\-](1[0-2]|0[1-9])[\/\-\:](0[1-9]|1[0-9]|2[0-9]|3[0-1])$/,
		time: /^([0-9]|0[0-9]|1[0-9]|2[0-3])[\-\/\:][0-5][0-9]$/,
		datetime: /^(\d{4,6})[\/\-](1[0-2]|0[1-9])[\/\-\:](0[1-9]|1[0-9]|2[0-9]|3[0-1])[T](([0-9]|0[0-9]|1[0-9]|2[0-3])[\-\/\:][0-5][0-9])$/,
		datetimezone: /^(\d{4,6})[\/\-](1[0-2]|0[1-9])[\/\-\:](0[1-9]|1[0-9]|2[0-9]|3[0-1])[T](([0-9]|0[0-9]|1[0-9]|2[0-3])[\-\/\:][0-5][0-9][\-\/\:\.][0-9]{3}[Z])$/,
		url: /^(ht|f)tp(s?)\:\/\/[\-\.\w]+[.][\w]+(\/?)([A-z0-9\-\.\?\,\:\'\/\\\+=\&%\$#_@]*)?$/,
		cleartextpattern: /^([A-z0-9\_\-\.\$@\?\,\:\'\/\!\s]|[^\u0000-\u007F])+$/
	}
};

export default validator;