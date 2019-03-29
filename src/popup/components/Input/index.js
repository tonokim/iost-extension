
import React, { Component } from 'react'
import style from './style.less'

export default class  extends Component {
  static defaultProps = {
    onChange: () => {}
  }
  constructor(props){
    super(props)
  }

  onChange = (e) => {
    const name = e.target.name, value = e.target.value
    this.props.onChange(value, name)
  }

  render(){
    const { type = 'text', name, placeholder, autoFocus, className } = this.props
    if(type == 'textarea'){
      <div className="input-container">
        <textarea 
          name={name} 
          className={className}
          autoComplete="off" 
          onChange={this.onChange} 
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
    }
    return(
      <div className="input-container">
        <input 
          type={type} 
          name={name} 
          className={className}
          autoComplete="off" 
          onChange={this.onChange} 
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
    )
 }
}