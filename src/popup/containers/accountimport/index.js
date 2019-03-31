
import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { injectIntl, FormattedMessage } from 'react-intl'
import _trim from 'lodash/trim'
import { privateKeyToPublicKey, getAccountBypublickKey, addAccounts, hasCurrentAccount, getCurrentAccount } from '@popup/utils'
import iost from '@popup/iost'
import './style.less'

@inject("rootStore")
@observer
class AccountImport extends Component {
  state = {
    privateKey: '',
    loading: false
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
    try {
      this.setState({
        loading: true
      })
      let accounts = []
      const privateKey = _trim(this.state.privateKey)
      if(!privateKey){
        return Toast.html(this.formatMsg({id: 'ImportAccount_Tip2'}))
      }
      const publicKey = privateKeyToPublicKey(privateKey)
      if(!publicKey){
        return Toast.html(this.formatMsg({id: 'ImportAccount_Tip3'}))
      }
      let accounts1 = await getAccountBypublickKey(publicKey, true)
      let accounts2 = await getAccountBypublickKey(publicKey, false)
      accounts1 = accounts1.map(item => {
        return {
          name: item.account_info.name,
          network: 'MAINNET',
          privateKey,
          publicKey,
          type: 'iost'
        }
      })
      accounts2 = accounts2.map(item => {
        return {
          name: item.account_info.name,
          network: 'TESTNET',
          privateKey,
          publicKey,
          type: 'iost'
        }
      })
      accounts = accounts1.concat(accounts2)
      if(!accounts.length){
        return Toast.html(this.formatMsg({id: 'ImportAccount_Tip1'}))
      }
      
      this.setState({
        loading: false
      })
      const hasCurAccount = hasCurrentAccount()
      addAccounts(accounts)
      this.store.user.initAccounts()
      this.store.user.initCurrentAccount()
      if(hasCurAccount){
        // this.store.app.onReplacePage('accountManage')
      }else {
        const currentAccount = getCurrentAccount()
        iost.changeAccount(currentAccount)
      }

    } catch (err) {
      console.log(err)
    }
  }

  onBack = () => {
    this.store.app.onBackPage()
  }

  onGamehubImport = () => {

  }

  render(){
    const { loading } = this.state
    const { pages } = this.store.app
    return(
      <div className="account-import-container">
        <Header title={this.formatMsg({id: 'firstLogin_ImportAccount'})} logo={pages.length<=1} onBack={this.onBack}/>
        <div className="account-import-box">
          <Input
            type="textarea" 
            name="privateKey" 
            autoFocus
            className="privateKey" 
            onChange={this.onChange} 
            placeholder={this.formatMsg({id: 'ImportAccount_EnterPrivate'})}
          />
          <p className="account-import-Gamehub">
            <span onClick={this.onGamehubImport}>{this.formatMsg({id: 'Import_Gamehub_Account'})}&gt;</span>
          </p>
          <Button className="btn-submit" onClick={this.onSubmit}>{loading ? <Icon type="loading" /> : this.formatMsg({id: 'ImportAccount_Submit'})}</Button>
        </div>
      </div>
    )
 }
}

export default injectIntl(AccountImport)