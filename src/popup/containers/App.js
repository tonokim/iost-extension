
import React, { Component } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { inject, observer } from "mobx-react";
import { hasRegister, getLockState, hasAccounts, getAccounts, hasCurrentAccount, getCurrentAccount } from '@popup/utils'
import './style.less'
import chooseLocale from '@popup/i18n'

import Register from './register'
import AccountImport from './accountimport'
import Lock from './lock'
import Home from './home'

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import ko from 'react-intl/locale-data/ko';
addLocaleData([...en,...zh, ...ko]);


@inject("rootStore")
@observer
export default class  extends Component {
  constructor(props){
    super(props)
    this.store = this.props.rootStore
  }

  componentDidMount() {
    this._init()
  }

  _init = async () => {
    try {
      const isRegister = await hasRegister()
      if(!isRegister){
        return this.store.app.onReplacePage('register')
      }
      const isLock = getLockState()
      if(isLock){
        return this.store.app.onReplacePage('lock')
      }
      if(!hasAccounts()){
        return this.store.app.onReplacePage('accountImport')
      }
      const accounts = await getAccounts()
      this.store.user.setAccounts(accounts)

      const hasCurAccount = hasCurrentAccount()

    } catch (err) {
      console.log(err)
    }
  }

  render(){
    const { currentPage, lan } = this.store.app
    let renderComponent = <div></div>
    switch(currentPage){
      case 'register':
        renderComponent = <Register />
        break;
      case 'accountImport':
        renderComponent = <AccountImport />
        break;
      case 'lock':
        renderComponent = <Lock />
        break;
      case 'home':
        renderComponent = <Home />
        break;
      default: 
        renderComponent = <Register />
        break;
    }
    return(
      <IntlProvider
        locale={lan}
        messages={chooseLocale(lan)}
      >
        {renderComponent}
      </IntlProvider>
    )
 }
}