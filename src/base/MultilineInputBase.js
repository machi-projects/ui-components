import React from 'react';
import validator from './validator';

export default class MultilineInputBase extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = { text : this.props.value };
		this.onChangeText = this.onChangeText.bind(this);
		this.validateInputBox = this.validateInputBox.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		
		if( nextProps.value != this.props.value ){
			
			this.setState({ text : nextProps.value });
		}
		
		if( nextProps.validate != this.props.validate ){
			
			let textareaTag = ReactDOM.findDOMNode(this);
			this.validateInputBox(null, textareaTag, nextProps.validate );
		}
	}

	onChangeText(ev, callback){
		
		if( callback ){
			callback(ev); 
		}
		
		let text = ev.target.value;
		this.setState({ text : text });
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
	
	  const { id,
	      name,
	      className,
	      placeholder,
	      readOnly,
	      rows,
	      cols,
	      
	      maxLength,
	      autoFocus,
	      disabled,
	      required,
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
	    
	    let onChangeEventFunc = events.onChange;
	    events.onChange = (ev)=>{
	    		this.onChangeText(ev , onChangeEventFunc); 
	    }
	    
	    if( validateOn ) {
	    	
	    		let tempFunc =  events[ validateOn ];
  			events[ validateOn ] = (ev)=>{
  				this.validateInputBox(ev, ev.target , this.props.validate , tempFunc);
  			}
	    }
	
    return ( <textArea id={id} 
    
	name={name}
	className={className} 
	placeholder={placeholder}
	readOnly={readOnly}
	maxLength={maxLength}
	rows={rows}
	cols={cols}
	
	disabled={disabled}
	required={required}
    autoFocus={autoFocus}
	
	onFocus={events.onFocus} 
	onBlur={events.onBlur}
	onKeyDown={events.onKeyDown} 
	onKeyUp={events.onKeyUp} 
	onChange={events.onChange}
	onInput={events.onInput}
	
	value={this.state.text}
    
   />);
 
  }

}


