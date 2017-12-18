import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../index';

var Avatar__Default = function (_Component) {
	_inherits(Avatar__Default, _Component);

	function Avatar__Default() {
		_classCallCheck(this, Avatar__Default);

		return _possibleConstructorReturn(this, (Avatar__Default.__proto__ || _Object$getPrototypeOf(Avatar__Default)).apply(this, arguments));
	}

	_createClass(Avatar__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Avatar, { styleId: 'myavatar', type: 'picture', picture: 'https://my.com/img/mycom.png', name: 'hello', shape: 'square', size: 'small', borderSize: 'small_2' }),
				React.createElement(Avatar, { type: 'picture', picture: 'https://my.com/img/mycom.png', name: 'hello', shape: 'square-rounded', size: 'medium', borderSize: 'xlarge' }),
				React.createElement(Avatar, { styleId: 'myavatar', type: 'icon', iconId: 'checkIcon', name: 'hello', shape: 'round', size: 'xlarge', borderSize: 'medium' }),
				React.createElement(Avatar, { type: 'text', text: 'SK', color: 'red', bgColor: 'green', name: 'Sh Ka', shape: 'round', size: 'small_2', borderSize: 'none' })
			);
		}
	}]);

	return Avatar__Default;
}(Component);

export default Avatar__Default;


if (__DOCS__) {

	Avatar__Default.docs = {
		componentGroup: Avatar.docs.componentGroup
	};
}