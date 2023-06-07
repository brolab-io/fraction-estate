import { ethers } from "hardhat";

async function main() {
  // const TokenContract = await ethers.getContractFactory("Token");
  // const tokenContract = await TokenContract.deploy("FENG", "FEN", "1000000000000000000000000000");

  // await tokenContract.deployed();

  // console.log(`Contract tokenContract deployed to ${tokenContract.address}`);

  // const NFTContract = await ethers.getContractFactory("NFTContract");
  // const nftContract = await NFTContract.deploy("Fraction Estate NFT", "FENFT");

  // await nftContract.deployed();

  // console.log(`Contract nftContract deployed to ${nftContract.address}`);

  const StakingRewards = await ethers.getContractFactory("StakingRewards");
  const nftStakingContract = await StakingRewards.deploy(
    "0x25Be75c6105830758c191C9209c37bcc0B4954D1",
    "0x05c1E2E93D934A90661557a1485fedC91C56c578"
  );

  await nftStakingContract.deployed();

  console.log(`Contract nftContract deployed to ${nftStakingContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
