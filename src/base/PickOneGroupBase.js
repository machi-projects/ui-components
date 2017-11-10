import React from 'react';

export class PickOneItemBase extends React.Component {
 
  constructor(props) {
  
  	super(props);
    this.onPickItem = this.onPickItem.bind(this);
   
  }
  
  onPickItem(newSelectedItemPid, ev) {
     this.props.onSelectItem(newSelectedItemPid,ev.target);
  }
  
 render() {
 		
 	 let itemPid = this.props.pid;	
	 let selectedItemStyle = itemPid == this.props.selectedPid ? this.props.selectedItemStyle : "";
	 let itemStyles = selectedItemStyle + " "+ (this.props.styles || '') +" "+ ( this.props.normalItemStyle  || "" );
	
    return (itemPid ? (<div className={itemStyles} onClick={ (ev)=>{this.onPickItem(itemPid, ev) } }  > 
    				
    				{this.props.children}
    				
     </div>) : null );
  }
}

export default class PickOneGroupBase extends React.Component {
 
  constructor(props) {
    super(props)
    // Bind the method to the component context
    this.renderChildren = this.renderChildren.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this)
    this.state = { selectedPid : this.props.selectedPid };
  }
  
  onSelectItem( newSelectedPid, selectEl ){
  	 
  	 this.setState({ selectedPid : newSelectedPid }, function(){ 
  	 	
  	 	this.props.onSelect && this.props.onSelect( this.state.selectedPid ,  selectEl );
  	
  	 });
  	
  }
  
  renderChildren() {
  
	  return React.Children.map(this.props.children, (child,i) => {
		  
		  if(child.type.prototype === PickOneItemBase.prototype){
			
			  return React.cloneElement(child, {
				  key : i ,
				  selectedPid : this.state.selectedPid,
				  onSelectItem : this.onSelectItem,
				  selectedItemStyle : this.props.styles.active,
				  normalItemStyle : this.props.styles.item
			  })
			  
		  }
		  
	  })
  }
  
  render() {
  
    return (
      <div className={this.props.styles.group}>
        {this.renderChildren()}
      </div>
    );
    
  }
}

PickOneGroupBase.defaultProps = {
		styles : {}
}


/*

	styles.group
	styles.active
	styles.item
	
<PickOneGroupBase styles={} selectedPid="female"
   onSelect={this.onSelectPickItem} > 
	
	<PickItemBase styles="" pid="male" > male </PickItem>
 	<PickItemBase styles="" pid="female" > female </PickItem>
 	<PickItemBase styles="" pid="none" > none  </PickItem> 
 
</PickOneGroupBase>

*/

