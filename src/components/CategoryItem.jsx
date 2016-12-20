import React, {Component} from 'react'
import { MenuItem} from 'material-ui'
import '../styles/SectionItem.css'


export default class CategoryItem extends Component{
  render(){
    const isActiveCategory = !this.props.category.toLowerCase().localeCompare(this.props.item.toLowerCase()) ? true : false
    return(
      <MenuItem

        {...isActiveCategory ? { className:"active-section-item" } : { className:"section-item" } }
        onTouchTap={()=>{
        this.props.closeDrawer()
        this.props.selectFilterDate(null)
        this.props.selectedCategory(this.props.item)
        this.props.fetchArticlesIfNeeded(this.props.item)
      }}>
        {this.props.item.toUpperCase()}
      </MenuItem>
    )
  }
}
