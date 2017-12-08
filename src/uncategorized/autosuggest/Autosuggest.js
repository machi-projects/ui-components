import React from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';

import {i18NProviderUtils} from 'fz-i18n';


import style from "./Autosuggest.css";
import Input from "../form/Input";
import Popup from "../Popup.js";

class Autosuggest extends React.Component{
      constructor(props){
          super(props);
          this.id= null;
          this.startTime= null;
          this.state={
              showSuggestion: false,
              focusedSuggestion: 0,
              selectedValue: props.value || null,
              searchValue: props.value && props.value[props.textField] || ""
          }
          this.documentClickHandler= this.documentClickHandler.bind(this);
          this.handleHover = this.handleHover.bind(this);
          this.handleBlur= this.handleBlur.bind(this);
          this.handleChange= this.handleChange.bind(this);
          this.handleKeyUp= this.handleKeyUp.bind(this);
          this.handleFocus= this.handleFocus.bind(this);
      }
      componentDidMount() {
          document.addEventListener("click", this.documentClickHandler);
      }
      render (){
          let {
                id, styles={}, RenderSuggestion, suggestions=[], valueField, textField, searchKeys, searchType,onClick, placeholder,isShowNoResult=false,
                isReadOnly,   maxLength, errorMsg, value, isSearching, isPopupOpen, isSuggest
              }= this.props;
          let { searchValue,focusedSuggestion,showSuggestion }= this.state;

          let filterSuggestions= this.filterSuggestions(searchValue,suggestions,searchKeys,searchType) || []
          let suggestLists=[]
          if(isSearching){
                suggestLists = [<RenderSuggestion
                                    key="asd"
                                    className={style.option1}
                                    {...{[textField]:i18NProviderUtils.getI18NValue("cp.label.searching")}}
                                  />]
           }else if(filterSuggestions.length ){
                suggestLists =  filterSuggestions.map((suggestion,index)=>{
                            let isFocused= this.state.focusedSuggestion === index;
                            return <RenderSuggestion
                                      ref={"suggestion_"+index}
                                      key= { index }
                                      index = {index}
                                      { ...suggestion }
                                      handleClick={this.handleClick.bind(this,suggestion)}
                                      isFocused={isFocused}
                                      onHover={this.handleHover}
                                      className={isFocused ? style.optionFocus :style.option}
                                    />
                          })
           }else if(isShowNoResult){
                suggestLists= [<RenderSuggestion
                              key="asd"
                              className={style.option1}
                              {...{[textField]:i18NProviderUtils.getI18NValue("support.no.matches.found")}}
                            />]
           }

          return <div className= {styles.container? styles.container: style.container } data-testid = {this.props["data-testid"]}>
                  <Input
                      id = {id}
                      ref= "input"
                      type="text"
                      autoComplete="off"
                      data-testid = {this.props["data-testid"]}
                      value={searchValue}
                      maxlength={maxLength}
                      onClick = {onClick}
                      onChange= {this.handleChange}
                      onBlur={ this.handleBlur }
                      onKeyUp= { this.handleKeyUp }
                      onFocus={this.handleFocus}
                      placeHolder={placeholder}
                      readOnly={isReadOnly}
                    />
            <div id="suggestionContainer" className= { style.suggestions } onClick= {this.removeClose}>
              <div>
                    {
                        isPopupOpen && suggestLists.length && this.state.showSuggestion && isSuggest ? <ul className={ style.listmenu } ref="resultContainer">
                           {
                              suggestLists
                            }
                         </ul> : ""
                    }
              </div>
            </div>
          </div>
      }

      componentDidUpdate(){
          var suggestionContainer= ReactDom.findDOMNode(this.refs.resultContainer);
          var selSuggestion= ReactDom.findDOMNode(this.refs["suggestion_"+this.state.focusedSuggestion]);
          if(selSuggestion && suggestionContainer){
              if(suggestionContainer.scrollHeight==selSuggestion.offsetTop+selSuggestion.offsetHeight){
                  suggestionContainer.scrollTop= selSuggestion.offsetTop
              }else if(selSuggestion.offsetTop==0){
                  suggestionContainer.scrollTop=0;
              }else if(suggestionContainer.offsetHeight + suggestionContainer.scrollTop < selSuggestion.offsetTop){
                  suggestionContainer.scrollTop= selSuggestion.offsetTop-170;
              }else if(suggestionContainer.scrollTop> selSuggestion.offsetTop){
                  suggestionContainer.scrollTop= selSuggestion.offsetTop;
              }
          }
      }

      componentWillReceiveProps(nextProps) {
        let searchValue=nextProps.value[nextProps.textField] ||  ""
          this.setState({
              searchValue
          })
      }


