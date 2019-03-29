
import bs58 from 'bs58'
import EC from 'elliptic'
import axios from 'axios'

const secp = new EC.ec('secp256k1')

const Algorithm = {
  Ed25519: 2,
  Secp256k1: 1,
}

const privateKeyToPublicKey = (privateKey) => {
  const decodedPrivateKey = bs58.decode(privateKey);
  // const edKP = new iost.pack.KeyPair(decodedPrivateKey, privateKey.length>50?Algorithm.Ed25519:Algorithm.Secp256k1);
  // const publicKey = bs58.encode(Buffer.from(edKP.pubkey, 'hex'))
  // return publicKey
}

export {
  privateKeyToPublicKey
}
