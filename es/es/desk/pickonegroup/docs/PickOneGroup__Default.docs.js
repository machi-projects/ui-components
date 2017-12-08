import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PickOneGroup, PickOneItem } from '../../index';

var PickOneGroup__Default = function (_Component) {
	_inherits(PickOneGroup__Default, _Component);

	function PickOneGroup__Default() {
		_classCallCheck(this, PickOneGroup__Default);

		return _possibleConstructorReturn(this, (PickOneGroup__Default.__proto__ || _Object$getPrototypeOf(PickOneGroup__Default)).apply(this, arguments));
	}

	_createClass(PickOneGroup__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'b',
					null,
					' Pick one item in group of items + custom styles '
				),
				' ',
				React.createElement('br', null),
				' ',
				React.createElement('br', null),
				'Group 1 : ',
				React.createElement('br', null),
				React.createElement(
					PickOneGroup,
					{ selectedItem: 'red' },
					React.createElement(
						PickOneItem,
						{ pickId: 'red' },
						' red '
					),
					React.createElement(
						PickOneItem,
						{ pickId: 'green' },
						' green '
					),
					React.createElement(
						PickOneItem,
						{ pickId: 'yellow' },
						' yellow '
					)
				),
				React.createElement(
					PickOneGroup,
					{
						styleId: 'mypick',
						selectedItem: 'green',
						required: true,
						validation: {
							messages: {
								required: 'select at least one item'
							}
						},
						onFailValidation: function onFailValidation(a, b) {},
						onPassValidation: function onPassValidation(a, b) {}
					},
					React.createElement(
						PickOneItem,
						{ pickId: 'red' },
						' red '
					),
					React.createElement(
						PickOneItem,
						{ pickId: 'green' },
						' green '
					),
					React.createElement(
						PickOneItem,
						{ pickId: 'yellow' },
						' yellow '
					)
				)
			);
		}
	}]);

	return PickOneGroup__Default;
}(Component);

export default PickOneGroup__Default;


if (__DOCS__) {
	PickOneGroup__Default.docs = {
		componentGroup: PickOneGroup.docs.componentGroup
	};
}