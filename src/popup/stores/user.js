import { observable, computed, toJS, action } from "mobx"
import oasis from 'utils/oasis'
import { getAccounts, getCurrentAccount, lock } from '@popup/utils'
import iost from '@popup/iost'
import { delay } from 'utils'

class User {
  @observable accounts = []
  @observable currentAccount = null
  @observable isStartGetInfo = false
  @observable wallet = {
    balance: 0,
    frozen_balances: [],
    frozen_amount: 0,
    gas_info: {
      current_total: 0,
      increase_speed: 0,
      limit: 0,
      pledge_gas: 0,
      pledged_info: [],
      transferable_gas: 0,
    },
    ram_info: {
      available: 0,
      total: 0,
      used: 0,
    },
    assets: [],
    loading: true
  }

  @action
  initAccounts(data){
    this.accounts = getAccounts()
  }

  @action
  initCurrentAccount(){
    this.currentAccount = getCurrentAccount()
    if(this.currentAccount){
      iost.changeAccount(this.currentAccount)
      this.getAccountInfo()
    }
  }

  lock(){
    this.accounts = []
    this.currentAccount = null
    lock()
  }

  getAccountInfo = () => {
    return new Promise( async (resolve, reject) => {
      if(this.currentAccount){
        try {
          if(this.currentAccount.type == 'iost') {
            await this.getIostInfo()
          }else {
            await this.getOasisInfo()
          }
          resolve()
        } catch (err) {
          reject(err)
        }
      }else {
        resolve()
      }
    })
  }

  getIostInfo = async () => {
    try {
      const { balance, frozen_balances, gas_info, ram_info } = await iost.rpc.blockchain.getAccountInfo(this.currentAccount.name)
      const frozen_amount = frozen_balances.reduce((prev, next) => (prev += next.amount, prev), 0)
      const data = {
        balance,
        frozen_balances,
        frozen_amount,
        gas_info: {
          ...gas_info,
          gas_used: Number((gas_info.limit - gas_info.current_total).toFixed(4)),
        },
        ram_info,
        loading: false
      }
      this.setWallet(data)
    } catch (err) {
      console.log(err)
    }
  }

  getOasisInfo = async () => {
    try {
      const { Assets } = await oasis.info(this.currentAccount)
      let balance = 0
      const assets = Assets.map(item => {
        if(item.Symbol == 'iost'){
          balance = item.Available
        }
        return {
          available: item.Available,
          chain: item.Chain,
          freeze: item.Freeze,
          id: item.ID,
          symbol: item.Symbol,
        }
      })
      const data = {
        assets,
        balance,
        loading: false
      }
      this.setWallet(data)
    } catch (err) {
      console.log(err)
    }
  }

  @action
  setWallet(data){
    this.wallet = {...toJS(this.wallet), ...data}
  }

}

export default User