import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './MultiSelect.css';
import { formatValue,bind } from '../common';

import Popup from '../Popup'
import Pill from '../Pill';

import {FormatText} from 'fz-i18n';

class MultiSelect extends React.Component {

  constructor(props) {
    super(props);
    bind.apply(this,["handleFocus","handleKeyUp","handleSelect","handleChange",
                      "handleRemove","handleHover","handleToggle","handleKeyDown","onSelectedItem"])
                      
    this.state={
      focusedSuggestion: 0,
      searchString: "",
      suggestions : formatValue(props.defaultSuggestions),
      selectedValues : formatValue(props.defaultSelectedValues)
    }
    
    this.setRef = this.setRef.bind(this);
    
  }
  
  setRef(el){
		this.elementRef = el;
  }

  
  componentWillReceiveProps(nextprops){
		  
	  if( (nextprops.selectedValues && nextprops.selectedValues !== this.props.defaultSelectedValues) || (nextprops.suggestions && nextprops.suggestions !== this.props.defaultSuggestions) ){
		  this.setState({
			  suggestions : formatValue(nextprops.suggestions) ,
			  selectedValues : formatValue(nextprops.selectedValues)
		  })
	  }	
	  
	  if (nextprops.validation != null && nextprops.validation.validate ) {
		  this.validateOnSelect(this.state.selectedValues, nextprops);
	  }
   }

  
	validateOnSelect(value, props) {
		let defaultCheckPropsRules = ['required'];
		let defaultValidateRules = ['required'];
		let defaultType = 'multigroup';
	
		const { validation, onPassValidation, onFailValidation } = props;
	
		let targetTag = this.elementRef;
		if (validation != null) {
			//validateOn won't work here ...
			let newValidation = validator.combinePropsValidation(
				this.props,
				defaultType,
				"onSelect",
				validation,
				defaultCheckPropsRules,
				defaultValidateRules
			);
	
			let validationObj = {
				validation: newValidation,
				onPassValidation: onPassValidation,
				onFailValidation: onFailValidation
			};

			validator.executeValidation(value, targetTag, validationObj);
		
		} else {
			onPassValidation && onPassValidation(value, targetTag);
		}
	}
	
	
  componentDidMount() {
		if (this.props.validation != null && this.props.validation.validate) {
			this.validateOnSelect(this.state.selectedValues, this.props);
		}
	}
  
  
  handleChange(e){
    let {isPopupOpen,togglePopup} = this.props;
    this.setState({searchString:e.target.value});
    if(!isPopupOpen){
      togglePopup(e);
    }
  }
  
  handleToggle(e){
    e.stopPropagation && e.stopPropagation();
    e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
    let { isPopupOpen,togglePopup }= this.props;
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
    !isPopupOpen && togglePopup(e)
  }


  handleSelect(selectedValue,e){
    let { onSelect,closePopupOnly,isPopupOpen,groupName }= this.props;
    
    let selectedValues = this.state.selectedValues;
    let newSelectedSuggestions= [...selectedValues,selectedValue];
    this.setState({focusedSuggestion:0,searchString : "",selectedValues : newSelectedSuggestions } , ()=>{
    			this.onSelectedItem();
    } );
    isPopupOpen && closePopupOnly(e)
    this.refs.nameInput.focus();
  }
  
  
	  onSelectedItem(){
		  this.props.onSelect && this.props.onSelect( this.state.selectedValues , this.props.groupName);
		  if( this.props.validation && this.props.validation.validateOn ){
	  		  this.validateOnSelect(this.state.selectedValues, this.props);
	  	 }
	  }
	  
	  handleFocus(){
	    ReactDOM.findDOMNode(this.refs.nameInput).focus();
	  }
	
	  handleRemove(selectedValue,e){
		  
	    let { valueField,onSelect,isPopupOpen,closePopupOnly,groupName }= this.props;
	    let selectedValues = this.state.selectedValues;
	    let newSelectedSuggestions = selectedValues.filter((selectedSuggestion,i)=>{
	        return !(selectedSuggestion[valueField] === selectedValue[valueField]);
	    });
	 
	    isPopupOpen && closePopupOnly(e)
	    ReactDOM.findDOMNode(this.refs.nameInput).focus();
	    this.setState({focusedSuggestion:0 , selectedValues : newSelectedSuggestions }, ()=>{
	    			this.onSelectedItem();
	     });
	    
	  }
	  
