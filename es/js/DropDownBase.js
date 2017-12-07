import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _DropDownBase$propTyp;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlobalEventLayerBase from './GlobalEventsLayerBase';
import PickOneGroupBase, { PickOneItemBase } from '../core/PickOneGroupBase';
import contains from '../utils/dom/contains';

var DropDownItemsBase = function (_Component) {
	_inherits(DropDownItemsBase, _Component);

	function DropDownItemsBase(props) {
		_classCallCheck(this, DropDownItemsBase);

		return _possibleConstructorReturn(this, (DropDownItemsBase.__proto__ || _Object$getPrototypeOf(DropDownItemsBase)).call(this, props));
	}

	_createClass(DropDownItemsBase, [{
		key: 'filterChildrenList',
		value: function filterChildrenList(childrenList, props) {
			var searchText = props.searchText,
			    searchTextMinLength = props.searchTextMinLength,
			    searchMatch = props.searchMatch,
			    searchResultsOnQuery = props.searchResultsOnQuery,
			    searchResultsCount = props.searchResultsCount;

			if (searchText && searchText.length >= searchTextMinLength) {
				var searchChildrenList = React.Children.map(childrenList, function (child, i) {
					if (searchMatch !== null) {
						if (props.searchMatch(searchText, child.props.searchText)) {
							return child;
						}
					} else if (child.props.searchText != null) {
						if (child.props.searchText.indexOf(searchText) !== -1) {
							return child;
						}
					} else if (child.props.value.indexOf(searchText) !== -1) {
						return child;
					}
				});

				return searchChildrenList.slice(0, searchResultsCount ? searchResultsCount : searchChildrenList.length);
			}

			return childrenList;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    dropDownItemsStyle = _props.dropDownItemsStyle,
			    styles = _props.styles,
			    selectedItem = _props.selectedItem,
			    onSelect = _props.onSelect,
			    messages = _props.messages,
			    required = _props.required,
			    validation = _props.validation,
			    onPassValidation = _props.onPassValidation,
			    onFailValidation = _props.onFailValidation;

			var allStyles = { styles: styles };

			var childrenList = filterChildrenList(this.props.children, this.props);
			var searchResultNotFound = this.props.searchText && childrenList.length < 0;
			var message = null;
			if (searchResultNotFound) {
				message = messages.searchOnEmpty ? messages.searchOnEmpty(this.props.searchText) : null;
			} else if (this.props.searching) {
				message = messages.onSearching ? messages.onSearching() : null;
			} else if (this.props.initialLoading) {
				message = messages.initialLoading ? messages.initialLoading() : null;
			} else if (this.props.loaded) {
				message = messages.loaded ? messages.loaded() : null;
			}
			message && message.type.name == 'Message' ? message : null;

			return React.createElement(
				'div',
				{ className: dropDownItemsStyle },
				childrenList && childrenList.length > 0 ? React.createElement(
					PickOneGroupBase,
					_extends({
						required: required,
						validation: validation,
						onPassValidation: onPassValidation,
						onFailValidation: onFailValidation
					}, allStyles, {
						selectedItem: selectedItem,
						onSelect: onSelect
					}),
					childrenList.map(function (child, i) {
						return React.createElement(
							PickOneItemBase,
							{ key: i, pickId: child.props.value },
							child.props.children
						);
					})
				) : message ? message : 'No Results Found'
			);
		}
	}]);

	return DropDownItemsBase;
}(Component);

DropDownItemsBase.defaultProps = {
	styles: {},
	searchTextMinLength: 1
};

DropDownItemsBase.propTypes = {
	dropDownItemsStyle: PropTypes.string,
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),

	required: PropTypes.bool,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.oneOf(['onClick']),
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemBase']) }))])
};

//highlightSearchItems -- will be coming soon...

