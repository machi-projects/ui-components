import React from 'react';
import validator from '../../utils/validator';
import PropTypes from 'prop-types';
import {omit,extract,deepEqualObject} from '../../utils/objectUtils';

export default class MultiLineInputBase extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = { text : this.props.value || '' };
		this.onChangeText = this.onChangeText.bind(this);
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

	componentWillReceiveProps(nextProps){

	  if( nextProps.value != this.state.text ){
		 this.setTextValue( (nextProps.value || '') );
	  }

	  if( deepEqualObject(nextProps.validation,this.props.validation) == false && nextProps.validation && nextProps.validation.validate ){
		  let textareaTag = this.elementRef;
		  this.validateInputBox(null, textareaTag, null ,extract( nextProps , ["validation","onPassValidation","onFailValidation"] ) );
	  }

	}
	
	componentDidMount(){

	    let textareaTag = this.elementRef;
		if( this.props.validation != null && this.props.validation.validate ){
			 this.validateInputBox(null, textareaTag , null ,extract( this.props , ["validation","onPassValidation","onFailValidation"] ) );
		}

		//requestAnimationFrame(()=>{
			if(this.props.autoExpandX || this.props.autoExpandY){
				this.setState({
					minHeight : textareaTag.clientHeight , 
					minWidth : textareaTag.clientWidth , 
					xAutoExpand : (textareaTag.clientWidth == textareaTag.scrollWidth) , 
					yAutoExpand : (textareaTag.clientHeight == textareaTag.scrollHeight)
				})
			}
		//})
		
	}

	setTextValue(text){
		this.setState({ text },()=>{
			this.props.getValue && this.props.getValue(this.state.text);
		});
	}

	onChangeText(ev, callback){

		if( callback ){
			callback(ev);
		}

		this.setTextValue(ev.target.value);
		
		if(this.props.autoExpandX || this.props.autoExpandY ){
			this.autoExpand(ev.target);
		}
	}

	
	autoExpand(el){

		if(this.props.autoExpandY && this.state.yAutoExpand ){
			requestAnimationFrame(()=>{
			
				if( this.state.minHeight < el.scrollHeight ){
					el.style.height = "auto";
					el.style.height = el.scrollHeight + 'px';
				}
				
			 });
		}
		
		if(this.props.autoExpandX && this.state.xAutoExpand ){
			requestAnimationFrame(()=>{
				if( this.state.minWidth < el.scrollWidth ){
					 el.style.scrollWidth = "auto";
					 el.style.width = el.scrollWidth + 'px';
				}
			 });
		}
	  
	}
	
	validateInputBox(ev, targetTag , callback, validationProps){

		if( callback ){
			callback(ev);
		}

		if( validationProps != null ){
			let defaultType = "textarea";
			validator.executeValidation(targetTag.value  , targetTag , validationProps , defaultType );
		}

	}

    render() {

    	let removeTabIndex = this.props.tabIndex < 0 ? 'tabIndex' : '';
		let validationObj = extract( this.props , ["validation","onPassValidation","onFailValidation"] );
		let { validation } = validationObj || {};
		let newProps = omit( this.props, [removeTabIndex , "getValue" ,"getElementRef","autoExpandX","autoExpandY","validation","onPassValidation","onFailValidation"] );

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

	tabIndex : PropTypes.string,
	autoExpandY : PropTypes.bool ,
	autoExpandX : PropTypes.bool ,
	
	autoFocus :  PropTypes.bool ,
	disabled :  PropTypes.bool ,
	required :  PropTypes.bool ,
	value : PropTypes.string ,

	getElementRef :  PropTypes.func,
	onFocus: PropTypes.func,
	onBlur : PropTypes.func,
	onKeyDown : PropTypes.func,
	onKeyUp : PropTypes.func,
	onChange : PropTypes.func,
	onInput : PropTypes.func,
	getValue : PropTypes.func,

	validation : PropTypes.shape({
			validate : PropTypes.bool ,
			validateOn : PropTypes.string,
			rulesOrder :  PropTypes.arrayOf(PropTypes.string),
			rules : PropTypes.object,
			messages : PropTypes.object
	}),
	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func

}
