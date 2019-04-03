
import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { setCurrentAccount } from '@popup/utils'
import { getAccountKey } from 'utils'
import cx from 'classnames'
import './style.less'

const ButtonBox = Button.ButtonBox

@inject("rootStore")
@observer
class Home extends Component {
  state = {
    loading: true,
    visible: false
  }

  constructor(props){
    super(props)
    this.store = this.props.rootStore
  }

  onToggle = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  onSwitchAccount = (e) => {
    const key = e.currentTarget.dataset.key
    setCurrentAccount(key)
    this.store.user.initCurrentAccount()
    this.onToggle()
  }

  onEnterQrcode = () => {
    this.store.app.onPushPage('qrcode')
  }

  onEnterTransfer = () => {
    this.store.app.onPushPage('transfer')
  }

  render(){
    const { formatMessage: formatMsg } = this.props.intl
    const { visible, loading } = this.state
    const { currentAccount, accounts } = this.store.user
    const type = currentAccount.type || 'iost'
    return(
      <div className="home-container">
        <Header 
          logo 
          setting
        >
          <div className="account-current-box" onClick={this.onToggle}>
            <Icon type="circle" color={currentAccount.network != 'MAINNET' ? 'green' : ''}/>
            <span>{currentAccount.name}</span>
            <Icon type="arrow" className={accounts.length && visible?'down':'right'}/>
          </div>
        </Header>
        <div className="account-box">
          <ul className={cx('account-list', visible?'active':'')}>
            {accounts.map(item => {
              const key = getAccountKey(item)
              return(
                <li className={cx('account-item', item.network != 'MAINNET'?'test':'')} key={key} data-key={key} onClick={this.onSwitchAccount} >
                  <span className="title">{item.type=='oasis'?'Oasis ':'IOST '}{formatMsg({id: item.network != 'MAINNET'?'ManageAccount_Test':'ManageAccount_Official'})}</span>
                  <span className="name">{item.name}</span>
                  <Icon type="check" color={key == getAccountKey(currentAccount)?'black':''}/>
                </li>
              )
            })}
          </ul>
          <div className="token-balance-box">
            <a>
              <div className="logo-box">
                <Icon type="big-logo" className="iost"/>
              </div>
              <div className="amount-box">
                <span>{loading? <Icon type="loading"/>: 1}</span>
                <span>iost</span>
              </div>
            </a>
            
          </div>
          <ButtonBox className={type == 'iost'?'':'hide'}>
            <Button onClick={this.onEnterTransfer}>{formatMsg({id: 'Account_Transfer'})}</Button>
            <Button onClick={this.onEnterQrcode}>{formatMsg({id: 'Account_Receive'})}</Button>
          </ButtonBox>
          <ButtonBox className={type == 'oasis'?'':'hide'}>
            <a href="https://oasisglobal.io/deposit" target="_blank">{formatMsg({id: 'Deposit'})}</a>
            <a href="https://oasisglobal.io" target="_blank">{formatMsg({id: 'Start_A_Game'})}</a>
          </ButtonBox>
        </div>
      </div>
    )
 }
}
export default injectIntl(Home)