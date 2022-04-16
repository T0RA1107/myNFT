require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
const { privateKey, alchemyApiKey } = require("./secrets.json");
 
module.exports = {
    solidity: {
        version: "0.8.4",
        settings:{  
            optimizer:{
              enabled: true,
              runs: 200
            }
          }
    },
    networks: {
        hardhat: {},
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/" + alchemyApiKey,
            chainId: 4,
            accounts: [privateKey]
        }
    }
};