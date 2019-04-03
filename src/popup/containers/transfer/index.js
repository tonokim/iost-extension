
import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { injectIntl, FormattedMessage } from 'react-intl'
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import config from 'utils/config'
import iost from '@popup/iost'
import cx from 'classnames'
import './style.less'

@inject("rootStore")
@observer
class Transfer extends Component {
  state = {
    amount: 0,
    to: '',
    memo: '',
    iGASPrice: config.defaultConfig.gasRatio,
    iGASLimit: config.defaultConfig.gasLimit,
    errorMessage: '',
    loading: false,
    isEditiGas: false
  }

  _isMounted = false

  constructor(props){
    super(props)
    this.store = this.props.rootStore
  }

  componentDidMount() {
    this._isMounted = true
    this.getData()
  }

  getData = async () => {
    // while(this._isMounted){
    //   await this.getResourceBalance()
    //   await utils.delay(5000)
    // }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  onToggle  = () => {
    this.setState({
      isEditiGas: !this.state.isEditiGas
    })
  }

  onSubmit = async () => {
    const { to, amount, iGASPrice, iGASLimit, memo } = this.state
    const { currentAccount } = this.store.user
    if(to == '' || amount <= 0){
      return
    }
    try {
      const memo = ['iost', currentAccount.name, to, amount, memo]
      const rlt = await iost.signAndSend('token.iost','transfer', memo)
      console.log(rlt)
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    const { iGASPrice, iGASLimit, errorMessage, isEditiGas, loading } = this.state
    const { formatMessage: formatMsg } = this.props.intl
    return(
      <div className="transfer-container">
        <Header title={formatMsg({id: 'Account_Transfer'})} />
        <div className="transfer-box">
          <p className="input-label-box">
            <span>{formatMsg({id: 'Transfer_Amount'})}</span>
            <span className="balance">{formatMsg({id: 'Transfer_Balance'}, { num: 0, token: 'IOST' })}</span>
          </p>
          <Input
            name="amount"
            onChange={this.onChange}
            placeholder={formatMsg({id: 'Transfer_InputAmount'})}
          />
          <p className="input-label-box"><span>{formatMsg({id: 'Transfer_Payee'})}</span></p>
          <Input
            name="to"
            onChange={this.onChange}
            placeholder={formatMsg({id: 'Transfer_EnterName'})}
          />
          <p className="input-label-box"><span>{formatMsg({id: 'Transfer_Note'})}</span></p>
          <Input
            name="memo"
            onChange={this.onChange}
            placeholder={formatMsg({id: 'Transfer_Optional'})}
          />
          <p className="input-label-box">
            <span>{formatMsg({id: 'Transfer_Resource'})}</span>
            <span className="igas-price" onClick={this.onToggle}>0 iGas<Icon type="arrow" className="right"/></span>
          </p>
          <Input
            name="iGASPrice"
            value={iGASPrice}
            onChange={this.onChange}
            className={isEditiGas?'':'hide'}
          />
          <Input
            name="iGASLimit"
            value={iGASLimit}
            onChange={this.onChange}
            className={isEditiGas?'':'hide'}
          />
          <p className="error-message">{errorMessage}</p>
          <Button className="btn-submit" onClick={this.onSubmit}>{loading ? <Icon type="loading" /> : formatMsg({id: 'Transfer_Submit'})}</Button>
        </div>
      </div>
    )
 }
}

export default injectIntl(Transfer)