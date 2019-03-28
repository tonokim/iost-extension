
import config from 'utils/config'

class Store {
  constructor(){
    this.nodes = new Map()
    this.accounts = new Map() //
    this.currentAccount = null
    this.password = null
    this.lock = false
    
    this._initNodes()
    this._initAccounts()
    
  }

  _initNodes(){
    config.nodes.map(item => this.nodes.set(item.name, item) )
  }

  _initAccounts(){

    // mock
    this.accounts.set('iost:MAINNET:tonokim',{
      type: 'iost',
      netwok: 'MAINNET',
      name: 'tonokim'
    })
    this.currentAccount = 'iost:MAINNET:tonokim'
  }

  getNodes(){
    return [...this.nodes.keys()].map(key => this.nodes.get(key))
  }

  getAccounts(){
    return [...this.accounts.keys()].map(key => this.accounts.get(key))
  }

  getCurrentAccount(){
    return this.accounts.get(this.currentAccount)
  }

  async unlock(){

  }

  
}


export default Store