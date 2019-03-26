
import app from './app';


class RootStore {
  constructor() {
    this.app = new app(this)
  }
}

export default RootStore