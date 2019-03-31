
import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import './style.less'

@inject("rootStore")
@observer
class Home extends Component {
  state = {
    loading: true
  }

  constructor(props){
    super(props)
    this.store = this.props.rootStore
    this.formatMsg = this.props.intl.formatMessage
  }

  render(){
    const { currentAccount } = this.store.user
    const type = currentAccount.type || 'iost'
    return(
      <div className="home-container">
        <Header logo>
          <div className="account-current-box"></div>        
        </Header>
        <div className="account-box">
          123
        </div>
      </div>
    )
 }
}
export default injectIntl(Home)