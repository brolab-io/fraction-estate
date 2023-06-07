import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    apothem: {
      url: "https://erpc.apothem.network",
      accounts: [],
      chainId: 51,
    },
  },
};

export default config;
