'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBoxBase = function (_Component) {
	_inherits(SearchBoxBase, _Component);

	function SearchBoxBase(props) {
		_classCallCheck(this, SearchBoxBase);

		var _this = _possibleConstructorReturn(this, (SearchBoxBase.__proto__ || Object.getPrototypeOf(SearchBoxBase)).call(this, props));

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

			return _react2.default.createElement(
				'div',
				{ className: searchBoxStyle + ' ' + (isCollaspe ? searchBoxCollaspeStyle : '') + ' ' + (isFloatLabel ? searchBoxFloatStyle : '') },
				isFloatLabel ? _react2.default.createElement(
					'span',
					{ className: floatboxStyle },
					floatLabelOnSearchBox
				) : null,
				_react2.default.createElement(
					'div',
					{ className: searchBoxInnerStyle },
					_react2.default.Children.map(this.props.children, function (child, i) {
						if (child.props.typeName === 'InputBox') {
							var _React$cloneElement;

							return _react2.default.cloneElement(child, (_React$cloneElement = {}, _defineProperty(_React$cloneElement, searchOn, _this4.onSearchInput), _defineProperty(_React$cloneElement, 'value', _this4.state.searchText), _defineProperty(_React$cloneElement, 'placeholder', placeholder), _defineProperty(_React$cloneElement, 'getElementRef', function getElementRef(a) {
								_this4.inputElementRef = a;
							}), _React$cloneElement));
						} else if (child.props.typeName === 'SearchIcon') {

							return _react2.default.cloneElement(child, {
								onClick: _this4.triggerSearchIconItem,
								isSearching: _this4.state.searchText ? true : false
							});
						} else if (child.props.typeName === 'ClearIcon') {
							return _react2.default.cloneElement(child, {
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
}(_react.Component);

exports.default = SearchBoxBase;


SearchBoxBase.defaultProps = {
	searchOn: 'onChange',
	isCollaspe: false
};

SearchBoxBase.propTypes = {
	searchBoxStyle: _propTypes2.default.string,
	searchBoxInnerStyle: _propTypes2.default.string,
	searchBoxCollaspeStyle: _propTypes2.default.string,
	searchBoxFloatStyle: _propTypes2.default.string,
	floatboxStyle: _propTypes2.default.string,
	searchOn: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	text: _propTypes2.default.string,
	isCollaspe: _propTypes2.default.bool,
	onChange: _propTypes2.default.func,
	onClickClearSeach: _propTypes2.default.func,
	onClickSearch: _propTypes2.default.func
};