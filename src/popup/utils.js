
import ext from 'utils/ext';

const winBgPage = ext.extension.getBackgroundPage()
const bg = winBgPage.background

const defaultLan = bg.store.getLan()


const setPassword = (password) => bg.store.setPassword(password)

const hasRegister = () => bg.store.hasRegister()

const unlock = (password) => bg.store.unlock(password)

const getLockState = () => bg.store.lockState

const hasAccounts = () => bg.store.hasAccounts

const getAccounts = () => bg.store.getAccounts()

const hasCurrentAccount = () => bg.store.hasCurrentAccount

const getCurrentAccount = () => bg.store.getCurrentAccount()


export {
  defaultLan,
  setPassword,
  hasRegister,
  unlock,
  getLockState,
  hasAccounts,
  getAccounts,
  hasCurrentAccount,
  getCurrentAccount,
}