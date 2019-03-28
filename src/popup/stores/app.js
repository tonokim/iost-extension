import { observable, computed, toJS, action } from "mobx"


class App {
  @observable currentPage = 'login'

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  onChange = (e) => {
    this.text = e.target.value;
  }
}

export default App
