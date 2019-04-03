
import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { injectIntl, FormattedMessage } from 'react-intl'
import { addAccounts, hasCurrentAccount, getCurrentAccount } from '@popup/utils'
import oasis from 'utils/oasis'
import './style.less'

@inject("rootStore")
@observer
class OasisImport extends Component {
  state = {
    phone: '',
    password: '',
    loading: false
  }

  constructor(props){
    super(props)
    this.store = this.props.rootStore
  }

  componentDidMount() {
    document.body.addEventListener('keypress',this.onKeyPress)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keypress',this.onKeyPress)
  }

  onKeyPress = (e) => {
    const key = (e.shiftKey ? 'shift+' : '') + e.keyCode || e.which;
    if(key == '13'){
      e.stopPropagation();
      e.preventDefault();
      this.onSubmit()
    }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  onSubmit = async () => {
    const { formatMessage: formatMsg } = this.props.intl
    this.setState({
      loading: true
    })
    const { phone, password } = this.state
    if(phone == '' || password == ''){
      Toast.html(formatMsg({id: 'ImportAccount_Tip2'}))
      this.setState({
        loading: false
      })
      return
    }
    try {
      const { AccessToken: token, RefreshToken: retoken } = await oasis.login(phone, password)
      let account = {
        type: 'oasis',
        network: 'TESTNET',//,'MAINNET'
        phone,
        password,
        token,
        retoken,
      }
      const { Username: name, ProxyAccount: proxyAccount } = await oasis.info(account)
      account = {...account, name, proxyAccount}
      const hasCurAccount = hasCurrentAccount()
      addAccounts([account])
      this.store.user.initAccounts()
      this.store.user.initCurrentAccount()
      if(!hasCurAccount){
        const currentAccount = getCurrentAccount()
        iost.changeAccount(currentAccount)
      }
      this.store.app.onReplacePage('accountManage')
    } catch (err) {
      console.log(err)
      if(typeof err == 'string'){
        Toast.html(err,3)
        // if(err.indexOf('phone or password wrong') > -1){
        // }
      }
      this.setState({
        loading: false
      })
    }
  }

  render(){
    const { loading } = this.state 
    const { formatMessage: formatMsg } = this.props.intl
    return(
      <div className="oasis-import-container">
        <Header title={formatMsg({id: 'Import_Oasis_Account'})} />
        <div className="oasis-import-box">
          <Input 
            type="text" 
            placeholder={formatMsg({id: 'Phone_number'})} 
            name="phone" 
            onChange={this.onChange}
          />
          <Input 
            type="password" 
            placeholder={formatMsg({id: 'Password'})} 
            name="password" 
            onChange={this.onChange}
          />
          <p className="links">
            <a target="_blank" href="https://oasisglobal.io/signup">{formatMsg({id: 'Register'})}</a>
            <a target="_blank" href="https://oasisglobal.io/reset">{formatMsg({id: 'Forgot_password'})}</a>
          </p>
          <Button className="btn-submit" onClick={this.onSubmit}>{loading ? <Icon type="loading" /> : formatMsg({id: 'ImportAccount_Submit'})}</Button>
        </div>
      </div>
    )
 }
}

export default injectIntl(OasisImport)