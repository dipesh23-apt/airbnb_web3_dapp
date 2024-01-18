const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    inf_Airbnb_goerli: {
      network_id: 5,
      //gas: 672195,
      //gasPrice: 100000000000,
      gasPrice: 10000000,
      provider: new HDWalletProvider(fs.readFileSync('e:\\infura.env', 'utf-8'), "wss://goerli.infura.io/ws/v3/82520c0cfc214601ade41aac45e698ca",0)
      //provider: new HDWalletProvider(["967f28d3ff0f751889eb9a215eedee6a23d91b42cc41ef5ba44812d621393128"], "https://goerli.infura.io/v3/82520c0cfc214601ade41aac45e698ca",1)
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.16"
    }
  }
};
