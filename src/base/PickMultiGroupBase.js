import React from 'react';

export class PickItemBase extends React.Component {
 
  constructor(props) {    
  
  	super(props);
    this.onPickItem = this.onPickItem.bind(this);
   
  }
  
  onPickItem(newSelectedItemPid, ev) {
	  
     this.props.onSelectItem(newSelectedItemPid,ev.target);
  }
  
 render() {
 		
 	 let itemPid = this.props.pid;	
	 let selectedItemStyle = (this.props.selectedPids.indexOf(itemPid) != -1 ) ? this.props.selectedItemStyle : "";
	 let itemStyles = selectedItemStyle + " "+ (this.props.styles || '') +" "+ ( this.props.normalItemStyle  || "" );
	
    return (itemPid ? (<div className={itemStyles} onClick={ (ev)=>{this.onPickItem(itemPid, ev) } }  > 
    				
    				{this.props.children}
    				
     </div>) : null);
  }
}

export default class PickMultiGroupBase extends React.Component {
 
  constructor(props ) {
    super(props)
    // Bind the method to the component context
    this.renderChildren = this.renderChildren.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this)
    this.state = { selectedPids : this.props.selectedPids };
  }
  
  onSelectItem( newSelectedPid, selectEl ){
  
  	   this.setState((state)=>{ 
  	 				let selectedPids = state.selectedPids;
					let itemPosition = selectedPids.indexOf(newSelectedPid);
  	 				if(itemPosition == -1){
  	 					selectedPids.push( newSelectedPid )
  	 				}
  	 				else{
  	 			       selectedPids.splice(itemPosition, 1);
  	 				}
  	 				
  	 				return { selectedPids };
  	 				
  	   },function(){ 
  	   
  		 let selectedPids = this.state.selectedPids;
		 let itemPosition = selectedPids.indexOf(newSelectedPid);
			
  	   	this.props.onSelect && this.props.onSelect( selectedPids ,{
  	   			id : newSelectedPid , 
  	   			active : (itemPosition !== -1)  
  	   	}, selectEl); 
  	   	
  	   });
  	    
  }
  
  renderChildren() {
   
	  return React.Children.map(this.props.children, child => {

		  if(child.type.prototype === PickItemBase.prototype){

			  return React.cloneElement(child, {
				  selectedPids : this.state.selectedPids,
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

PickMultiGroupBase.defaultProps = {
	styles : {}
}

/*

	styles.group
	styles.active
	styles.item
	
<PickMultiGroupBase styles={{ group ,  active , item }} selectedPids={["female","hello"]} 
	 onSelect={this.onSelectPickItem}  > 
		
	<PickItemBase styles="" pid="male" > male </PickItem>
    <PickItemBase styles="" pid="female" > female </PickItem>
    <PickItemBase styles="" pid="none" > none  </PickItem> 
    <PickItemBase styles="" pid="hello" > hello  </PickItem> 
    
</PickMultiGroupBase>  

*/