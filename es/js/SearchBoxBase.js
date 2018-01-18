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

		_this.state = { searchText: props.text, isCollaspe: props.isCollaspe };
		_this.updateSearchItem = _this.updateSearchItem.bind(_this);
		_this.clearSearchItem = _this.clearSearchItem.bind(_this);
		_this.onSearchInput = _this.onSearchInput.bind(_this);
		_this.triggerSearchIconItem = _this.triggerSearchIconItem.bind(_this);
		return _this;
	}

	_createClass(SearchBoxBase, [{
		key: 'updateSearchItem',
		value: function updateSearchItem(searchText) {
			var _this2 = this;

			this.setState(function (state) {
				state.searchText = searchText;
				return state;
			}, function () {
				_this2.props.onChange && _this2.props.onChange(_this2.state.searchText);
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.text != this.state.text) {
				this.setState({ searchText: nextProps.text });
				//this.updateSearchItem(nextProps.text)
			}
		}
	}, {
		key: 'clearSearchItem',
		value: function clearSearchItem() {
			var _this3 = this;

			this.setState({ searchText: '' }, function () {
				_this3.props.onClickClearSeach && _this3.props.onClickClearSeach();
			});
		}
	}, {
		key: 'onSearchInput',
		value: function onSearchInput(ev) {
			this.updateSearchItem(ev.target.value);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {

			if (prevProps.isCollaspe !== this.props.isCollaspe && this.props.isCollaspe == false) {
				this.inputElementRef && this.inputElementRef.focus();
			}
		}
	}, {
		key: 'triggerSearchIconItem',
		value: function triggerSearchIconItem() {

			this.props.onClickSearch && this.props.onClickSearch(this.state.searchText);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    searchOn = _props.searchOn,
			    searchBoxStyle = _props.searchBoxStyle,
			    isCollaspe = _props.isCollaspe,
			    placeholder = _props.placeholder,
			    searchBoxCollaspeStyle = _props.searchBoxCollaspeStyle,
			    searchBoxFloatStyle = _props.searchBoxFloatStyle,
			    floatboxStyle = _props.floatboxStyle,
			    searchBoxInnerStyle = _props.searchBoxInnerStyle,
			    floatLabelOnSearchBox = _props.floatLabelOnSearchBox;

			var isFloatLabel = floatLabelOnSearchBox ? true : false;

			return React.createElement(
				'div',
				{ className: searchBoxStyle + ' ' + (isCollaspe ? searchBoxCollaspeStyle : '') + ' ' + (isFloatLabel ? searchBoxFloatStyle : '') },
				isFloatLabel ? React.createElement(
					'span',
					{ className: floatboxStyle },
					floatLabelOnSearchBox
				) : null,
				React.createElement(
					'div',
					{ className: searchBoxInnerStyle },
					React.Children.map(this.props.children, function (child, i) {
						if (child.props.typeName === 'InputBox') {
							var _React$cloneElement;

							return React.cloneElement(child, (_React$cloneElement = {}, _defineProperty(_React$cloneElement, searchOn, _this4.onSearchInput), _defineProperty(_React$cloneElement, 'value', _this4.state.searchText), _defineProperty(_React$cloneElement, 'placeholder', placeholder), _defineProperty(_React$cloneElement, 'getElementRef', function getElementRef(a) {
								_this4.inputElementRef = a;
							}), _React$cloneElement));
						} else if (child.props.typeName === 'SearchIcon') {

							return React.cloneElement(child, {
								onClick: _this4.triggerSearchIconItem,
								isSearching: _this4.state.searchText ? true : false
							});
						} else if (child.props.typeName === 'ClearIcon') {
							return React.cloneElement(child, {
								onClick: _this4.clearSearchItem,
								isSearching: _this4.state.searchText ? true : false
							});
						}
						return null;
					})
				)
			);
		}
	}]);

	return SearchBoxBase;
}(Component);

export default SearchBoxBase;


SearchBoxBase.defaultProps = {
	searchOn: 'onChange',
	isCollaspe: false
};

SearchBoxBase.propTypes = {
	searchBoxStyle: PropTypes.string,
	searchBoxInnerStyle: PropTypes.string,
	searchBoxCollaspeStyle: PropTypes.string,
	searchBoxFloatStyle: PropTypes.string,
	floatboxStyle: PropTypes.string,
	searchOn: PropTypes.string,
	placeholder: PropTypes.string,
	text: PropTypes.string,
	isCollaspe: PropTypes.bool,
	onChange: PropTypes.func,
	onClickClearSeach: PropTypes.func,
	onClickSearch: PropTypes.func
};