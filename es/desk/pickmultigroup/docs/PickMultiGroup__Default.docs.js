import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PickMultiGroup, PickItem } from '../index';

var PickMultiGroup__Default = function (_Component) {
	_inherits(PickMultiGroup__Default, _Component);

	function PickMultiGroup__Default() {
		_classCallCheck(this, PickMultiGroup__Default);

		return _possibleConstructorReturn(this, (PickMultiGroup__Default.__proto__ || _Object$getPrototypeOf(PickMultiGroup__Default)).apply(this, arguments));
	}

	_createClass(PickMultiGroup__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'b',
					null,
					' Pick multi item in group of items + custom styles '
				),
				' ',
				React.createElement('br', null),
				' ',
				React.createElement('br', null),
				'Group 1 : ',
				React.createElement('br', null),
				React.createElement(
					PickMultiGroup,
					{ selectedItems: ['red'] },
					React.createElement(
						PickItem,
						{ pickId: 'red' },
						' red '
					),
					React.createElement(
						PickItem,
						{ pickId: 'green' },
						' green '
					),
					React.createElement(
						PickItem,
						{ pickId: 'yellow' },
						' yellow '
					)
				),
				React.createElement(
					PickMultiGroup,
					{
						styleId: 'mypick',
						required: true,
						selectedItems: ['green'],
						validation: {
							rules: {
								maxLengthX: function maxLengthX(val, el) {
									return val.length < 3;
								}
							},
							rulesOrder: ['required', 'maxLengthX'],
							messages: {
								required: 'select at least one item',
								maxLengthX: 'at least two item'
							}
						},
						onFailValidation: function onFailValidation(a, b) {},
						onPassValidation: function onPassValidation(a, b) {}
					},
					React.createElement(
						PickItem,
						{ pickId: 'red' },
						' red '
					),
					React.createElement(
						PickItem,
						{ pickId: 'green' },
						' green '
					),
					React.createElement(
						PickItem,
						{ pickId: 'yellow' },
						' yellow '
					),
					React.createElement(
						PickItem,
						{ pickId: 'blue' },
						' Blue '
					),
					React.createElement(
						PickItem,
						{ pickId: 'white' },
						' white '
					)
				)
			);
		}
	}]);

	return PickMultiGroup__Default;
}(Component);

export default PickMultiGroup__Default;


if (__DOCS__) {
	PickMultiGroup__Default.docs = {
		componentGroup: PickMultiGroup.docs.componentGroup
	};
}