import { ethers, network } from "hardhat"

const main = async () => {
  const contractFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await contractFactory.deploy()
  await simpleStorage.waitForDeployment()

  await simpleStorage.store(13)

  console.log(await simpleStorage.retrieve())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
