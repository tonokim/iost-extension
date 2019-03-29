import { observable, computed, toJS, action } from "mobx"

class User {
  @observable accounts = []
  @observable currentAccount = null

  @action
  setAccounts(data){
    this.accounts = data
  }

  @action
  setCurrentAccount(data){
    this.currentAccount = data
  }
}

export default User