      componentWillUnmount() {
          document.removeEventListener("click", this.documentClickHandler);
      }

      handleFocus(){
          this.props.onFocus && this.props.onFocus(true)
      }

      documentClickHandler(){
          this.state.showSuggestion && this.setState({
            showSuggestion: false
          })
      }

      removeClose(e){
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
      }

      filterSuggestions(searchValue,suggestions,searchKeys,searchType){
          let filterList = searchValue && suggestions.length && suggestions.filter((suggestion)=>{
              return searchKeys && searchKeys.some((searchKey)=>{
                  return suggestion[searchKey] && suggestion[searchKey].toLowerCase()[searchType](searchValue.toLowerCase());
              }) || true;
          }) || suggestions;
          return filterList;
      }

      handleKeyUp(val,id,e){
          let keyCode= e.keyCode;
          let { textField,valueField,searchKeys,searchType,suggestions,inputType,onSelect,onKeyup }= this.props;
          let { focusedSuggestion,showSuggestion,selectedValue }= this.state;
          let searchValue= this.refs.input ? this.refs.input.value : "" ;
          let suggestionList= this.filterSuggestions(searchValue,suggestions,searchKeys,searchType);
          let suggestionLength= suggestionList.length;
          if(showSuggestion && suggestionLength){
              switch (keyCode) {
                  case 40:
                  case 34:
                      if(focusedSuggestion === suggestionLength-1 || focusedSuggestion==null){
                          focusedSuggestion= 0;
                      }else{
                          focusedSuggestion+=1;
                      }
                      break;
                  case 38:
                  case 33:
                      if(focusedSuggestion === 0 || focusedSuggestion==null){
                        focusedSuggestion= suggestionLength-1;
                      }else{
                        focusedSuggestion-=1;
                      }
                      break;
                  case 13:
                      selectedValue= suggestionList[focusedSuggestion];
                      let value={ [valueField]: selectedValue[valueField],[textField]: selectedValue[textField] }
                      onKeyup && onKeyup(value,id,e)
                      showSuggestion= false;
                      onSelect(value,id,e);
                      break;
                  case 9:
                  case 27:
                      showSuggestion= false
                      break;
              }
              this.setState({
              focusedSuggestion,showSuggestion,selectedValue
              })
          }

      }

      handleClick(selectedSuggestion,e){
          e && e.preventDefault
          this.setState({
              selectedValue: selectedSuggestion,
              showSuggestion: false
          })
          let {valueField,textField,onSelect,id}= this.props

          let value= {
              [valueField]: selectedSuggestion[valueField],
              [textField]: selectedSuggestion[textField]
          }
          onSelect && onSelect(value,id,e);
      }

      handleHover(index){
          this.setState({focusedSuggestion : index});
      }

      handleBlur(value, id,e){
          this.props.onBlur && this.props.onBlur(value,id,e)
      }

      handleChange(value, id, e){
          let inputElement= ReactDom.findDOMNode(this.refs.input);
          let { valueField, textField, isApiCall, callApi, onChange, openPopupOnly }=this.props;

          this.setState({
              searchValue: value,
              focusedSuggestion: 0,
              showSuggestion: true,
              selectedValue: {[valueField]: "",[textField]: value}
          })
          if(isApiCall){
              if(this.startTime){
                if(new Date().getTime()-this.startTime<750){
                  clearTimeout(this.id);
                }
              }
              this.id= setTimeout(()=>{
              value ? callApi(value):"";
              },250);
              this.startTime= new Date().getTime();
          }
          value && openPopupOnly(e)
          onChange( value, id, e );
      }
}



Autosuggest.defaultProps= {
valueField: "id",
textField: "name",
searchType: "startsWith"

};
export default Popup(Autosuggest);




Autosuggest.propTypes={
    suggestions:PropTypes.array.isRequired,
    searchKeys:PropTypes.array,
    id:PropTypes.string,
    valueField:PropTypes.string,
    textField:PropTypes.string,
    searchType:PropTypes.string,
    placeholder:PropTypes.string,
    maxLength:PropTypes.string,
    errorMsg:PropTypes.string,
    value:PropTypes.object,
    isSuggest:PropTypes.bool,
    isSearching:PropTypes.bool,
    isPopupOpen:PropTypes.bool,
    isSearch:PropTypes.bool,
    isShowNoResult:PropTypes.bool,
    isReadOnly:PropTypes.bool,
    isApiCall:PropTypes.bool,
    onChange:PropTypes.func.isRequired,
    onBlur:PropTypes.func,
    onSelect:PropTypes.func,
    onKeyup:PropTypes.func,
    onClick:PropTypes.func,
    openPopupOnly:PropTypes.func,
    callApi:PropTypes.func,
    }