var DropDownItemBase = function (_Component2) {
	_inherits(DropDownItemBase, _Component2);

	function DropDownItemBase() {
		_classCallCheck(this, DropDownItemBase);

		return _possibleConstructorReturn(this, (DropDownItemBase.__proto__ || _Object$getPrototypeOf(DropDownItemBase)).apply(this, arguments));
	}

	_createClass(DropDownItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return DropDownItemBase;
}(Component);

DropDownItemBase.propTypes = {
	value: PropTypes.string,
	searchText: PropTypes.string
};

var DropDownBase = function (_Component3) {
	_inherits(DropDownBase, _Component3);

	function DropDownBase(props) {
		_classCallCheck(this, DropDownBase);

		var _this3 = _possibleConstructorReturn(this, (DropDownBase.__proto__ || _Object$getPrototypeOf(DropDownBase)).call(this, props));

		_this3.state = {
			onOpen: props.isOpen || false,
			searchText: props.searchText || ''
		};

		_this3.toggleItem = _this3.toggleItem.bind(_this3);
		_this3.onSearchItem = _this3.onSearchItem.bind(_this3);
		_this3.setRef = _this3.setRef.bind(_this3);
		return _this3;
	}

	_createClass(DropDownBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'toggleItem',
		value: function toggleItem(close) {
			var _this4 = this;

			this.setState(function (state) {
				state.isOpen = close == 'close' || !state.isOpen;
			}, function () {
				if (_this4.state.isOpen) {
					_this4.props.onOpen && _this4.props.onOpen();
				} else {
					_this4.props.onClose && _this4.props.onClose();
				}
			});
		}
	}, {
		key: 'onSearchItem',
		value: function onSearchItem(text) {
			var _this5 = this;

			this.setState(function (state) {
				state.searchText = text;
			}, function () {
				_this5.props.onSearch && _this5.props.onSearch();
			});
		}
	}, {
		key: 'onSelectItem',
		value: function onSelectItem(item, target) {
			var _this6 = this;

			this.setState(function (state) {
				state.selectedItem = item;
				state.displayText = target.innerText;
			}, function () {
				toggleItem();
				_this6.props.onSelect && _this6.props.onSelect(_this6.props.groupName, _this6.state.selectedItem, target);
			});
		}
	}, {
		key: 'onClickDropDown',
		value: function onClickDropDown() {}
	}, {
		key: 'isNotDropDownElement',
		value: function isNotDropDownElement(ev) {
			return;
		}
	}, {
		key: 'onEscapeOutSide',
		value: function onEscapeOutSide(ev) {
			if (ev.keyCode == 27) {
				toggleItem(true);
			}
		}
	}, {
		key: 'onClickOutSide',
		value: function onClickOutSide(ev) {
			if (!contains(this.elementRef, ev.currentTarget) || this.elementRef !== ev.currentTarget) {
				toggleItem(true);
			}
		}
	}, {
		key: 'onKeyUpDropDown',
		value: function onKeyUpDropDown() {
			// adjument drop down items
		}
	}, {
		key: 'render',
		value: function render() {
			var _this7 = this;

			var _props2 = this.props,
			    dropDownStyle = _props2.dropDownStyle,
			    selectedItem = _props2.selectedItem,
			    validation = _props2.validation,
			    groupName = _props2.groupName,
			    required = _props2.required,
			    onPassValidation = _props2.onPassValidation,
			    onFailValidation = _props2.onFailValidation,
			    messages = _props2.messages,
			    searchResultsOnQuery = _props2.searchResultsOnQuery,
			    searchMatch = _props2.searchMatch,
			    searchResultCount = _props2.searchResultCount,
			    searchTextMinLength = _props2.searchTextMinLength,
			    enableSearchOnItemsCount = _props2.enableSearchOnItemsCount;


			return React.createElement(
				'div',
				{ className: dropDownStyle, ref: this.setRef, tabIndex: '-1' },
				React.Children.map(this.props.children, function (child, i) {
					if (child.type.name === 'SelectionBox') {
						return React.cloneElement(child, {
							onClick: _this7.toggleItem,
							isDropOpen: _this7.state.isOpen
						}, _this7.state.selectedItem ? child.props.onselection ? child.props.onselection(_this7.state.selectedItem) : _this7.state.displayText : child.props.children);
					} else if (child.type.name === 'SearchBox') {
						return enableSearchOnItemsCount > 0 ? React.cloneElement(child, {
							onChange: _this7.onSearchItem,
							text: _this7.state.searchText
						}) : null;
					} else if (child.type.name === 'DropDownItemsBase') {
						return _this7.state.isOpen ? React.cloneElement(child, {
							searchText: _this7.state.searchText,

							searchTextMinLength: searchTextMinLength,
							searchResultsCount: searchResultCount,
							searchMatch: searchMatch,
							searchResultsOnQuery: searchResultsOnQuery,
							messages: messages,

							onSelect: _this7.onSelectItem,
							selectedItem: selectedItem,
							validation: validation,
							required: required,
							onPassValidation: onPassValidation,
							onFailValidation: onFailValidation
						}) : null;
					}
					return null;
				}),
				React.createElement(GlobalEventsLayerBase, { keyup: this.onEscapeOutSide, click: this.onClickOutSide })
			);
		}
	}]);

	return DropDownBase;
}(Component);

