
import app from './app';
import user from './user';


class RootStore {
  constructor() {
    this.app = new app(this)
    this.user = new user(this)
  }
}

export default RootStore