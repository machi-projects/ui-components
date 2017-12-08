import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropDown } from '../index';

import { SearchBox } from '../../index';

var DropDown__Default = function (_Component) {
	_inherits(DropDown__Default, _Component);

	function DropDown__Default() {
		_classCallCheck(this, DropDown__Default);

		return _possibleConstructorReturn(this, (DropDown__Default.__proto__ || _Object$getPrototypeOf(DropDown__Default)).apply(this, arguments));
	}

	_createClass(DropDown__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					DropDown,
					{ selectedItem: 'D' },
					React.createElement(DropDownSelection, {
						showOnSelection: function showOnSelection(selectedItem) {
							return 'sdasd';
						}
					}),
					React.createElement(SearchBox, { styleId: 'mysearch', viewOrder: ['textbox', 'searchIcon'] }),
					React.createElement(
						DropDownItems,
						null,
						React.createElement(
							DropDownItem,
							{ value: 'A' },
							' Apple '
						),
						React.createElement(
							DropDownItem,
							{ value: 'B' },
							' Banana '
						),
						React.createElement(
							DropDownItem,
							{ value: 'C' },
							' Car '
						),
						React.createElement(
							DropDownItem,
							{ value: 'D' },
							' Dog '
						),
						React.createElement(
							DropDownItem,
							{ value: 'E' },
							' Earned '
						),
						React.createElement(
							DropDownItem,
							{ value: 'G' },
							' sfff '
						)
					)
				)
			);
		}
	}]);

	return DropDown__Default;
}(Component);

export default DropDown__Default;


if (__DOCS__) {
	DropDown__Default.docs = {
		componentGroup: DropDown.docs.componentGroup
	};
}