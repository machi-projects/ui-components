
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabsBase, {
  TabsHeaderBase ,
  TabItemBase ,
  TabsBodyBase ,
  TabContentBase
 } from '../../js/core/TabsBase';

import styles from './tabs.css';
import styleMapping from './styleMapping';

export class TabItem extends Component {
  render(){
    return(null);
  }
}

TabItem.propTypes ={
	id : PropTypes.string.isRequired
}

export class TabsHeader extends Component {
  render(){
    return(null);
  }
}

TabsHeader.propTypes = {
	children : PropTypes.oneOfType([
		PropTypes.shape({ name: PropTypes.oneOf( ["TabItem"] ) } )  ,
		PropTypes.arrayOf(  PropTypes.shape({ name: PropTypes.oneOf( ["TabItem"] ) } ) )
	])
}

export class TabContent extends Component {
  render(){
    return(null);
  }
}

TabContent.propTypes ={
	id : PropTypes.string.isRequired
}

export class TabsBody extends Component {
  render(){
    return(null);
  }
}

TabsBody.propTypes ={
  children : PropTypes.oneOfType([
    PropTypes.shape({ name: PropTypes.oneOf( ["TabContent"] ) } )  ,
    PropTypes.arrayOf(  PropTypes.shape({ name: PropTypes.oneOf( ["TabContent"] ) } ) )
  ])
}

export default class Tabs extends Component {

  render() {

    let { styleId , selectedTab  , onSelectTab , groupName } = this.props;

    let tabsStyle = styles[styleId];

    let headerStyleMappings = styleMapping[ styleId ].headerStyles;
    let bodStyleMappings = styleMapping[ styleId ].bodyStyles;

    let tabsHeaderStyles = {
      active : styles[ headerStyleMappings.selectedItemStyle ]  ,
      item : styles[ headerStyleMappings.itemStyle ],
      group : styles[ headerStyleMappings.groupStyle ]
    };

    let tabsBodyStyles = {
      active : styles[ bodStyleMappings.selectedItemStyle ]  ,
      item : styles[ bodStyleMappings.itemStyle ],
      group : styles[ bodStyleMappings.groupStyle ]
    }

    return (<TabsBase groupName={groupName} tabsStyle={tabsStyle} selectedTab={selectedTab} onSelectTab={onSelectTab} >

            {
              React.Children.map(this.props.children, (child, i) => {

                if(child.type.prototype === TabsHeader.prototype)
                {
                   return <TabsHeaderBase {...child.props} styles={tabsHeaderStyles}  />
                }
                else if(child.type.prototype === TabsBody.prototype)
                {
                   return <TabsBodyBase {...child.props} styles={tabsBodyStyles}  />
                }

              })
            }

      </TabsBase>);

  }

}

Tabs.defaultProps = {
    styleId : "default"
};

Tabs.propTypes = {

  styleId : PropTypes.string,
  selectedTab : PropTypes.string,
  onSelectTab : PropTypes.func,

  children : PropTypes.oneOfType([
    PropTypes.shape({ name: PropTypes.oneOf( ["TabsHeader","TabsBody"] ) } )  ,
    PropTypes.arrayOf( PropTypes.shape({ name: PropTypes.oneOf( ["TabsHeader","TabsBody"] ) } ) )
  ])

};

if(__DOCS__){
  Tabs.docs = {
    componentGroup: "Molecule"
  };
}
