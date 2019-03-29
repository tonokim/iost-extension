
import React, { Component } from 'react'
import { Icon } from '@popup/components'
import style from './style.less'

export default class  extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { logo, back, onBack, setting, onSetting, addAccount, onImportAccount, title, children } = this.props
    return(
      <div className="header-container">
        {logo && <Icon type="logo"/>}
        {back && <Icon type="back" onClick={onBack}/>}
        { title && <span className="title">{title}</span> }
        { setting ? <Icon type="setting" onClick={onSetting}/> : addAccount ? <span onClick={onImportAccount} className="add-account-box">123</span>: <i />}
      </div>
    )
 }
}