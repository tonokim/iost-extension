import { observable, computed, toJS, action } from "mobx"


class App {
  @observable text = '123'

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  onChange = (e) => {
    this.text = e.target.value;
  }
}

export default App
