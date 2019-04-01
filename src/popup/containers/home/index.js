
import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { setCurrentAccount } from '@popup/utils'
import { getAccountKey, cx } from 'utils'
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
    this.formatMsg = this.props.intl.formatMessage
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
  }

  render(){
    const { visible, loading } = this.state
    const { currentAccount, accounts } = this.store.user
    const type = currentAccount.type || 'iost'
    return(
      <div className="home-container">
        <Header logo setting>
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
                  <span className="title">{item.type=='theseus'?'GameHub ':'IOST '}{this.formatMsg({id: item.network != 'MAINNET'?'ManageAccount_Test':'ManageAccount_Official'})}</span>
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
            <Button>{this.formatMsg({id: 'Account_Transfer'})}</Button>
            <Button>{this.formatMsg({id: 'Account_Receive'})}</Button>
          </ButtonBox>
          <ButtonBox className={type == 'theseus'?'':'hide'}>
            <a href="http://endless.game" target="_blank">{this.formatMsg({id: 'Deposit'})}</a>
            <a href="http://endless.game" target="_blank">{this.formatMsg({id: 'Start_A_Game'})}</a>
          </ButtonBox>
        </div>
      </div>
    )
 }
}
export default injectIntl(Home)