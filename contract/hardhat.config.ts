import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    apothem: {
      url: "https://erpc.apothem.network",
      accounts: ["b582fde26b92d6f8af9d1fd5d7645fa1b5a37a29464fd72316fe7c674c3c133b"],
      chainId: 51,
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: ["b582fde26b92d6f8af9d1fd5d7645fa1b5a37a29464fd72316fe7c674c3c133b"],
      chainId: 97,
    },
  },
};

export default config;
