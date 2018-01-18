import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import validator from '../../utils/validator';
import { deepEqualObject } from '../../utils/objectUtils';

export var PickOneItemBase = function (_React$Component) {
	_inherits(PickOneItemBase, _React$Component);

	function PickOneItemBase(props) {
		_classCallCheck(this, PickOneItemBase);

		var _this = _possibleConstructorReturn(this, (PickOneItemBase.__proto__ || _Object$getPrototypeOf(PickOneItemBase)).call(this, props));

		_this.onPickItem = _this.onPickItem.bind(_this);
		return _this;
	}

	_createClass(PickOneItemBase, [{
		key: 'onPickItem',
		value: function onPickItem(newSelectedItemPid, ev) {
			this.props.onSelectItem(newSelectedItemPid, ev);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var itemPid = this.props.pickId;

			var selectedItemStyle = this.props.selectedItem == itemPid ? this.props.selectedItemStyle : '';
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

	return PickOneItemBase;
}(React.Component);

PickOneItemBase.propTypes = {
	pickId: PropTypes.string.isRequired,
	tabIndex: PropTypes.string
};

var PickOneGroupBase = function (_React$Component2) {
	_inherits(PickOneGroupBase, _React$Component2);

	function PickOneGroupBase(props) {
		_classCallCheck(this, PickOneGroupBase);

		// Bind the method to the component context
		var _this3 = _possibleConstructorReturn(this, (PickOneGroupBase.__proto__ || _Object$getPrototypeOf(PickOneGroupBase)).call(this, props));

		_this3.renderChildren = _this3.renderChildren.bind(_this3);
		_this3.onSelectItem = _this3.onSelectItem.bind(_this3);
		_this3.state = { selectedItem: _this3.props.selectedItem };
		_this3.validateOnSelect = _this3.validateOnSelect.bind(_this3);

		_this3.setRef = _this3.setRef.bind(_this3);
		return _this3;
	}

	_createClass(PickOneGroupBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
			this.props.getElementRef && this.props.getElementRef(el);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {

			if (this.props.selectedItem !== this.state.selectedItem) {
				var pickGroupTag = this.elementRef;
				this.onSelectItem(nextProps.selectedItem, pickGroupTag);
			}

			if (deepEqualObject(nextProps.validation, this.props.validation) == false && nextProps.validation && nextProps.validation.validate) {
				this.validateOnSelect(this.state.selectedItem, nextProps);
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return deepEqualObject(nextProps, this.props) == false || deepEqualObject(nextState, this.state) == false;
		}
	}, {
		key: 'validateOnSelect',
		value: function validateOnSelect(value, props) {
			var defaultCheckPropsRules = ['required'];
			var defaultValidateRules = ['required'];
			var defaultType = 'onegroup';

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

				validator.executeValidation(value, targetTag, validationObj, defaultType);
			} else {
				onPassValidation && onPassValidation(value, targetTag);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.validation != null && this.props.validation.validate) {
				this.validateOnSelect(this.state.selectedItem, this.props);
			}
		}
	}, {
		key: 'onSelectItem',
		value: function onSelectItem(newSelectedPid, ev) {
			var currentTarget = ev.currentTarget;
			this.setState({ selectedItem: newSelectedPid }, function () {
				this.props.onSelect && this.props.onSelect(this.state.selectedItem, currentTarget);
				this.props.getValue && this.props.getValue(this.state.selectedItem);
				if (this.props.validation != null && this.props.validation.validateOn) {
					this.validateOnSelect(this.state.selectedItem, this.props);
				}
			});
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var _this4 = this;

			return React.Children.map(this.props.children, function (child, i) {
				return React.cloneElement(child, {
					key: i,
					selectedItem: _this4.state.selectedItem,
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
				{ className: this.props.styles.group,
					ref: this.setRef,
					tabIndex: this.props.tabIndex,
					onClick: this.props.onClick },
				this.renderChildren()
			);
		}
	}]);

	return PickOneGroupBase;
}(React.Component);

export default PickOneGroupBase;


PickOneGroupBase.defaultProps = {
	styles: {},
	itemsControls: false,
	pickOn: 'onClick'
};

PickOneGroupBase.propTypes = {
	styles: PropTypes.shape({
		group: PropTypes.string,
		item: PropTypes.string,
		active: PropTypes.string
	}),
	required: PropTypes.bool,

	tabIndex: PropTypes.string,
	getElementRef: PropTypes.func,
	onClick: PropTypes.func,

	itemsControls: PropTypes.bool,
	selectedItem: PropTypes.string,
	onSelect: PropTypes.func,
	getValue: PropTypes.func,
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

	children: PropTypes.oneOfType([PropTypes.shape({ name: PropTypes.oneOf(['PickOneItemBase']) }), PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.oneOf(['PickOneItemBase']) }))])
};