
import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.less'

export default class  extends Component {
  constructor(props){
    super(props)
  }
  render(){
  const { type, active, onClick } = this.props
    return(
      <i className={classnames(`icon-${type}`, active?'active':'')} onClick={onClick}/>
    )
 }
}