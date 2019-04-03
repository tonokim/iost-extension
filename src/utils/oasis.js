import axios from 'axios'

const API = false? 'https://endless.game/api/': 'http://18.223.43.49:8081/api/'

const api = {
  login: `${API}users/login`,
  logout: `${API}users/logout`,
  info: `${API}wallet/info`,
  refreshToken: `${API}users/refreshToken`,
}

const formData = data => Object.keys(data).reduce((prev, next) => (prev.append(next, data[next]), prev), new FormData())

const oasis = {
  login: async (phone ,password) => {
    try {
      const sdata = formData({
        phone,
        password
      })
      const { data } = await axios.post(api.login, sdata)
      if(data.code == 0){
        return data.data
      }else {
        throw data.message
      }
    } catch (err) {
      throw err
    }
  },
  info: async (account) => {
    try {
      const { data } = await axios.get(api.info, {
        headers: {
          Authorization: `Bearer ${account.token}`
        }
      })
      if(data.code == 0){
        return data.data
      }else if(data.code == 1003){
        const _account = await oasis.refreshToken(account)
        const rlt = await oasis.info(_account)
        return rlt;
      }else {
        throw data.message
      }
    } catch (err) {
      throw err
    }
  },
  refreshToken: async (account) => {
    try {
      const sdata = formData({
        refreshToken: account.retoken,
      })
      const { data } = await axios.post(api.refreshToken,sdata)
      if(data.code == 0){
        const AccessToken = data.data.AccessToken
        // user.refreshAccessToken(AccessToken)
        // return AccessToken
      }else {
        // refreshtoken error relogin
        const rlt = await oasis.login(account.phone, account.password)
        // user.refreshAllToken(rlt)
        // return rlt.AccessToken
        // throw new Error('refreshtoken error')
      }
    } catch (err) {
      throw err
    }
  },
  logout: async (account) => {
    try {
      const { data } = await axios.get(api.logout, {
        headers: {
          Authorization: `Bearer ${account.token}`
        }
      })
      if(data.code == 0){
        
      } else {

      }
    } catch (err) {
      throw err
    }
  }
}

export default oasis