import React, {Component} from 'react'
import {Drawer, MenuItem} from 'material-ui'


export default class SectionItem extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <MenuItem onTouchTap={()=>{
        console.log(this.props);
        this.props.closeDrawer()
        this.props.selectedCategory(this.props.item)
        this.props.fetchArticlesIfNeeded(this.props.item)
      }}>
        {this.props.item.toUpperCase()}
      </MenuItem>
    )
  }
}
