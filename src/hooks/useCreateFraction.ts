import { CONTRACT_FRACTIONALIZE_ADDRESS } from "@/configs/contract";
import { useContractWrite, useMutation } from "wagmi";

type Payload = {
  tokenContract: string;
  tokenName: string;
  tokenId: string;
  tokenTicker: string;
  supply: string;
  royaltyPercentage: string;
};

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_royaltyPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_supply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenTicker",
        type: "string",
      },
    ],
    name: "createFraction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const useCreateFraction = () => {
  const { writeAsync } = useContractWrite({
    address: CONTRACT_FRACTIONALIZE_ADDRESS,
    abi: abi,
    functionName: "createFraction",
  });
  return useMutation<any, any, Payload>(async (payload) => {
    const { tokenContract, tokenId, royaltyPercentage, supply, tokenName, tokenTicker } = payload;
    const tx = await writeAsync({
      args: [tokenContract, tokenId, royaltyPercentage, supply, tokenName, tokenTicker],
    });
    return tx;
  });
};

export default useCreateFraction;
