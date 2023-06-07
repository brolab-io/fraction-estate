import nftAbi from "./abi/nft.json";
import stakingAbi from "./abi/staking.json";

export const CONTRACT_NFT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS! as `0x${string}`;
export const CONTRACT_NFT_ABI = nftAbi;

export const CONTRACT_STAKING_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_STAKING_ADDRESS! as `0x${string}`;
export const CONTRACT_STAKING_ABI = stakingAbi;
