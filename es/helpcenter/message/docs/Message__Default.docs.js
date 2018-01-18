import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from '../index';

var Message__Default = function (_Component) {
	_inherits(Message__Default, _Component);

	function Message__Default() {
		_classCallCheck(this, Message__Default);

		return _possibleConstructorReturn(this, (Message__Default.__proto__ || _Object$getPrototypeOf(Message__Default)).apply(this, arguments));
	}

	_createClass(Message__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					Message,
					{ styleId: 'mytext' },
					'  text  ="helolasd s ds d s dasd"  '
				),
				React.createElement(
					Message,
					{ raised: true },
					' This is my figure '
				)
			);
		}
	}]);

	return Message__Default;
}(Component);

export default Message__Default;


if (__DOCS__) {

	Message__Default.docs = {
		componentGroup: Message.docs.componentGroup
	};
}