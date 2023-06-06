import { CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS } from "@/configs/contract";
import { useAccount, useContractRead } from "wagmi";

const ListMyNFT = () => {
  const { address } = useAccount();
  const { data: tokenIds } = useContractRead({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "getTokenIdsByAddress",
  });

  if (!address) {
    return null;
  }

  return (
    <div>
      {tokenIds?.map((tokenId: string) => {
        return <NFTItem tokenId={tokenId} key={tokenId} />;
      })}
    </div>
  );
};

const NFTItem = ({ tokenId }: { tokenId: string }) => {
  const { data: nft } = useContractRead({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "getTokenById",
    args: [tokenId],
  });

  console.log(nft);

  return (
    <div>
      <div>{}</div>
    </div>
  );
};

export default ListMyNFT;
