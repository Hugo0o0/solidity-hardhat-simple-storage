import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "./tasks/accounts"
import "./tasks/block-number"

const RPC_URL = process.env.RPC_URL
const { PRIVATE_KEY = "", ETHERSCAN_API_KEY, LOCAL_NETWORK_URL } = process.env

task("testing-task", "A task that logs stuff", async (hre, env) => {
  console.log(env.version)
})

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },

    localhost: {
      url: LOCAL_NETWORK_URL,
      chainId: 31337,
    },
  },

  gasReporter: {
    enabled: true,
    outputFile: "reports/gasReporter.log",
    noColors: true,
    currency: "USD",
  },
}

export default config
