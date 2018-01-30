import React from 'react';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import { omit, extract, deepEqualObject } from '../../utils/objectUtils';

export default class InputBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: this.props.value || '' };
		this.onChangeValue = this.onChangeValue.bind(this);
		this.validateInputBox = this.validateInputBox.bind(this);
		this.setTextValue = this.setTextValue.bind(this);
		this.setRef = this.setRef.bind(this);
	}

	setRef(el){
		this.elementRef = el;
		this.props.getElementRef && this.props.getElementRef(el);
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		return ((deepEqualObject(nextProps,this.props) == false) || (deepEqualObject(nextState,this.state) == false));
	}

	componentWillReceiveProps(nextProps) {
		
		if (nextProps.value != this.state.text) {
			this.setTextValue((nextProps.value || ''));
		}

		if( deepEqualObject(nextProps.validation,this.props.validation) == false && nextProps.validation && nextProps.validation.validate ){
			let inputTag = this.elementRef;
			this.validateInputBox(
				null,
				inputTag,
				null,
				extract(nextProps, ['validation', 'onPassValidation', 'onFailValidation'])
			);
		}
	}
	
	componentDidMount() {
		let inputTag = this.elementRef;
		if (this.props.validation != null && this.props.validation.validate) {
			
			this.validateInputBox(
				null,
				inputTag,
				null,
				extract(this.props, ['validation', 'onPassValidation', 'onFailValidation'])
			);
		}
	}

	setTextValue(text) {
		
		this.setState({ text: text },()=>{
			this.props.getValue && this.props.getValue(this.state.text);
		});
	}

	onChangeValue(ev, callback) {
		if (callback) {
			callback(ev);
		}

		if (ev.target.type !== 'checkbox' || ev.target.type !== 'radio') {
			this.setTextValue(ev.target.value);
		}
		
	}

	validateInputBox(ev, targetTag, callback, validationProps) {
		if (callback) {
			callback(ev);
		}

		if (validationProps != null) {
			validator.executeValidation(targetTag.value, targetTag, validationProps, this.props.type );
		}
	}

	render() {
		
		let removeTabIndex = this.props.tabIndex < 0 ? 'tabIndex' : '';
		let validationObj = extract(this.props, ['validation', 'onPassValidation', 'onFailValidation']);
		let { validation } = validationObj || {};
		let newProps = omit(this.props, [removeTabIndex, 'getValue', 'getElementRef','validation', 'onPassValidation', 'onFailValidation']);

		let onChangeEventFunc = newProps.onChange;
		newProps.onChange = ev => {
			this.onChangeValue(ev, onChangeEventFunc);
		};

		if (validation.validateOn) {
			let tempFunc = newProps[validation.validateOn];
			newProps[validation.validateOn] = ev => {
				this.validateInputBox(ev, ev.target, tempFunc, validationObj);
			};
		}
		
		return <input {...newProps}  ref={this.setRef} value={this.state.text}/>;
	}
}

InputBase.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,

	maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	list: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	autoFocus: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	checked: PropTypes.bool,
	autoComplete: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	pattern: PropTypes.string,
	value: PropTypes.string,

	getElementRef : PropTypes.func,
	tabIndex:PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
	onChange: PropTypes.func,
	onInput: PropTypes.func,
	getValue : PropTypes.func,

	validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func
};
