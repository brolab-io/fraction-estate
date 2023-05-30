import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = ethers.utils.parseEther("0.001");

  // const Lock = await ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  // console.log("Deploying NFTGenerator...");
  // const NFTGenerator = await ethers.getContractFactory("NFTGenerator");
  // const nftGenerator = await NFTGenerator.deploy();
  // console.log(`NFTGenerator deployed to ${nftGenerator.address}`);

  // 0x524a6226ECaB7f358e1c66591288c8a7637f7146

  const FractionalizeNFT = await ethers.getContractFactory("FractionalizeNFT");
  const fractionalizeNFT = await FractionalizeNFT.deploy();
  console.log(`FractionalNFT deployed to ${fractionalizeNFT.address}`);

  // 0xC9af9d5c603550AF534442d8411469bF4B9D30a2
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
