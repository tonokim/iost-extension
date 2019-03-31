

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
      chain_id: 1024,
      default: true
    },
    {
      name: 'TESTNET',
      url: 'https://test.api.iost.io',
      chain_id: 1023,
      default: true
    }
  ],
  

}

export default config