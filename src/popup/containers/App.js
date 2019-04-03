
import React, { Component } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { inject, observer } from "mobx-react";
import { hasRegister, getLockState, hasAccounts, getCurrentAccount } from '@popup/utils'
import iost from '@popup/iost'
import './style.less'
import chooseLocale from '@popup/i18n'

import Register from './register'
import AccountImport from './accountImport'
import Lock from './lock'
import Home from './home'
import Setting from './setting'
import AccountManage from './accountManage'
import Language from './language'
import About from './about'
import Agreement from './agreement'
import ChangePwd from './changePwd'
import OasisImport from './oasisImport'
import Qrcode from './qrcode'
import Transfer from './transfer'

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
        this.store.app.onReplacePage('register')
      }else {
        const isLock = getLockState()
        if(isLock){
          this.store.app.onReplacePage('lock')
        }else {
          if(!hasAccounts()){
            this.store.app.onReplacePage('accountImport')
          }else {
            this.store.user.initAccounts()
            this.store.user.initCurrentAccount()
            const { currentAccount } = this.store.user
            iost.changeAccount(currentAccount)
            // this.store.app.onReplacePage('home')
            this.store.app.onReplacePage('transfer')
            // this.store.app.onReplacePage('qrcode')
            // this.store.app.onReplacePage('setting')
            // this.store.app.onReplacePage('accountManage')
            // this.store.app.onReplacePage('language')
            // this.store.app.onReplacePage('about')
            // this.store.app.onReplacePage('changePwd')
            // this.store.app.onReplacePage('oasisImport')
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
    this.store.app.setLoading(false)
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
      case 'setting':
        renderComponent = <Setting />
        break;
      case 'accountManage':
        renderComponent = <AccountManage />
        break;
      case 'language':
        renderComponent = <Language />
        break;
      case 'about':
        renderComponent = <About />
        break;
      case 'agreement':
        renderComponent = <Agreement />
        break;
      case 'changePwd':
        renderComponent = <ChangePwd />
        break;
      case 'oasisImport':
        renderComponent = <OasisImport />
        break;
      case 'qrcode':
        renderComponent = <Qrcode />
        break;
      case 'transfer':
        renderComponent = <Transfer />
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