   handleKeyDown(e){
      let keyCode= e.keyCode;
      let searchString= e.target.value;
      let { valueField,searchKeys,searchType,onSelect,isPopupOpen,closePopupOnly,groupName }= this.props;

      let { focusedSuggestion , suggestions , selectedValues }= this.state;
      let suggestionList= this.filterSuggestions(searchString,suggestions,selectedValues,searchKeys,searchType,valueField);

      let suggestionLength= suggestionList.length;
      switch (keyCode) {
        case 8:
          if(selectedValues.length && searchString.length == 0){
            let newSelectedSuggestions= selectedValues.slice(0,-1);
            focusedSuggestion= 0;
            this.setState({focusedSuggestion,selectedValues:newSelectedSuggestions},()=>{
    				this.onSelectedItem();
            })
            
            //isPopupOpen && closePopupOnly(e)
            this.handleFocus();
          }
          break;
      }
     
  }
  handleKeyUp(e){
    let keyCode= e.keyCode;
    let searchString= e.target.value;
    let { textField,valueField,searchKeys,searchType,onSelect,isPopupOpen, togglePopup, closePopupOnly,groupName }= this.props;
    let { focusedSuggestion ,suggestions , selectedValues  }= this.state;
    let suggestionList= this.filterSuggestions(searchString,suggestions,selectedValues,searchKeys,searchType,valueField);
    let suggestionLength= suggestionList.length;

    switch (keyCode) {
      case 40:
      case 34:
      if(suggestionLength){
         if(focusedSuggestion === suggestionLength-1 ){
            focusedSuggestion= 0;
          }else{
            focusedSuggestion+=1;
          }
        }
        break;
      case 38:
      case 33:
        if(suggestionLength){
          if(focusedSuggestion === 0 ){
            focusedSuggestion= suggestionLength-1;
          }else{
            focusedSuggestion-=1;
          }
        }
        break;
      case 13:
        if(suggestionLength){
          ReactDOM.findDOMNode(this.refs.nameInput).focus();
          let selectedSuggestion= suggestionList[focusedSuggestion];
          let newSelectedSuggestions= [...selectedValues,selectedSuggestion];
          
          if(isPopupOpen){
        	  	focusedSuggestion= 0;
             searchString="";
          }
          this.setState({ focusedSuggestion,searchString , selectedValues : newSelectedSuggestions},()=>{

  			 if(isPopupOpen){
  				  this.onSelectedItem();
  	              closePopupOnly(e);
  	              this.handleFocus();
  	          }else{
  	            togglePopup(e);
  	          }
  	           
          } );
          
         
          return;
        }	
        break;

      case 9:
      case 27:
          isPopupOpen && closePopupOnly(e)
        break;
      default:
        focusedSuggestion=0
        break;
    }
 

    this.setState({focusedSuggestion,searchString})

  }


