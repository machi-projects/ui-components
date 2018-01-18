import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../index';
import style from './Pill.css';

export default class Pill extends React.Component {

  constructor(props) {
    super(props);
    this.onBackIconClick = this.onBackIconClick.bind(this);
    this.onClick         = this.onClick.bind(this);
  }
  onClick(e){
     let { onClick, link } = this.props;
     if(onClick){
        e.preventDefault();
        onClick(link);
     }
  }
  onBackIconClick(e){
    let {id,onBackIconClick} = this.props;
    onBackIconClick(id,e);
  }

  render() {
  	let {link=null,text,frontIcon,backIcon,fronIconClick=null,type} = this.props;
    return (
    	<span className={type == "tag"?style.tag:style.pill}>
  		  <span className={style.pillBody} onClick={this.onClick}>
  		  	 {frontIcon && <span className={style.pillTypeIcon}>
  			  	 <Icon id={frontIcon.name} size={frontIcon.size} />
  			  </span>}
  			  <span className={type == "tag"?style.tagColor+" "+style.pillLabel:style.pillLabel} title={text}>{text}</span>
  		  </span>
  		  { backIcon &&<span className={style.pillRemove} >
  		  	 <span><Icon id={backIcon.name} size={backIcon.size} onClick={this.onBackIconClick}/></span>
  		  </span> }
		  </span>
    );
  }
}

Pill.propTypes = {
  	link     : PropTypes.string,
  	text     : PropTypes.string.isRequired,
  	frontIcon: PropTypes.shape({
                  name : PropTypes.string.isRequired,
                  size : PropTypes.string.isRequired
               }),
  	backIcon : PropTypes.shape({
                  name : PropTypes.string.isRequired,
                  size : PropTypes.string.isRequired
               })
}
