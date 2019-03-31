
import crypto from 'crypto'
import hash from 'hash.js'

const checkLan = (str) => ['en','zh','ko'].indexOf(str)> -1 ? str : null

const defaultLan = () => {
  let lang = navigator.language||navigator.userLanguage;
  lang = lang.substr(0, 2);
  return checkLan(lang) || 'en'
}

const lan = defaultLan()

const aesEncrypt = (data, key) => {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const aesDecrypt = (encrypted, key) => {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const sha256 = (str) => hash.sha256().update(str).digest('hex')

export {
  lan,
  aesEncrypt,
  aesDecrypt,
  delay,
  sha256
}