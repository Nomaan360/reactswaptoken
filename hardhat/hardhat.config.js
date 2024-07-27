require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    amoy:{
      // chainId:80002,
      url:"https://rpc-amoy.polygon.technology/",
      accounts:["d863b8a8facaa6187848f48cec8300ad74e058acd7f14cadffec2e219fae752f"]
    }
  }
};
