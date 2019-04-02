import { observable, computed, toJS, action } from "mobx"
import { getAccounts, getCurrentAccount, lock } from '@popup/utils'

class User {
  @observable accounts = []
  @observable currentAccount = null
  
  @action
  initAccounts(data){
    this.accounts = getAccounts()
  }

  @action
  initCurrentAccount(){
    this.currentAccount = getCurrentAccount()
  }

  lock(){
    this.accounts = []
    this.currentAccount = null
    lock()
  }

}

export default User