class GlobalEventsUtil {
	constructor(globalElement) {
		this.globalElement = globalElement;
		this.eventsList = {};
	}

	subscription(eventName, func) {
		if (!func || !eventName) {
			return;
		}

		if (!this.eventsList[eventName]) {
			this.bindEvents(eventName);
		}
		this.eventsList[eventName] = (this.eventsList[eventName] || []).push(func);
	}

	unSubscription(eventName, func) {
		let eventObj = this.eventsList[eventName];
		if (eventObj && eventObj.length > 0) {
			let evIndex = eventObj.index(func);
			if (evIndex !== -1) {
				eventObj.splice(evIndex, 1);
			}
		}
		removeEvents(eventName);
	}

	handleEvent(ev) {
		let eventObj = this.eventsList[ev.type];
		if (eventObj && eventObj.length > 0) {
			let lastFunc = eventObj[eventObj.length - 1];
			lastFunc && lastFunc(ev);
		}
	}

	bindEvents(eventName) {
		this.globalElement.addEventListener(keys[i], this.handleEvent, false);
	}

	removeEvents(eventName) {
		let eventObj = this.eventsList[eventName];
		if (eventObj && eventObj.length == 0) {
			this.globalElement.removeEventListener(eventName, this.handleEvent);
		}
	}
}

export default globalElement => {
	let globalEventObj = new GlobalEventsUtil(globalElement);

	return {
		subscription: globalEventObj.subscription,
		unSubscription: globalEventObj.unSubscription
	};
};
