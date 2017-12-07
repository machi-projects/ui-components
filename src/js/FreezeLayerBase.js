import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FreezeLayerBase extends Component {
	constructor(props) {
		super(props);
		this.setRef = this.setRef.bind(this);
		this.onKeyupItem = this.onKeyupItem.bind(this);
		this.onClickItem = this.onClickItem.bind(this);
		//this.onMouseOverItem = this.onMouseOverItem.bind(this);
	}

	// componentWillReciveProps(nextProps) {
	// 	if (nextProps.focusOn) {
	// 		requestAnimationFrame(() => {
	// 			this.elementRef.focus();
	// 		});
	// 	}
	// }

	setRef(el) {
		this.elementRef = el;
	}

	onKeyupItem(ev) {
		let { onEscKeyUp, executeEscKeyUpOn } = this.props;
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

	componentDidMount() {
		requestAnimationFrame(() => {
			this.elementRef.focus();
		});
	}

	onClickItem(ev) {
		let { executeClickOn, onClick } = this.props;

		if (executeClickOn) {
			executeClickOn(ev) && onClick && onClick(ev);
		} else {
			onClick && onClick(ev);
		}
	}

	render() {
		let { freezeStyle } = this.props;

		//onMouseOver={this.onMouseOverItem}
		return (
			<div
				ref={this.setRef}
				className={freezeStyle}
				tabIndex="-1"
				onClick={this.onClickItem}
				onKeyUp={this.onKeyupItem}
			/>
		);
	}
}

FreezeLayerBase.propTypes = {
	freezeStyle: PropTypes.string,
	onClick: PropTypes.func,
	executeClickOn: PropTypes.func,
	onEscKeyUp: PropTypes.func,
	executeEscKeyUpOn: PropTypes.func
};
