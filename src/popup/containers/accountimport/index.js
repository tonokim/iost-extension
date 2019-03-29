
import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { injectIntl, FormattedMessage } from 'react-intl'
import _trim from 'lodash/trim'
import './style.less'

@inject("rootStore")
@observer
class AccountImport extends Component {
  constructor(props){
    super(props)
    this.state = {
      privateKey: '',
      loading: false
    }
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
      const privateKey = _trim(this.state.privateKey)
      
    } catch (err) {
      
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
          <textarea 
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