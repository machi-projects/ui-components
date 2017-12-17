import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import validator from '../../utils/validator';

export var PickItemBase = function (_React$Component) {
	_inherits(PickItemBase, _React$Component);

	function PickItemBase(props) {
		_classCallCheck(this, PickItemBase);

		var _this = _possibleConstructorReturn(this, (PickItemBase.__proto__ || _Object$getPrototypeOf(PickItemBase)).call(this, props));

		_this.onPickItem = _this.onPickItem.bind(_this);
		_this.state = { timeStamp: 0 };
		return _this;
	}

	_createClass(PickItemBase, [{
		key: 'onPickItem',
		value: function onPickItem(newSelectedItemPid, ev) {
			this.props.onSelectItem(newSelectedItemPid, ev.target);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var itemPid = this.props.pickId;

			var selectedItemStyle = this.props.selectedItems.indexOf(itemPid) != -1 ? this.props.selectedItemStyle : null;
			var itemStyles = (selectedItemStyle || '') + ' ' + (this.props.normalItemStyle || '');

			var events = {};
			events[this.props.pickOn] = this.props.itemsControls ? null : function (ev) {
				_this2.onPickItem(itemPid, ev);
			};

			return itemPid ? React.createElement(
				'div',
				_extends({ className: itemStyles }, events, { tabIndex: this.props.tabIndex }),
				this.props.children
			) : null;
		}
	}]);

	return PickItemBase;
}(React.Component);

PickItemBase.propTypes = {
	pickId: PropTypes.string.isRequired,
	tabIndex: PropTypes.string
};

var PickMultiGroupBase = function (_React$Component2) {
	_inherits(PickMultiGroupBase, _React$Component2);

	function PickMultiGroupBase(props) {
		_classCallCheck(this, PickMultiGroupBase);

		// Bind the method to the component context
		var _this3 = _possibleConstructorReturn(this, (PickMultiGroupBase.__proto__ || _Object$getPrototypeOf(PickMultiGroupBase)).call(this, props));

		_this3.renderChildren = _this3.renderChildren.bind(_this3);
		_this3.onSelectItem = _this3.onSelectItem.bind(_this3);
		_this3.state = { selectedItems: _this3.props.selectedItems };
		_this3.validateOnSelect = _this3.validateOnSelect.bind(_this3);

		_this3.setRef = _this3.setRef.bind(_this3);
		return _this3;
	}

	_createClass(PickMultiGroupBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var previousPids = (this.props.selectedItems || []).join('');
			var nextPids = (nextProps.selectedItems || []).join('');
			if (previousPids != nextPids) {
				var pickGroupTag = this.elementRef;
				onSelectItem(nextProps.selectedItems, pickGroupTag, nextProps);
			}

			if (nextProps.validation != null && nextProps.validation.validate) {
				this.validateOnSelect(this.state.selectedItems, nextProps);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.validation != null && this.props.validation.validate) {
				this.validateOnSelect(this.state.selectedItems, this.props);
			}
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(values, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required'];
			var defaultType = 'multigroup';

			var validation = props.validation,
			    onPassValidation = props.onPassValidation,
			    onFailValidation = props.onFailValidation;


			var targetTag = this.elementRef;
			if (validation != null) {
				//validateOn won't work here ...
				var newValidation = validator.combinePropsValidation(this.props, defaultType, props.pickOn, validation, defaultCheckPropsRules, defaultValidateRules);
				var validationObj = {
					validation: newValidation,
					onPassValidation: onPassValidation,
					onFailValidation: onFailValidation
				};

				validator.executeValidation(values, targetTag, validationObj, defaultType);
			} else {
				onPassValidation && onPassValidation(values, targetTag);
			}
		}
	}, {
		key: 'onSelectItem',
		value: function onSelectItem(newSelectedPid, ev, nextProps) {
			this.setState(function (state) {
				var selectedItems = state.selectedItems;
				var itemPosition = selectedItems.indexOf(newSelectedPid);
				if (itemPosition == -1) {
					selectedItems.push(newSelectedPid);
				} else {
					selectedItems.splice(itemPosition, 1);
				}

				return { selectedItems: selectedItems };
			}, function () {
				var selectedItems = this.state.selectedItems;
				var itemPosition = selectedItems.indexOf(newSelectedPid);

				this.props.onSelect && this.props.onSelect(selectedItems, {
					id: newSelectedPid,
					active: itemPosition !== -1
				}, ev.currentTarget);

				if (this.props.validation && this.props.validation.validateOn) {
					this.validateOnSelect(selectedItems, nextProps || this.props);
				}
			});
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var _this4 = this;

			return React.Children.map(this.props.children, function (child) {
				return React.cloneElement(child, {
					selectedItems: _this4.state.selectedItems,
					onSelectItem: _this4.onSelectItem,
					selectedItemStyle: _this4.props.styles.active,
					normalItemStyle: _this4.props.styles.item,
					itemsControls: _this4.props.itemsControls,
					pickOn: _this4.props.pickOn
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: this.props.styles.group, ref: this.setRef, tabIndex: this.props.tabIndex },
				this.renderChildren()
			);
		}
	}]);

	return PickMultiGroupBase;
}(React.Component);

export default PickMultiGroupBase;


PickMultiGroupBase.defaultProps = {
	styles: {},
	itemsControls: false,
	pickOn: 'onClick'
};

PickMultiGroupBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),
	required: PropTypes.bool,

	tabIndex: PropTypes.string,
	itemsControls: PropTypes.bool,
	selectedItems: PropTypes.arrayOf(PropTypes.string),
	onSelect: PropTypes.func,
	pickOn: PropTypes.string,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func,

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['PickItemBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['PickItemBase']) }))])
};