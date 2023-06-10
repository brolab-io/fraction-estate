"use client";
import AssetModal from "@/components/Home/AssetModal";
import ConnectWallet from "@/components/Home/ConnectWallet";
import SearchBar from "@/components/Home/SearchBar";
import SpaceScene from "@/components/Home/SpaceScene";
import ListMyNFT from "@/components/MyNFT/ListMyNFT";
import MarketplaceModal from "@/components/MyNFT/MarketplaceModal";
import MyNFTModal from "@/components/MyNFT/MyNFTModal";
import StakingModel from "@/components/MyNFT/StakingModel";
import PoolDetailModal from "@/components/Pool/PoolDetailModal";
import { CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS } from "@/configs/contract";
import useEstateStore from "@/services/store";
import { useEffect, useRef, useState } from "react";
import { useContractRead } from "wagmi";

const HomePage = () => {
  const { data } = useContractRead<any, any, any>({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "getAllRealEstates",
  });
  const { setRealEstateStates } = useEstateStore();
  const [selectedPoolId, setSelectedPoolId] = useState<string>("");

  useEffect(() => {
    if (data) {
      setRealEstateStates(data);
    }
  }, [data, setRealEstateStates]);

  return (
    <main className="relative w-full h-full bg-white">
      <SpaceScene />
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between p-6">
        <SearchBar />
        <ConnectWallet />
      </div>
      <AssetModal />
      <div className="absolute z-50 flex gap-4 bottom-4 right-4">
        <MarketplaceModal />
        <StakingModel setSelectedPoolId={setSelectedPoolId} />
        <MyNFTModal />
        <PoolDetailModal poolId={selectedPoolId} />
      </div>
    </main>
  );
};

export default HomePage;
