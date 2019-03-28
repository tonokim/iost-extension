
import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import style from './style.less'

@inject("rootStore")
@observer
export default class  extends Component {
  constructor(props){
    super(props)
    this.store = this.props.rootStore
  }

  componentDidMount() {
    
  }

  render(){
    return(
      <div >
      popup
      </div>
    )
 }
}