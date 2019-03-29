import { observable, computed, toJS, action } from "mobx"
import { defaultLan } from '../utils'

class App {
  @observable currentPage = 'register'
  @observable pages = []
  @observable lan = defaultLan

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  onChange = (e) => {
    this.text = e.target.value;
  }

  @action
  onPushPage = (pageName) => {
    this.currentPage = pageName
    this.pages.push(pageName)
  }

  @action
  onReplacePage = (pageName) => {
    this.currentPage = pageName
    this.pages.splice(-1,1,pageName)
  }

  @action
  onBackPage = () => {
    this.pages.pop()
    if(this.pages.size){
      this.currentPage = this.pages[this.pages.size-1]
    }
  }

 
}

export default App
