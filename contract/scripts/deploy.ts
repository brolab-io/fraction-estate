import { ethers } from "hardhat";

async function main() {
  const TokenContract = await ethers.getContractFactory("Token");
  const tokenContract = await TokenContract.deploy("FENG", "FEN", "1000000000000000000000000000");

  await tokenContract.deployed();

  console.log(`Contract tokenContract deployed to ${tokenContract.address}`);

  const NFTContract = await ethers.getContractFactory("NFTContract");
  const nftContract = await NFTContract.deploy("Fraction Estate NFT", "FENFT");

  await nftContract.deployed();

  console.log(`Contract nftContract deployed to ${nftContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
