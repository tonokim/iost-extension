
import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { Icon } from '@popup/components'
import style from './style.less'

@inject("rootStore")
@observer
class Header extends Component {
  constructor(props){
    super(props)
    this.store = this.props.rootStore
    this.formatMsg = this.props.intl.formatMessage
  }

  onSetting = () => {
    this.store.app.onPushPage('setting')
  }

  onImportAccount = () => {
    this.store.app.onPushPage('accountImport')
  }

  onBack = () => {
    if(this.props.onBack){
      this.props.onBack()
    }else{
      this.store.app.onBackPage()
    }
  }

  render(){
    const { logo, setting, addAccount, title, children } = this.props
    return(
      <div className="header-container">
        {logo? <Icon type="logo"/>: <Icon type="back" onClick={this.onBack}/>}
        { title && <span className="title">{title}</span> }
        {children}
        { setting ? <Icon type="setting" onClick={this.onSetting}/> : addAccount ? <span onClick={this.onImportAccount} className="add-account-box">{this.formatMsg({id: 'ManageAccount_Add'})}</span>: <i />}
      </div>
    )
 }
}

export default injectIntl(Header)