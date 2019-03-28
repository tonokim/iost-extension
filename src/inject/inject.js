
import config from 'utils/config'
import uuidv4 from 'uuid/v4'
import EventEmitter from 'eventemitter3'

const actionMap = new Map()
const nodes =  new Map()
config.nodes.map(item => nodes.set(item.name, item))


const onMessage = ({ source, data: { message} }) => {
  if (source !== window || !message || !message.action) return
  if(message.actionId != undefined && actionMap.has(message.actionId)) {
    const EE = actionMap.get(message.actionId)
    if (message.pending) {
      EE.emit('pending', message.pending)
    }else {
      if(message.success){
        EE.emit('success', message.success)
      }else if(message.failed){
        EE.emit('failed', message.failed)
      }
      actionMap.delete(message.actionId)
    }
  }
}

class IWalletJS {
  constructor(){
    this.pack = null
    this.iost = null
    this.rpc = null
    this.account = null
    this.network = null
    window.addEventListener('message', onMessage)
    this._getNodes()
  }

  _getNodes(){
    const actionId = uuidv4()
    const EE = new EventEmitter()
    actionMap.set(actionId, EE)
    EE.once('success', (data) => 
      data.nodes.map(item => {
        if(!nodes.has(item.name)){
          nodes.set(item.name, item)
        }
      })
    ).once('failed', (err) => {
      console.log(err)
    })
    window.postMessage({action: 'GET_NODES', actionId, data: null }, '*')
  }

  newIOST(IOST){
    if(!IOST){
      throw 'need IOST'
    }
    if(!this.account){
      throw 'need enable'
    }
    IOST.IOST.prototype.signAndSend = signAndSend.bind(this)
    IOST.IOST.prototype.signAndSendAsync = signAndSendAsync.bind(this)
    IOST.IOST.prototype.getTheseusAccountInfo = getTheseusAccountInfo.bind(this)
    this.pack = IOST
    this.iost = new IOST.IOST(config.DEFAULT_IOST_CONFIG)
    const node_url = nodes.get(nodes.has(IWalletJS.network)?IWalletJS.network:'MAINNET').url
    const IOST_PROVIDER = new IOST.HTTPProvider(node_url)
    this.rpc = new IOST.RPC(IOST_PROVIDER)

    this.iost.setRPC(this.rpc)
    this.iost.setAccount(this.iost.account)
    this.iost.account = new IOST.Account(this.account.name)
    this.iost.rpc = this.rpc

    return this.iost;
  }

  enable(){
    return new Promise((resolve, reject) => {
      if(this.account){
        resolve(this.account.name)
      }else {
        const actionId = uuidv4()
        const EE = new EventEmitter()
        actionMap.set(actionId, EE)
        EE.once('success', (data) => {
          this.account = data.account
          this.network = data.account.network
          resolve(this.account.name)
        }).once('failed', reject)
        window.postMessage({action: 'GET_ACCOUNT', actionId, data: null }, '*')
      }
    })
  }
}

const iwallet = new IWalletJS()

function signAndSend(tx){
  const domain = document.domain
  const actionId = uuidv4()
  const EE = new EventEmitter()
  actionMap[actionId] = EE
  if(this.account){
    // if(this.account.type == 'theseus' && action.actionName == 'transfer'){
    //   setTimeout(() => { cb.pushMsg("failed", 'theseus account can not transfer') },0)
    // }else {
    //   window.postMessage(message, '*')
    // }
    window.postMessage({ action: 'TX_ASK', actionId, data: { domain, account: this.account, tx } }, '*')
  }else {
    setTimeout(() => EE.emit('failed', 'no account'),0)
  }
  return EE
}

function signAndSendAsync(tx){
  return new Promise((resolve, reject) => {
    const domain = document.domain
    const actionId = uuidv4()
    const EE = new EventEmitter()
    actionMap[actionId] = EE
    if(this.account){
      EE.on('success', resolve).on('failed', reject)
      window.postMessage({ action: 'TX_ASK', actionId, data: { domain, account: this.account, tx } }, '*')
    }else {
      reject('failed no account')
    }
  })
}

function getTheseusAccountInfo(){
  return new Promise((resolve, reject) => {
    if(this.account){
      if(this.account.type == 'theseus'){
        const actionId = uuidv4()
        const EE = new EventEmitter()
        actionMap[actionId] = EE
        EE.on('success', data => {
          resolve({
            balances: data
          })
        })
        .on('failed', reject)
        window.postMessage({action: 'GET_THESEUS_ACCOUNT_INFO', actionId, data: { account: this.account } }, '*')
      }else {
        reject('not theseus account')
      }
    }else {
      reject('no account')
    }
  })
}


window.IWalletJS1 = iwallet