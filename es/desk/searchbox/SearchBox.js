import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBoxBase from '../../js/SearchBoxBase';
import { InputText } from '../index';
import { Icon } from '../index';

import styles from './searchbox.css';
import styleMapping from './styleMapping';
import { omit } from '../../utils/objectUtils';

var InputBox = function (_React$Component) {
	_inherits(InputBox, _React$Component);

	function InputBox() {
		_classCallCheck(this, InputBox);

		return _possibleConstructorReturn(this, (InputBox.__proto__ || _Object$getPrototypeOf(InputBox)).apply(this, arguments));
	}

	_createClass(InputBox, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    textboxStyle = _props.textboxStyle,
			    inputStyleId = _props.inputStyleId,
			    placeholder = _props.placeholder;

			var newProps = omit(this.props, ['textboxStyle', 'inputStyleId']);

			return React.createElement(
				'div',
				{ className: textboxStyle },
				React.createElement(InputText, _extends({ type: 'text', styleId: inputStyleId, placeholder: placeholder }, newProps))
			);
		}
	}]);

	return InputBox;
}(React.Component);

var SearchIcon = function (_React$Component2) {
	_inherits(SearchIcon, _React$Component2);

	function SearchIcon() {
		_classCallCheck(this, SearchIcon);

		return _possibleConstructorReturn(this, (SearchIcon.__proto__ || _Object$getPrototypeOf(SearchIcon)).apply(this, arguments));
	}

	_createClass(SearchIcon, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    onClick = _props2.onClick,
			    iconstyle = _props2.iconstyle,
			    iconInfo = _props2.iconInfo;

			return React.createElement(
				'div',
				{ className: iconstyle, onClick: onClick },
				React.createElement(Icon, { styleId: iconInfo.styleId, id: iconInfo.id })
			);
		}
	}]);

	return SearchIcon;
}(React.Component);

var ClearIcon = function (_SearchIcon) {
	_inherits(ClearIcon, _SearchIcon);

	function ClearIcon() {
		_classCallCheck(this, ClearIcon);

		return _possibleConstructorReturn(this, (ClearIcon.__proto__ || _Object$getPrototypeOf(ClearIcon)).apply(this, arguments));
	}

	return ClearIcon;
}(SearchIcon);

var SearchBox = function (_React$Component3) {
	_inherits(SearchBox, _React$Component3);

	function SearchBox() {
		_classCallCheck(this, SearchBox);

		return _possibleConstructorReturn(this, (SearchBox.__proto__ || _Object$getPrototypeOf(SearchBox)).apply(this, arguments));
	}

	_createClass(SearchBox, [{
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    styleId = _props3.styleId,
			    text = _props3.text,
			    placeholder = _props3.placeholder,
			    viewOrder = _props3.viewOrder,
			    searchOn = _props3.searchOn,
			    onChange = _props3.onChange;


			var styleMappings = styleMapping[styleId];
			var _styleMappings$search = styleMappings.searchIcon,
			    searchIcon = _styleMappings$search === undefined ? {} : _styleMappings$search,
			    _styleMappings$clearI = styleMappings.clearIcon,
			    clearIcon = _styleMappings$clearI === undefined ? {} : _styleMappings$clearI,
			    inputStyleId = styleMappings.inputStyleId;


			var searchBoxStyle = styles[styleId];

			var searchiconStyle = styles['searchicon'];
			var textboxStyle = styles['textbox'];
			var cleariconStyle = styles['clearicon'];

			return React.createElement(
				SearchBoxBase,
				{ searchBoxStyle: searchBoxStyle, text: text, searchOn: searchOn, onChange: onChange },
				viewOrder.map(function (item, i) {
					if (item == 'textbox') {
						return React.createElement(InputBox, { textboxStyle: textboxStyle, inputStyleId: inputStyleId, key: i });
					} else if (item == 'searchIcon') {
						return React.createElement(SearchIcon, { iconstyle: searchiconStyle, iconInfo: searchIcon, key: i });
					} else if (item == 'clearIcon') {
						return React.createElement(ClearIcon, { iconstyle: cleariconStyle, iconInfo: clearIcon, key: i });
					}
					return null;
				})
			);
		}
	}]);

	return SearchBox;
}(React.Component);

export default SearchBox;


SearchBox.defaultProps = {
	styleId: 'default',
	viewOrder: ['textbox', 'searchIcon']
};

SearchBox.propTypes = {
	styleId: PropTypes.string,

	viewOrder: PropTypes.arrayOf(PropTypes.oneOf(['textbox', 'searchIcon', 'clearIcon'])),
	text: PropTypes.string,
	placeholder: PropTypes.string,

	searchOn: PropTypes.string,
	onChange: PropTypes.func
};

if (__DOCS__) {
	SearchBox.docs = {
		componentGroup: 'Atom'
	};
}