  filterSuggestions(searchString,suggestions=[],selectedValues=[],searchKeys,searchType,valueField){
    searchString= typeof searchString ==="number"? searchString.toString(): searchString;
    suggestions= selectedValues.length && suggestions.filter((suggestion)=>{
      return !selectedValues.some((value)=>{
          return suggestion[valueField] === value[valueField]
      })
    }) || suggestions;
    return searchString && suggestions.filter((suggestion)=>{
        return searchKeys && searchKeys.some((searchKey)=>{
            let result= suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchString);
            return !(result === false || result === -1)
        })
    }) || suggestions


  }


  
  handleHover(focusedSuggestion){
    this.state.focusedSuggestion !== focusedSuggestion && this.setState({ focusedSuggestion })
  }

  render() {
    let { searchString,focusedSuggestion,inputFocus }= this.state;

    let { groupName,searchKeys,searchType,textField,valueField,styles={},
          isReadOnly,isPopupOpen,togglePopup,removeClose,placeholder,allowClear }= this.props;

    let stateSuggestions  = this.state.suggestions;
    let stateSelectedValues  = this.state.selectedValues;
    
    let selectedValues = stateSelectedValues.map((selectedValue,i)=>{
      return [<SelectedItem  value={ selectedValue } allowClear={allowClear} textField={ textField} onDelete={this.handleRemove } key={ i } />]
    })


   let suggestions = this.filterSuggestions(searchString, stateSuggestions, stateSelectedValues,searchKeys,searchType,valueField);
 
    let suggestionList;
    if(suggestions.length){
      suggestionList= suggestions.map((suggestion,i)=>{
        let focus= focusedSuggestion === i
        return <SuggestionItem index={ i } key={ i } textField={textField} valueField={valueField} onHover={ this.handleHover} value={ suggestion } onSelect={ this.handleSelect } focus={ focus }  />
      })
    }else{
      suggestionList = <FormatText i18NKey="No matches found" className={style.notfound} type="div" />
    }


    return (
      <div className={style.mainrel} ref={this.setRef}  >
            <div className={isPopupOpen?style.mainFlexWrap:style.mainBorder} onClick={!isReadOnly && this.handleToggle}>
              {selectedValues}
              <span className={style.inputAdjust}>
                <input className={style.inputFocus} placeholder={placeholder} ref="nameInput" readOnly={isReadOnly} onKeyDown={this.handleKeyDown} onKeyUp={ this.handleKeyUp } onChange={this.handleChange} value={searchString}></input>
              </span>
              <div className={style.clr}></div>

            </div>
            <div className={isPopupOpen?style.ListAds:style.hide} onClick={ removeClose }>
                {suggestionList}
              </div>
              <div className={style.clr}></div>
      </div>
    );
  }
}

export default Popup(MultiSelect);

MultiSelect.defaultProps={
	valueField : "id" ,
	textField : "name", 
	searchKeys : ["name"],
 	searchType : "indexOf",
 	allowClear : true
}
	 
MultiSelect.propTypes={
    groupName:PropTypes.string,
    placeholder:PropTypes.string,
    selectedValues:PropTypes.array,
    searchKeys:PropTypes.array,
    searchType:PropTypes.string,
    textField:PropTypes.string,
    valueField:PropTypes.string,
    suggestions:PropTypes.array,
    isReadOnly:PropTypes.bool,
    isPopupOpen:PropTypes.bool,
    togglePopup:PropTypes.func,
    removeClose:PropTypes.func,
    onSelect:PropTypes.func,
    closePopupOnly:PropTypes.func,
    
    validation: PropTypes.shape({
		validate: PropTypes.bool,
		validateOn: PropTypes.string,
		rulesOrder: PropTypes.arrayOf(PropTypes.string),
		rules: PropTypes.object,
		messages: PropTypes.object
	}),

	onPassValidation: PropTypes.func,
	onFailValidation: PropTypes.func
}


class SuggestionItem extends React.Component{

  constructor(props) {
    super(props);
    this.handleSelect= this.handleSelect.bind(this);
    this.handleHover= this.handleHover.bind(this);
  }


  handleHover(){
    let { onHover,index }= this.props;
    onHover && onHover(index)
  }

  handleSelect(e){
      let { onSelect,value }= this.props;
      onSelect && onSelect(value,e);
  }

  render(){
    let { focus,textField,value={} }= this.props;

    let className= focus? style.suggestionFocus: style.suggestion
    return <div className={className} onClick={this.handleSelect} onMouseOver={ this.handleHover}>{value[textField]}</div>
  }
}

SuggestionItem.propTypes={
    value:PropTypes.object,
    textField:PropTypes.string,
    onHover:PropTypes.func,
    onSelect:PropTypes.func
}


class SelectedItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleRemove= this.handleRemove.bind(this);
  }

  handleRemove(groupName,e){
    e.stopPropagation();
    
    e.nativeEvent && e.nativeEvent.stopImmediatePropagation && e.nativeEvent.stopImmediatePropagation();
    let { onDelete,value }= this.props;
    onDelete && onDelete(value,e);
  }


  render() {
    let { textField,value={},allowClear }= this.props;
    return <span className={style.multiSel}>
    				<Pill backIcon={ allowClear ? {name:"xCloseIcon",size:"small"} : null } text={value[textField]} onBackIconClick={this.handleRemove}/>
    		</span>
    				
  }
}

SelectedItem.propTypes={
    value:PropTypes.object,
    textField:PropTypes.string,
    onDelete:PropTypes.func
}
