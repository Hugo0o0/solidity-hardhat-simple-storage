import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"
import { assert } from "chai"

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory, simpleStorage: SimpleStorage

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("inital favorite number must be 0", async () => {
    const favoriteNumber = await simpleStorage.retrieve()
    const expectedFavoriteNumber = "0"
    assert.equal(favoriteNumber.toString(), expectedFavoriteNumber)
  })

  it("must update favorite number to 6", async () => {
    const transactionResponse = await simpleStorage.store(6)
    await transactionResponse.wait(1)
    const favoriteNumber = (await simpleStorage.retrieve()).toString()
    const expectedFavoriteNumber = "6"
    assert.equal(favoriteNumber, expectedFavoriteNumber)
  })

  it("must set name to John and favorite number to 25", async () => {
    const transactionResponse = await simpleStorage.addPerson("John", "25")
    await transactionResponse.wait(1)

    const people = await simpleStorage.people(0)

    assert.equal(people.name, "John")
    assert.equal(people.favoriteNumber.toString(), "25")
  })
})
