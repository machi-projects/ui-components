import React from 'react';
import ReactDOM from 'react-dom';
import style from './DropdownComponent.css';
import Popup from '../Popup';
import { formatValue,bind } from '../common';

import { deepEqualObject } from '../../../utils/objectUtils';

let getI18NValue = (value,[])=>{
   return value;
}
class DropdownComponent extends React.Component {
  

  constructor(props) {
    super(props);
    bind.apply(this,["handleFocus","handleSelect","handleKeyUp","handleToggle","handleChange","onChangeValue" ,"setInputRef"]);

    let { value,suggestions,valueField,textField }= props;
    suggestions= suggestions? formatValue(suggestions,props.valueField,props.textField): [];
    value= value? value: [suggestions[0]] ;
    let selectedValue= value? formatValue([value],props.valueField,props.textField)[0]: null;
    
    let focusedSuggestion= this.getFocussedSuggestion(suggestions,selectedValue,valueField);
    this.state = { searchString: "",focusedSuggestion  };
    
  }

  setInputRef(el) {
		this.inputRef = el;
	}
  
  handleFocus(){
	  requestAnimationFrame(()=>{
		  this.inputRef && this.inputRef.focus();
	  })
  }
	
  getFocussedSuggestion(suggestions=[],value={},valueField){
     return suggestions.reduce((res,next,index)=>{
      if (next && next[valueField] === value[valueField]){
        res= index;
      }
      return res;
    },0) || 0;
  }

  filterSuggestions(searchValue,suggestions,searchKeys,searchType){
    return searchValue && suggestions.length && suggestions.filter((suggestion)=>{
      return searchKeys && searchKeys.some((searchKey)=>{
          let result= suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchValue.toLowerCase());
          return !(result === false || result === -1)
      }) ;
    }) || suggestions;

  }

  handleChange(e){
    this.setState({ searchString: e.target.value})
  }

  handleKeyUp(e){
    let keyCode= e.keyCode;
    let searchString= this.state.searchString;

    let { textField,valueField,searchKeys,searchType,suggestions,value,
          togglePopup,closePopupOnly }= this.props;

    suggestions= suggestions && suggestions.length && suggestions || [];
    suggestions= formatValue(suggestions,valueField,textField);//
    value= value && value || suggestions[0];
    value= formatValue([value],valueField,textField);//

    let { focusedSuggestion,showSuggestion }= this.state;
    
    let suggestionList= this.filterSuggestions(searchString,suggestions,searchKeys,searchType);
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
          let selectedValue= suggestionList[focusedSuggestion];
          if(selectedValue){
            this.onChangeValue(selectedValue)
            togglePopup(e);
            searchString="";
            focusedSuggestion= 0
          }
        }
        break;

      case 9:
      case 27:
          searchString="";
          focusedSuggestion= 0
          closePopupOnly(e)
        break;
      default:
        focusedSuggestion= 0
        break
    }
    this.setState({ searchString,focusedSuggestion})
    
  }

  handleSelect(value,e){
    let { togglePopup }= this.props;
    this.onChangeValue(value);
    togglePopup(e);
    this.setState({searchString:""});
  }
  
  onChangeValue(value){
	  let { onSelect,valueField }= this.props;
	  onSelect && onSelect(value[valueField]);
  }

  componentWillReceiveProps(nextProps) {
	  
	  let { suggestions,valueField,textField,value }= nextProps;
	  if(deepEqualObject(nextProps,this.props) == false ){
		  
		  	suggestions= suggestions? formatValue(suggestions,valueField,textField): [];
		    value= value? value: suggestions[0] ;
		    let selectedValue= value? formatValue([value],valueField,textField)[0]: null;
		    let focusedSuggestion= this.getFocussedSuggestion(suggestions,selectedValue,valueField);
		    
  			this.setState({focusedSuggestion});
	  }
  }

  handleToggle(e){
    let { isPopupOpen,togglePopup }= this.props;
    !isPopupOpen && this.handleFocus();
    togglePopup(e);
  }

  render() {
    let { searchString,focusedSuggestion }= this.state;
    let { valueField,textField,searchField,isPopupOpen,togglePopup, styles={},
          id,isReadOnly, position,searchKeys,searchType,removeClose,value,suggestions } = this.props;
    let suggestionsListElements= null;
    let dropDownMainstyle = styles.newMain ? styles.newMain : style.main;
    dropDownMainstyle = isReadOnly ? style.mainNot : dropDownMainstyle;

    suggestions= suggestions? formatValue(suggestions,valueField,textField): [];
    value= value? value: suggestions[0];
    let selectedValue= value? formatValue([value],valueField,textField)[0]: null;
    suggestions= this.filterSuggestions(searchString,suggestions,searchKeys,searchType);

    if(suggestions.length){
       suggestionsListElements= suggestions.map((suggestion,i)=>{
          let focus= focusedSuggestion === i;
          return <SuggestionItem key= {i} focus={focus} value={suggestion} onSelect={ this.handleSelect} textField={textField} />
      })
    }else{
      suggestionsListElements= <li className={style.notfound} >No Result</li>;
    }

    return  <div className={dropDownMainstyle} onClick={!isReadOnly && this.handleToggle} >
              <div className={styles.container?styles.container:this.props.dropStyle?style.dropStyle : style.dropdown} >
                <span className={style.flexline}>
	                {
	                  selectedValue && <span className={this.props.dropStyle?style.dropSelectName :style.selectname}>{selectedValue[textField]}</span>
	                }
	                  <span className={isPopupOpen?style.topArow :style.downArow}> </span>
	             </span>
              </div>
              <div className={isPopupOpen? position == "top"? style.topListView:style.topListView: style.hide} >
              { searchField && (<div className={searchField? style.searchinp: style.hide} onClick={ removeClose }>
                <input type="text" className={style.searchicon} onChange={ this.handleChange}
                    value={ this.state.searchString } onKeyUp={this.handleKeyUp} ref={this.setInputRef} />
                  <span className={style.searchIcon}>
                  </span>
                </div>) }
                <ul className={style.listmenu} >
                  { suggestionsListElements }
                </ul>
              </div>
            </div>
  }

}

DropdownComponent.defaultProps = {
	valueField : "id",
	textField : "name"
}

export default Popup(DropdownComponent,"dropdown");


class SuggestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect= this.handleSelect.bind(this);
  }
  handleSelect(e){
    let { onSelect,value}= this.props;
    onSelect && onSelect(value,e);
  }

  render() {
    let { focus,value,textField }= this.props; 
    return <li  className={focus? style.bccolor: style.normal} onClick={this.handleSelect} >{value[textField]}</li>
  }
}

