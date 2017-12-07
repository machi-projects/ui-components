import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import documentEventSytem from '../utils/documentEventSystem';
//import windowEventSystem from '../utils/windowEventSystem';

var GlobalEventsLayerBase = function (_Component) {
	_inherits(GlobalEventsLayerBase, _Component);

	function GlobalEventsLayerBase() {
		_classCallCheck(this, GlobalEventsLayerBase);

		return _possibleConstructorReturn(this, (GlobalEventsLayerBase.__proto__ || _Object$getPrototypeOf(GlobalEventsLayerBase)).apply(this, arguments));
	}

	_createClass(GlobalEventsLayerBase, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.click) {
				documentEventSytem.subscription('click', this.props.click);
			}

			if (this.props.keyup) {
				documentEventSytem.subscription('keyup', this.props.keyup);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.click) {
				documentEventSytem.unSubscription('click', this.props.click);
			}

			if (this.props.keyup) {
				documentEventSytem.unSubscription('keyup', this.props.keyup);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return GlobalEventsLayerBase;
}(Component);

export default GlobalEventsLayerBase;