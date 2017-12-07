'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DropDownBase$propTyp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GlobalEventsLayerBase = require('./GlobalEventsLayerBase');

var _GlobalEventsLayerBase2 = _interopRequireDefault(_GlobalEventsLayerBase);

var _PickOneGroupBase = require('../core/PickOneGroupBase');

var _PickOneGroupBase2 = _interopRequireDefault(_PickOneGroupBase);

var _contains = require('../utils/dom/contains');

var _contains2 = _interopRequireDefault(_contains);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDownItemsBase = function (_Component) {
	_inherits(DropDownItemsBase, _Component);

	function DropDownItemsBase(props) {
		_classCallCheck(this, DropDownItemsBase);

		return _possibleConstructorReturn(this, (DropDownItemsBase.__proto__ || Object.getPrototypeOf(DropDownItemsBase)).call(this, props));
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
				var searchChildrenList = _react2.default.Children.map(childrenList, function (child, i) {
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

			return _react2.default.createElement(
				'div',
				{ className: dropDownItemsStyle },
				childrenList && childrenList.length > 0 ? _react2.default.createElement(
					_PickOneGroupBase2.default,
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
						return _react2.default.createElement(
							_PickOneGroupBase.PickOneItemBase,
							{ key: i, pickId: child.props.value },
							child.props.children
						);
					})
				) : message ? message : 'No Results Found'
			);
		}
	}]);

	return DropDownItemsBase;
}(_react.Component);

DropDownItemsBase.defaultProps = {
	styles: {},
	searchTextMinLength: 1
};

DropDownItemsBase.propTypes = {
	dropDownItemsStyle: _propTypes2.default.string,
	styles: _propTypes2.default.shape({
		group: _propTypes2.default.string,
		item: _propTypes2.default.string,
		active: _propTypes2.default.string
	}),

	required: _propTypes2.default.bool,
	selectedItem: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,

	validation: _propTypes2.default.shape({
		validate: _propTypes2.default.bool,
		validateOn: _propTypes2.default.oneOf(['onClick']),
		rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
		rules: _propTypes2.default.object,
		messages: _propTypes2.default.object
	}),

	onPassValidation: _propTypes2.default.func,
	onFailValidation: _propTypes2.default.func,

	children: _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['DropDownItemBase']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['DropDownItemBase']) }))])
};

//highlightSearchItems -- will be coming soon...

var DropDownItemBase = function (_Component2) {
	_inherits(DropDownItemBase, _Component2);

	function DropDownItemBase() {
		_classCallCheck(this, DropDownItemBase);

		return _possibleConstructorReturn(this, (DropDownItemBase.__proto__ || Object.getPrototypeOf(DropDownItemBase)).apply(this, arguments));
	}

	_createClass(DropDownItemBase, [{
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return DropDownItemBase;
}(_react.Component);

DropDownItemBase.propTypes = {
	value: _propTypes2.default.string,
	searchText: _propTypes2.default.string
};

var DropDownBase = function (_Component3) {
	_inherits(DropDownBase, _Component3);

	function DropDownBase(props) {
		_classCallCheck(this, DropDownBase);

		var _this3 = _possibleConstructorReturn(this, (DropDownBase.__proto__ || Object.getPrototypeOf(DropDownBase)).call(this, props));

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
			if (!(0, _contains2.default)(this.elementRef, ev.currentTarget) || this.elementRef !== ev.currentTarget) {
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


			return _react2.default.createElement(
				'div',
				{ className: dropDownStyle, ref: this.setRef, tabIndex: '-1' },
				_react2.default.Children.map(this.props.children, function (child, i) {
					if (child.type.name === 'SelectionBox') {
						return _react2.default.cloneElement(child, {
							onClick: _this7.toggleItem,
							isDropOpen: _this7.state.isOpen
						}, _this7.state.selectedItem ? child.props.onselection ? child.props.onselection(_this7.state.selectedItem) : _this7.state.displayText : child.props.children);
					} else if (child.type.name === 'SearchBox') {
						return enableSearchOnItemsCount > 0 ? _react2.default.cloneElement(child, {
							onChange: _this7.onSearchItem,
							text: _this7.state.searchText
						}) : null;
					} else if (child.type.name === 'DropDownItemsBase') {
						return _this7.state.isOpen ? _react2.default.cloneElement(child, {
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
				_react2.default.createElement(GlobalEventsLayerBase, { keyup: this.onEscapeOutSide, click: this.onClickOutSide })
			);
		}
	}]);

	return DropDownBase;
}(_react.Component);

exports.default = DropDownBase;


DropDownBase.propTypes = (_DropDownBase$propTyp = {
	dropDownStyle: _propTypes2.default.string,
	selectedItem: _propTypes2.default.func,

	searchText: _propTypes2.default.string,
	searchResultsOnQuery: _propTypes2.default.func,
	searchTextMinLength: _propTypes2.default.number,
	searchResultsCount: _propTypes2.default.number,
	searchMatch: _propTypes2.default.func,
	enableSearchOnItemsCount: _propTypes2.default.number,

	messages: _propTypes2.default.shape({
		searchOnEmpty: _propTypes2.default.func
	}),

	required: _propTypes2.default.bool,
	groupName: _propTypes2.default.string
}, _defineProperty(_DropDownBase$propTyp, 'selectedItem', _propTypes2.default.string), _defineProperty(_DropDownBase$propTyp, 'onSelect', _propTypes2.default.func), _defineProperty(_DropDownBase$propTyp, 'onOpen', _propTypes2.default.func), _defineProperty(_DropDownBase$propTyp, 'onClose', _propTypes2.default.func), _defineProperty(_DropDownBase$propTyp, 'validation', _propTypes2.default.shape({
	validate: _propTypes2.default.bool,
	validateOn: _propTypes2.default.oneOf(['onClick']),
	rulesOrder: _propTypes2.default.arrayOf(_propTypes2.default.string),
	rules: _propTypes2.default.object,
	messages: _propTypes2.default.object
})), _defineProperty(_DropDownBase$propTyp, 'onPassValidation', _propTypes2.default.func), _defineProperty(_DropDownBase$propTyp, 'onFailValidation', _propTypes2.default.func), _defineProperty(_DropDownBase$propTyp, 'children', _propTypes2.default.oneOfType([_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['DropDownItemsBase', 'SearchBox', 'SelectionBox']) }), _propTypes2.default.arrayOf(_propTypes2.default.shape({ name: _propTypes2.default.oneOf(['DropDownItemsBase', 'SearchBox', 'SelectionBox']) }))])), _DropDownBase$propTyp);

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