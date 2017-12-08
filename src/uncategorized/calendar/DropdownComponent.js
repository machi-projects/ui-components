import React from 'react';
import ReactDOM from 'react-dom';
import style from './DropdownComponent.css';
import Popup from '../Popup.js';
import { formatValue,bind } from '../../../utils/common';
let getI18NValue = (value,[])=>{
   return value;
}
class DropdownComponent extends React.Component {
  

  constructor(props) {
    super(props);
    bind.apply(this,["handleFocus","handleSelect","handleKeyUp","handleToggle","handleChange"]);

    let { value,suggestions,valueField,textField }= props;
    suggestions= suggestions? formatValue(suggestions): [];
    value= value? value: [suggestions[0]] ;
    let selectedValue= value? formatValue([value])[0]: null;
    
    let focusedSuggestion= this.getFocussedSuggestion(suggestions,selectedValue,valueField);
    this.state = { searchString: "",focusedSuggestion }
  }

  handleFocus(){
    setTimeout(()=>{
      this.refs.inputField.focus();
    },0)
      
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
    let searchString= this.refs.inputField.value;

    let { textField,valueField,searchKeys,searchType,suggestions,onSelect,value,
          togglePopup,closePopupOnly }= this.props;

    suggestions= suggestions && suggestions.length && suggestions || [];
    suggestions= formatValue(suggestions);//
    value= value && value || suggestions[0];
    value= formatValue([value]);//

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
            onSelect(selectedValue);
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
    let { onSelect,togglePopup }= this.props;
    onSelect(value);
    togglePopup(e);
    this.setState({searchString:""});
  }

  componentWillReceiveProps(nextProps) {
    let { suggestions,valueField,textField,value }= nextProps;

    suggestions= suggestions? formatValue(suggestions): [];
    value= value? value: suggestions[0] ;
    let selectedValue= value? formatValue([value])[0]: null;
    
    let focusedSuggestion= this.getFocussedSuggestion(suggestions,selectedValue,valueField);
    this.state = {
      focusedSuggestion
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

    suggestions= suggestions? formatValue(suggestions): [];
    value= value? value: suggestions[0];
    let selectedValue= value? formatValue([value])[0]: null;
    suggestions= this.filterSuggestions(searchString,suggestions,searchKeys,searchType);

    if(suggestions.length){
       suggestionsListElements= suggestions.map((suggestion,i)=>{
          let focus= focusedSuggestion === i;
          return <SuggestionItem key= {i} focus={ focus} value={suggestion} onSelect={ this.handleSelect} textField={ textField} />
      })
    }else{
      suggestionsListElements= <li className={style.notfound} >{getI18NValue("crm.module.empty.msg.for.search"),["matches"]}</li>;
    }

    return  <div className={dropDownMainstyle} onClick={!isReadOnly && this.handleToggle} data-testid={id}>
              <div className={styles.container?styles.container:this.props.dropStyle?style.dropStyle : style.dropdown} data-testid="remindByCountContainer">
                <a rel="noopener" className={style.flexline}>
                {
                  selectedValue && <span data-testid="selectedValue" className={this.props.dropStyle?style.dropSelectName :style.selectname}>{selectedValue[textField]}</span>
                }
                  <span className={isPopupOpen?style.topArow :style.downArow}> {/*<FontIcon name="rightArow" size="size16" color="color5"/>*/} </span>
                </a>
              </div>
              <div className={isPopupOpen? position == "top"? style.topListView:style.listview: style.hide} >
                <div className={searchField? style.searchinp: style.hide} onClick={ removeClose }>
                  <input type="text" id="testtest" className={style.searchicon} onChange={ this.handleChange}
                    value={ searchString } onKeyUp= { this.handleKeyUp} ref="inputField" ></input>
                  <span className={style.searchIcon}>
                   {/* <FontIcon name="search" color="color5" size="size14"/> */}
                  </span>
                </div>
                <ul className={style.listmenu} data-testid="suggestionContainer">
                  { suggestionsListElements }
                </ul>
              </div>
            </div>
  }

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

