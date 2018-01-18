import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FreezeLayer from '../FreezeLayer';

var FreezeLayer__Default = function (_Component) {
	_inherits(FreezeLayer__Default, _Component);

	function FreezeLayer__Default() {
		_classCallCheck(this, FreezeLayer__Default);

		return _possibleConstructorReturn(this, (FreezeLayer__Default.__proto__ || _Object$getPrototypeOf(FreezeLayer__Default)).apply(this, arguments));
	}

	_createClass(FreezeLayer__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(FreezeLayer, {
					zIndexLevel: 'max_level_2',
					onClick: function onClick(ev) {
						console.log(' default ', 'onClicked ');
					},
					onEscKeyUp: function onEscKeyUp(ev) {
						console.log(' default ', ev.keyCode);
					}
				}),
				React.createElement(FreezeLayer, {
					styleId: 'myfreeze',
					zIndexLevel: 'max_level_1',
					onClick: function onClick(ev) {
						console.log(' myfreeze ', 'onClicked ');
					},
					onEscKeyUp: function onEscKeyUp(ev) {
						console.log(' myfreeze ', ev.keyCode);
					}
				})
			);
		}
	}]);

	return FreezeLayer__Default;
}(Component);

export default FreezeLayer__Default;


if (__DOCS__) {
	FreezeLayer__Default.docs = {
		componentGroup: FreezeLayer.docs.componentGroup
	};
}