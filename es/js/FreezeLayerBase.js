import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var FreezeLayerBase = function (_Component) {
	_inherits(FreezeLayerBase, _Component);

	function FreezeLayerBase(props) {
		_classCallCheck(this, FreezeLayerBase);

		var _this = _possibleConstructorReturn(this, (FreezeLayerBase.__proto__ || _Object$getPrototypeOf(FreezeLayerBase)).call(this, props));

		_this.setRef = _this.setRef.bind(_this);
		_this.onKeyupItem = _this.onKeyupItem.bind(_this);
		_this.onClickItem = _this.onClickItem.bind(_this);
		//this.onMouseOverItem = this.onMouseOverItem.bind(this);
		return _this;
	}

	// componentWillReciveProps(nextProps) {
	// 	if (nextProps.focusOn) {
	// 		requestAnimationFrame(() => {
	// 			this.elementRef.focus();
	// 		});
	// 	}
	// }

	_createClass(FreezeLayerBase, [{
		key: 'setRef',
		value: function setRef(el) {
			this.elementRef = el;
		}
	}, {
		key: 'onKeyupItem',
		value: function onKeyupItem(ev) {
			var _props = this.props,
			    onEscKeyUp = _props.onEscKeyUp,
			    executeEscKeyUpOn = _props.executeEscKeyUpOn;

			if (executeEscKeyUpOn) {
				executeEscKeyUpOn(ev) && ev.keyCode === 27 && onEscKeyUp && onEscKeyUp(ev);
			} else {
				ev.keyCode === 27 && onEscKeyUp && onEscKeyUp(ev);
			}
		}

		// onMouseOverItem() {
		// 	requestAnimationFrame(() => {
		// 		//this.elementRef.focus();
		// 	});
		// }

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			requestAnimationFrame(function () {
				_this2.elementRef.focus();
			});
		}
	}, {
		key: 'onClickItem',
		value: function onClickItem(ev) {
			var _props2 = this.props,
			    executeClickOn = _props2.executeClickOn,
			    onClick = _props2.onClick;


			if (executeClickOn) {
				executeClickOn(ev) && onClick && onClick(ev);
			} else {
				onClick && onClick(ev);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var freezeStyle = this.props.freezeStyle;

			//onMouseOver={this.onMouseOverItem}

			return React.createElement('div', {
				ref: this.setRef,
				className: freezeStyle,
				tabIndex: '-1',
				onClick: this.onClickItem,
				onKeyUp: this.onKeyupItem
			});
		}
	}]);

	return FreezeLayerBase;
}(Component);

export default FreezeLayerBase;


FreezeLayerBase.propTypes = {
	freezeStyle: PropTypes.string,
	onClick: PropTypes.func,
	executeClickOn: PropTypes.func,
	onEscKeyUp: PropTypes.func,
	executeEscKeyUpOn: PropTypes.func
};