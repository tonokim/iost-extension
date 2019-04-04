
import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { Header, Icon, Input, Button, Toast } from '@popup/components'
import { injectIntl, FormattedMessage } from 'react-intl'
import { delay } from 'utils'
import './style.less'

@inject("rootStore")
@observer
class GasManage extends Component {
  state = {

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

  componentWillUnmount() {
    this._isMounted = false
  }

  getData = async () => {
    while(this._isMounted && !this.state.isError){
      try {
        await this.store.user.getAccountInfo()
        await delay(5000)
      } catch (err) {
        console.log(err)
      }
    }
  }

  render(){
    const { formatMessage: formatMsg } = this.props.intl
    return(
      <div className="gas-manage-container'">
        <div className="gas-manage-box">

        </div>
      </div>
    )
 }
}

export default injectIntl(GasManage)