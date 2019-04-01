import IOST from 'iost'
import bs58 from 'bs58'
import config from 'utils/config'
import EventEmitter from 'eventemitter3'
import { getCurrentNode } from '@popup/utils'



class IWallet {
  constructor(){
    this.pack = IOST
    this.iost = new IOST.IOST(config.DEFAULT_IOST_CONFIG)
    this.rpc = new IOST.RPC(new IOST.HTTPProvider('https://api.iost.io'))
    this.iost.setRPC(this.rpc)
    this.account = new IOST.Account('empty')
  }

  changeAccount(account){
    console.log('changeAccount:')
    console.log(account)
  }

  signAndSend(contractName, action, args){
    const tx = this.iost.callABI(contractName, action, args)
    tx.addApprove("*", "unlimited")
    const node = getCurrentNode()
    tx.setChainID(node.chain_id)

    const EE = new EventEmitter()


    let inverval = null, times = 90
    
    this.iost.signAndSend(tx)
    .on('padding', padding => {
      EE.emit('padding', pending)
      inverval = setInterval(() => {

      },1000)
    })
    .on('failed', err => {
      
    })
  }

}

const iost = new IWallet()

export default iost