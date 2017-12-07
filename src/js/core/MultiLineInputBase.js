import React from 'react';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import {omit,extract,equals} from '../../utils/objectUtils';

export default class MultiLineInputBase extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = { text : this.props.value };
		this.onChangeText = this.onChangeText.bind(this);
		this.validateInputBox = this.validateInputBox.bind(this);
		this.setTextValue = this.setTextValue.bind(this);
		
		this.setRef = this.setRef.bind(this);
	}


	setRef(el){
		this.elementRef = el;
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		if( equals(nextProps, this.props) && nextState.text && this.state.text && ( nextState.text == this.state.text ) ){
				return false;
		}

		return true;
	}

	componentWillReceiveProps(nextProps){

		if( nextProps.value != this.props.value ){
			this.setTextValue( nextProps.value );
		}

	  if( nextProps.validation != null && nextProps.validation.validate  ){
			let textareaTag =this.elementRef;
			this.validateInputBox(null, textareaTag, null ,extract( nextProps , ["validation","onPassValidation","onFailValidation"] ) );
		}

	}

	componentDidMount(){

		if( this.props.validation != null && this.props.validation.validate ){
			 let textareaTag = this.elementRef;
			 this.validateInputBox(null, textareaTag , null ,extract( this.props , ["validation","onPassValidation","onFailValidation"] ) );
		}

	}

	setTextValue(text){
		this.setState({ text : text });
	}

	onChangeText(ev, callback){

		if( callback ){
			callback(ev);
		}

		this.setTextValue(ev.target.value);
	}

	validateInputBox(ev, targetTag , callback, validationProps){

		if( callback ){
			callback(ev);
		}

		if( validationProps != null ){
			validator.executeValidation(targetTag.value  , targetTag , validationProps );
		}

	}

  render() {

		let validationObj = extract( this.props , ["validation","onPassValidation","onFailValidation"] );
		let { validation } = validationObj || {};
		let newProps = omit( this.props, ["validation","onPassValidation","onFailValidation"] );

		let onChangeEventFunc = newProps.onChange;
		newProps.onChange = (ev)=>{
				this.onChangeText(ev , onChangeEventFunc);
		}

		if( validation.validateOn ) {

				let tempFunc = newProps[ validation.validateOn ];
			  newProps[ validation.validateOn ] = (ev)=>{
					this.validateInputBox(ev,
						ev.target ,
						tempFunc,
						validationObj );
			 }
		}

    return ( <textArea {...newProps} ref={this.setRef}  value={this.state.text} />);

  }

}

MultiLineInputBase.propTypes = {

	id : PropTypes.string ,
	name : PropTypes.string ,
	className : PropTypes.string ,
	placeholder : PropTypes.string ,
	readOnly : PropTypes.bool ,
	maxLength : PropTypes.oneOfType([PropTypes.string,PropTypes.number] ),
	rows :  PropTypes.oneOfType( [PropTypes.string,PropTypes.number] ),
	cols :  PropTypes.oneOfType( [PropTypes.string,PropTypes.number] ),

	autoFocus :  PropTypes.bool ,
	disabled :  PropTypes.bool ,
	required :  PropTypes.bool ,
	value : PropTypes.string ,

	onFocus: PropTypes.func,
	onBlur : PropTypes.func,
	onKeyDown : PropTypes.func,
	onKeyUp : PropTypes.func,
	onChange : PropTypes.func,
	onInput : PropTypes.func,

	validation : PropTypes.shape({
			validate : PropTypes.bool ,
			validateOn : PropTypes.string,
			rulesOrder :  PropTypes.arrayOf(PropTypes.string),
			rules : PropTypes.object,
			messages : PropTypes.object,
	}),
	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func

}