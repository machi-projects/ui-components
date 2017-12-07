import React, { Component } from 'react';
import documentEventSytem from '../utils/documentEventSystem';
//import windowEventSystem from '../utils/windowEventSystem';

export default class GlobalEventsLayerBase extends Component {
	componentDidMount() {
		if (this.props.click) {
			documentEventSytem.subscription('click', this.props.click);
		}

		if (this.props.keyup) {
			documentEventSytem.subscription('keyup', this.props.keyup);
		}
	}

	componentWillUnmount() {
		if (this.props.click) {
			documentEventSytem.unSubscription('click', this.props.click);
		}

		if (this.props.keyup) {
			documentEventSytem.unSubscription('keyup', this.props.keyup);
		}
	}

	render() {
		return null;
	}
}
