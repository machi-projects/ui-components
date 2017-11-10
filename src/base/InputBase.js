import React from 'react';
import validator from './validator';

export default class InputBase extends React.Component {

	constructor(props){
		
		super(props);
		this.state = { text : this.props.value , checked : !this.props.checked };
		this.onChangeValue = this.onChangeValue.bind(this);
		this.validateInputBox = this.validateInputBox.bind(this);
		this.setTextValue = this.setTextValue.bind(this);
		this.setCheckedValue = this.setCheckedValue.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		
		if( nextProps.value != this.props.value ){
			
			this.setTextValue( nextProps.value );
		}
		
		if( nextProps.checked != this.props.checked ){
			
			this.setCheckedValue( nextProps.checked );
		}
		
		if( nextProps.validate != this.props.validate ){
			
			let inputTag = ReactDOM.findDOMNode(this);
			this.validateInputBox(null, inputTag, nextProps.validate );
		}
	}

	setTextValue(text,el){
	  this.setState({ text : text });
	}
	
	setCheckedValue(checkedVal,el){
		this.setState({ checked : checkedVal });
	}
	
	onChangeValue(ev, callback){
		
		if( callback ){
			callback(ev); 
		}
		
		if(  ev.target.type == "checkbox" || ev.target.type == "radio" ){
			
			this.setCheckedValue( ev.target.checked );
		}
		else{
			
			this.setTextValue(ev.target.value );
		}
	}

	validateInputBox(ev, targetTag , isValidate , callback){
		
		if( callback ){
			callback(ev); 
		}
		
		if(isValidate){
			
			validator.executeValidation(targetTag.value  , targetTag , this.props );
		}
		
	}
	
	render() {
	
	  const {
	      id,
	      type,
	      name,
	      className,
	      placeholder,
	      readOnly,
	      maxLength,
	      min,
	      max,
	      step,
	      list,
	      size,
	      autoFocus,
	      checked,
	      autoComplete,
	      disabled,
	      required,
	      pattern,
	      validateOn
	    } = this.props;
	    
	    
	    const events = {
	    		  onFocus : this.props.onFocus ,
	  	      onBlur  : this.props.onBlur,
	  	      onKeyDown  : this.props.onKeyDown,
	  	      onKeyUp  : this.props.onKeyUp,
	  	      onChange : this.props.onChange,
	  	      onInput : this.props.onInput
	    };
	    
	    let newChecked = this.state.checked;
	    let newValidateOn = validateOn || "onBlur";
	    if(  type == "checkbox" || type == "radio" ){
	    		newChecked = null;
	    		newValidateOn = "onChange";
	    }
	    
	    let onChangeEventFunc = events.onChange;
	    events.onChange = (ev)=>{
	    	
	    		this.onChangeValue(ev , onChangeEventFunc); 
	    }
	    
	    if( newValidateOn && this.props.validate ) {
	    	
	    		let tempFunc =  events[ newValidateOn ];
    			events[ newValidateOn ] = (ev)=>{
    				this.validateInputBox(ev, ev.target , this.props.validate , tempFunc);
    			}
	    }
	   
	
    return ( <input id={id} 
    type={type}
    	name={name}
    className={className} 
    
    placeholder={placeholder}
    readOnly={readOnly}
    maxLength={maxLength}
    min={min}
    max={max}
    size={size}
    step={step}
    list={list}
    
    checked={newChecked}
    autoComplete={autoComplete}
    disabled={disabled}
    pattern={pattern}
    required={required}
    autoFocus={autoFocus}
    
    onFocus={events.onFocus} 
    onBlur={events.onBlur} 
    onKeyDown={events.onKeyDown} 
    onKeyUp={events.onKeyUp} 
    onChange={events.onChange}
    onInput={events.onInput}
    
    value={this.state.text}  />);
 
  }

}
