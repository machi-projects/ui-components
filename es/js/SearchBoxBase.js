import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var SearchBoxBase = function (_Component) {
	_inherits(SearchBoxBase, _Component);

	function SearchBoxBase(props) {
		_classCallCheck(this, SearchBoxBase);

		var _this = _possibleConstructorReturn(this, (SearchBoxBase.__proto__ || _Object$getPrototypeOf(SearchBoxBase)).call(this, props));

		_this.state = { searchText: props.text };
		_this.updateSearchItem = _this.updateSearchItem.bind(_this);
		_this.clearSearchItem = _this.clearSearchItem.bind(_this);
		_this.onSearchInput = _this.onSearchInput.bind(_this);
		_this.triggerSearchItem = _this.triggerSearchItem.bind(_this);
		return _this;
	}

	_createClass(SearchBoxBase, [{
		key: 'componentWillReciverProps',
		value: function componentWillReciverProps(prevProps) {
			//onSearchItem( trigger );
		}
	}, {
		key: 'updateSearchItem',
		value: function updateSearchItem(searchText) {
			var _this2 = this;

			this.setState(function (state) {
				state.searchText = searchText;
			}, function () {
				_this2.triggerSearchItem();
			});
		}
	}, {
		key: 'clearSearchItem',
		value: function clearSearchItem() {
			this.updateSearchItem('');
		}
	}, {
		key: 'onSearchInput',
		value: function onSearchInput(ev) {
			this.updateSearchItem(ev.target.value);
		}
	}, {
		key: 'triggerSearchItem',
		value: function triggerSearchItem() {
			this.props.onChange && this.props.onChange(this.state.searchText);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    searchOn = _props.searchOn,
			    searchBoxStyle = _props.searchBoxStyle;

			return React.createElement(
				'div',
				{ className: searchBoxStyle },
				React.Children.map(this.props.children, function (child, i) {
					if (child.type.name === 'InputBox') {
						var _React$cloneElement;

						return React.cloneElement(child, (_React$cloneElement = {}, _defineProperty(_React$cloneElement, searchOn, _this3.onSearchInput), _defineProperty(_React$cloneElement, 'value', _this3.state.searchText), _React$cloneElement));
					} else if (child.type.name === 'SearchIcon') {
						return React.cloneElement(child, {
							onClick: _this3.triggerSearchItem
						});
					} else if (child.type.name === 'ClearIcon') {
						return _this3.state.searchText ? React.cloneElement(child, {
							onClick: _this3.clearSearchItem
						}) : null;
					}
					return null;
				})
			);
		}
	}]);

	return SearchBoxBase;
}(Component);

export default SearchBoxBase;


SearchBoxBase.defaultProps = {
	searchOn: 'onChange'
};

SearchBoxBase.propTypes = {
	searchBoxStyle: PropTypes.string,
	searchOn: PropTypes.string,
	text: PropTypes.string,
	onChange: PropTypes.func
};