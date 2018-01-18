import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PlainText } from '../index';

var PlainText__Default = function (_Component) {
	_inherits(PlainText__Default, _Component);

	function PlainText__Default() {
		_classCallCheck(this, PlainText__Default);

		return _possibleConstructorReturn(this, (PlainText__Default.__proto__ || _Object$getPrototypeOf(PlainText__Default)).apply(this, arguments));
	}

	_createClass(PlainText__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(PlainText, { styleId: 'mytext', text: 'helolasd s ds d s dasd' }),
				React.createElement(
					PlainText,
					{ raised: true },
					' This is my figure '
				)
			);
		}
	}]);

	return PlainText__Default;
}(Component);

export default PlainText__Default;


if (__DOCS__) {

	PlainText__Default.docs = {
		componentGroup: PlainText.docs.componentGroup
	};
}