import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from '../index';

var SearchBox__Default = function (_Component) {
	_inherits(SearchBox__Default, _Component);

	function SearchBox__Default() {
		_classCallCheck(this, SearchBox__Default);

		return _possibleConstructorReturn(this, (SearchBox__Default.__proto__ || _Object$getPrototypeOf(SearchBox__Default)).apply(this, arguments));
	}

	_createClass(SearchBox__Default, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'b',
					null,
					' SearchBox + custom styles '
				),
				' ',
				React.createElement('br', null),
				' ',
				React.createElement('br', null),
				React.createElement(SearchBox, { viewOrder: ['textbox', 'searchIcon', 'clearIcon'] })
			);
		}
	}]);

	return SearchBox__Default;
}(Component);

export default SearchBox__Default;


if (__DOCS__) {
	SearchBox__Default.docs = {
		componentGroup: SearchBox.docs.componentGroup
	};
}

// <SearchBox
// 	styleId="mysearch"
// 	onChange={text => {
// 		console.log(text);
// 	}}
// 	searchOn="onBlur"
// />
// <SearchBox viewOrder={['searchIcon', 'textbox', 'clearIcon']} />
// <SearchBox viewOrder={['searchIcon', 'textbox']} />
// <SearchBox viewOrder={['textbox', 'searchIcon']} />
// <SearchBox viewOrder={['textbox']} />