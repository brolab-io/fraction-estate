import { CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS } from "@/configs/contract";
import { fetchMetadata } from "@/services/nft";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useMemo } from "react";
import { useAccount, useContractRead, useQuery } from "wagmi";
import ConnectWallet from "../Home/ConnectWallet";

type Props = {
  handleClose: () => void;
};

const ListMyNFT: React.FC<Props> = ({ handleClose }) => {
  const { address } = useAccount();
  const { data: tokenIds } = useContractRead<any, any, BigInt[]>({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "getTokenIdsByAddress",
    args: [address],
    enabled: !!address,
  });

  const filteredTokenIds = useMemo(() => {
    return (
      tokenIds?.filter((tokenId) => {
        return tokenId.toString() !== "0";
      }) || []
    );
  }, [tokenIds]);

  return (
    <div className="p-6 lg:p-8 bg-[#171923]/90 rounded-lg space-y-4 lg:space-y-6 h-full">
      <div className="flex items-center justify-between text-2xl font-bold">
        <div>My Assets ({filteredTokenIds.length})</div>
        <XMarkIcon className="cursor-pointer w-7 h-7" onClick={handleClose} color="white" />
      </div>
      {!address && (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-lg font-bold">Please connect your wallet to continue</div>
            <ConnectWallet />
          </div>
        </div>
      )}
      {address && (
        <div className="h-full overflow-auto">
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredTokenIds?.map((tokenId) => {
              return <NFTItem tokenId={tokenId.toString()} key={tokenId.toString()} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const NFTItem = ({ tokenId }: { tokenId: string }) => {
  const { data: nft } = useContractRead<any, any, any>({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "getTokenById",
    args: [tokenId],
  });
  const [name, uri, , , power] = nft || [];

  const { data: metadata } = useQuery(["metadata", uri], fetchMetadata, {
    enabled: !!uri,
  });
  console.log(`nft`, nft, metadata);
  if (!nft || !metadata) {
    return null;
  }
  return (
    <div className="bg-[#1A202C] rounded-lg p-2">
      <div className="relative w-full overflow-hidden rounded-lg aspect-square">
        <Image src={metadata.image} alt={metadata.name} fill />
      </div>
      <div className="py-3 space-y-2">
        <div className="w-full font-semibold text-white truncate">
          {name} #{tokenId}
        </div>
        <div className="flex justify-between text-sm">
          <div className="text-slate-300">Token ID</div>
          <div>#{tokenId}</div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="text-slate-300">Token Power</div>
          <div>{power.toString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ListMyNFT;
