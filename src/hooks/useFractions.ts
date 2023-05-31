import { CONTRACT_FRACTIONALIZE_ADDRESS } from "@/configs/contract";
import { ethers, providers } from "ethers";
import { useCallback, useEffect } from "react";
import { useContractRead, useNetwork } from "wagmi";

const abi = [
  {
    inputs: [],
    name: "getDepositInfos",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "depositTimestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "fractionContractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasFractionalized",
            type: "bool",
          },
        ],
        internalType: "struct FractionalizeNFT.DepositInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useFractions = () => {
  const { data } = useContractRead({
    address: CONTRACT_FRACTIONALIZE_ADDRESS,
    abi,
    functionName: "getDepositInfos",
  });

  console.log(data);
};

export default useFractions;
