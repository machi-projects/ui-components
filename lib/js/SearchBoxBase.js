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

			return _react2.default.createElement(
				'div',
				{ className: searchBoxStyle },
				_react2.default.Children.map(this.props.children, function (child, i) {
					if (child.type.name === 'InputBox') {
						var _React$cloneElement;

						return _react2.default.cloneElement(child, (_React$cloneElement = {}, _defineProperty(_React$cloneElement, searchOn, _this3.onSearchInput), _defineProperty(_React$cloneElement, 'value', _this3.state.searchText), _React$cloneElement));
					} else if (child.type.name === 'SearchIcon') {
						return _react2.default.cloneElement(child, {
							onClick: _this3.triggerSearchItem
						});
					} else if (child.type.name === 'ClearIcon') {
						return _this3.state.searchText ? _react2.default.cloneElement(child, {
							onClick: _this3.clearSearchItem
						}) : null;
					}
					return null;
				})
			);
		}
	}]);

	return SearchBoxBase;
}(_react.Component);

exports.default = SearchBoxBase;


SearchBoxBase.defaultProps = {
	searchOn: 'onChange'
};

SearchBoxBase.propTypes = {
	searchBoxStyle: _propTypes2.default.string,
	searchOn: _propTypes2.default.string,
	text: _propTypes2.default.string,
	onChange: _propTypes2.default.func
};