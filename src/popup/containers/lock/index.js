
import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { injectIntl, FormattedMessage } from 'react-intl'
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { setPassword, hasAccounts, unlock } from '@popup/utils'
import { sha256 } from 'utils'
import './style.less'

@inject("rootStore")
@observer
class Lock extends Component {
  state = {
    password: ''
  }
  constructor(props){
    super(props)
    this.store = this.props.rootStore
    this.formatMsg = this.props.intl.formatMessage
  }

  componentDidMount() {
    document.body.addEventListener('keypress',this.onKeyPress)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keypress',this.onKeyPress)
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  onKeyPress = (e) => {
    const key = (e.shiftKey ? 'shift+' : '') + e.keyCode || e.which;
    if(key == '13'){
      e.stopPropagation();
      e.preventDefault();
      this.onSubmit()
    }
  }

  onSubmit = async () => {
    const { password } = this.state
    try {
      await unlock(password)
      this.store.app.onReplacePage(hasAccounts()?'home':'accountImport')
    } catch (err) {
      Toast.html(this.formatMsg({id: 'Password_TryAgain'}))
    }
  }

  render(){
    return(
      <div className="lock-container">
        <div className="landing-box">
          <Icon type="home" />
        </div>
        <div className="lock-box">
          <Input
            name="password"
            type="password"
            className="input-password"
            onChange={this.onChange}
            placeholder={this.formatMsg({id: 'Lock_EnterPassword'})}
          />
          <Button onClick={this.onSubmit}>{this.formatMsg({id: 'Lock_Unlock'})}</Button>
        </div>
      </div>
    )
 }
}

export default injectIntl(Lock) 