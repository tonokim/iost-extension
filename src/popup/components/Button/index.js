
import React, { Component } from 'react'
import classnames from 'classnames'
import { Icon } from '@popup/components'
import style from './style.less'

export default class  extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { className, loading, onClick, children } = this.props
    return(
      <button className={classnames('button-container', className)} onClick={onClick}>
        {loading?<Icon type="loading"/>:children}
      </button>
    )
 }
}