export default DropDownBase;


DropDownBase.propTypes = (_DropDownBase$propTyp = {
	dropDownStyle: PropTypes.string,
	selectedItem: PropTypes.func,

	searchText: PropTypes.string,
	searchResultsOnQuery: PropTypes.func,
	searchTextMinLength: PropTypes.number,
	searchResultsCount: PropTypes.number,
	searchMatch: PropTypes.func,
	enableSearchOnItemsCount: PropTypes.number,

	messages: PropTypes.shape({
		searchOnEmpty: PropTypes.func
	}),

	required: PropTypes.bool,
	groupName: PropTypes.string
}, _defineProperty(_DropDownBase$propTyp, 'selectedItem', PropTypes.string), _defineProperty(_DropDownBase$propTyp, 'onSelect', PropTypes.func), _defineProperty(_DropDownBase$propTyp, 'onOpen', PropTypes.func), _defineProperty(_DropDownBase$propTyp, 'onClose', PropTypes.func), _defineProperty(_DropDownBase$propTyp, 'validation', PropTypes.shape({
	validate: PropTypes.bool,
	validateOn: PropTypes.oneOf(['onClick']),
	rulesOrder: PropTypes.arrayOf(PropTypes.string),
	rules: PropTypes.object,
	messages: PropTypes.object
})), _defineProperty(_DropDownBase$propTyp, 'onPassValidation', PropTypes.func), _defineProperty(_DropDownBase$propTyp, 'onFailValidation', PropTypes.func), _defineProperty(_DropDownBase$propTyp, 'children', PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemsBase', 'SearchBox', 'SelectionBox']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['DropDownItemsBase', 'SearchBox', 'SelectionBox']) }))])), _DropDownBase$propTyp);

//
// <DropDownBase selectedItem={} minimumResultsForSearch={0} searchLogic={} highlightSearchItems={} searchText="hhsh" searchComponent={} labelComponent={}  >
//
//   <div>  { labelComponent -- onClick --> this.state.isOpen }</div>
//
//   <div onUpArrow onDownArrow onRightArrow onLeftArrow >
//       <div> { searchComponent -- onSearch--> this.setState.searchText } <div>
//
//       {React.child.map( this.props.children ,(child , i )=>{
//
//           let renderChild = null;
//           if( this.state.searchText ){
//
//             if( this.props.searchLogic !== null ){
//               if( this.props.searchLogic( this.state.searchText , child.props.searchText ) ){
//                   renderChild =  child;
//               }
//             }
//             else if( child.props.searchText.indexOf(this.state.searchText) != -1 ){
//                 renderChild =  child;
//             }
//
//             if( this.props.highlightSearchItems ){
//                   renderChild = React.cloneElement(child,{},highlightSearchItems( React.only( child.children ) , text )) ;
//             }
//
//           }
//
//             if( selectedItem ){
//
//             }
//           return <div className={itemStyle} > renderChild </div>
//
//
//       } )}
//
//         <DropDownItem value=""  searchText="" >{ content }</DropDownItem>
//
//         <DropDownItem value=""  searchText="" >{ content }</DropDownItem>
//
//         <DropDownItem value=""  searchText="" >{ content }</DropDownItem>
//     </div>
//     <Freezelaer of the year onClick={}  onEscape onUpArrow onDownArrow onRightArrow onLeftArrow  />
// </DropDownBase>
//
//
// <searchComponent onSearch={ text } />
//
//
// Gdfult = obalalla(DropDownBase,{
// 		keyup : ()=>{}
// 		click : ()=>{}
// 		mousedown : ()=>{
// 			DropDownBase.this
// 		}
// })
//
// DropDownLabelBase;
//
// DropDownSearchBoxBase;
//
// DropDownBase;
//
// DropDownItems;