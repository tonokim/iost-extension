

const config = {
  DEFAULT_IOST_CONFIG: {
    gasPrice: 100,
    gasLimit: 100000,
    delay: 0,
  },
  nodes: [
    {
      name: 'MAINNET',
      url: 'https://api.iost.io',
      default: true
    },
    {
      name: 'TESTNET',
      url: 'http://13.52.105.102:30001',
      default: true
    }
  ],
  

}

export default config