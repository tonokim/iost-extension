
import config from 'utils/config'
import storage from 'utils/storage'
import { lan, sha256, aesDecrypt } from 'utils'

class Store {
  constructor(){
    this.nodes = new Map()
    this.accounts = new Map() //
    this.currentAccount = null
    this.password = null
    this.lock = true
    this.lan = lan
    
    this._initLan()
    this._initNodes()
    
    
  }

  async _initLan(){
    this.lan = await this.getStorage('locale', 'en')
  }

  _initNodes(){
    config.nodes.map(item => this.nodes.set(item.name, item) )
  }

  async _initAccounts(){
    if(!this.lock){
      const accounts = await this.getStorage('accounts', [])
      accounts.map(item => {
        let account = {...item}
        const key = `${account.type}:${account.network}:${account.name}`
        account = decryptAccount(account)
        this.accounts.set(key,account)
      })
      this._initCurrentAccount()
    }
  }

  decryptAccount(account){
    const arr = ['privateKey', 'password', 'token', 'retoken']
    return arr.reduce((prev, next) => {
      if(prev[key]){
        prev[key] = aesDecrypt(prev[key], this.password)
      }
      return prev
    },account)
  }

  async _initCurrentAccount(){
    if(this.hasAccounts){
      const curKey = await this.getStorage('currentAccount')
      if(this.accounts.has(curKey)){
        this.setCurrentAccount(curKey)
      }else {
        const accounts = getAccounts()
        const key = `${accounts[0].type}:${accounts[0].network}:${accounts[0].name}`
        this.setCurrentAccount(key)
      }
    }
  }

  getNodes(){
    return [...this.nodes.keys()].map(key => this.nodes.get(key))
  }

  get hasAccounts() {
    return this.accounts.size
  }

  getAccounts(){
    return [...this.accounts.keys()].map(key => this.accounts.get(key))
  }

  setCurrentAccount(key){
    this.currentAccount = key
  }

  getCurrentAccount(){
    const account = this.accounts.get(this.currentAccount)
    return account
  }

  get hasCurrentAccount(){
    return this.accounts.has(this.currentAccount)
  }

  getLan(){
    return this.lan
  }

  setLan(lan){
    this.lan = lan
    this.setStorage('locale', lan)
  }

  lock(){
    this.lock = true
  }

  async unlock(password){
    try {
      const encryptPassword = await this.getEncryptPassword()
      if(encryptPassword === sha256(password)){
        this.password = password
        this.lock = false
        this._initAccounts()
      }else {
        throw 'invalid password'
      }
    } catch (err) {
      throw err
    }
  }

  get lockState(){
    return this.lock
  }

  setPassword(str){
    this.lock = false
    this.password = str
    const encryptPassword = sha256(str)
    this.setStorage('password', encryptPassword)
  }

  getPassword(){
    return this.password
  }

  getEncryptPassword(){
    return this.getStorage('password')
  }

  async hasRegister(){
    try {
      const password = await this.getEncryptPassword()
      if(password){
        return true
      }
    } catch (err) {
      console.log(err)
    }
    return false
  }

  getStorage(key, defaultValue) {
    return new Promise(resolve => (
        storage.get(key, data => resolve(data[key] || defaultValue || false))
    ));
  }

  setStorage(key, value){
    storage.set({[key]: value})
  }

  
}


export default Store