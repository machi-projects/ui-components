"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalEventsUtil = function () {
	function GlobalEventsUtil(globalElement) {
		_classCallCheck(this, GlobalEventsUtil);

		this.globalElement = globalElement;
		this.eventsList = {};
	}

	_createClass(GlobalEventsUtil, [{
		key: "subscription",
		value: function subscription(eventName, func) {
			if (!func || !eventName) {
				return;
			}

			if (!this.eventsList[eventName]) {
				this.bindEvents(eventName);
			}
			this.eventsList[eventName] = (this.eventsList[eventName] || []).push(func);
		}
	}, {
		key: "unSubscription",
		value: function unSubscription(eventName, func) {
			var eventObj = this.eventsList[eventName];
			if (eventObj && eventObj.length > 0) {
				var evIndex = eventObj.index(func);
				if (evIndex !== -1) {
					eventObj.splice(evIndex, 1);
				}
			}
			removeEvents(eventName);
		}
	}, {
		key: "handleEvent",
		value: function handleEvent(ev) {
			var eventObj = this.eventsList[ev.type];
			if (eventObj && eventObj.length > 0) {
				var lastFunc = eventObj[eventObj.length - 1];
				lastFunc && lastFunc(ev);
			}
		}
	}, {
		key: "bindEvents",
		value: function bindEvents(eventName) {
			this.globalElement.addEventListener(keys[i], this.handleEvent, false);
		}
	}, {
		key: "removeEvents",
		value: function removeEvents(eventName) {
			var eventObj = this.eventsList[eventName];
			if (eventObj && eventObj.length == 0) {
				this.globalElement.removeEventListener(eventName, this.handleEvent);
			}
		}
	}]);

	return GlobalEventsUtil;
}();

exports.default = function (globalElement) {
	var globalEventObj = new GlobalEventsUtil(globalElement);

	return {
		subscription: globalEventObj.subscription,
		unSubscription: globalEventObj.unSubscription
	};
};