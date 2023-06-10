import { CONTRACT_STAKING_ABI, CONTRACT_STAKING_ADDRESS } from "@/configs/contract";
import { fetchMetadata } from "@/services/nft";
import useEstateStore from "@/services/store";
import { RealEstateState } from "@/types/RealEstateState";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useQuery,
  useWaitForTransaction,
} from "wagmi";
import Button from "../CommonUI/Button";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  handleClose: () => void;
  setSelectedPoolId: (poolId: string) => void;
};

const ListRealEstateWithPool: React.FC<Props> = ({ handleClose, setSelectedPoolId }) => {
  const { realEstateStates } = useEstateStore();
  const [viewOnlyMyRealEstate, setViewOnlyMyRealEstate] = useState(false);
  const address = useAccount().address;
  const filteredRealEstateStates = useMemo(() => {
    if (!viewOnlyMyRealEstate) return realEstateStates;
    if (!address) return [];
    return realEstateStates.filter((realEstate) => realEstate.owner === address);
  }, [address, realEstateStates, viewOnlyMyRealEstate]);
  return (
    <div className="p-6 lg:p-8 bg-[#171923]/90 rounded-lg space-y-4 lg:space-y-6 h-full">
      <div className="flex items-center justify-between text-2xl font-bold">
        <div className="text-white">List Pools</div>
        <XMarkIcon className="cursor-pointer w-7 h-7" onClick={handleClose} color="white" />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={viewOnlyMyRealEstate}
          onChange={(e) => setViewOnlyMyRealEstate(e.target.checked)}
        />
        <span className="text-white">View only my real estates</span>
      </div>
      <div>
        <div className="flex flex-col gap-y-2 lg:gap-y-4">
          {filteredRealEstateStates.map((realEstate) => {
            return (
              <RealEstateItem
                handleClose={handleClose}
                setSelectedPoolId={setSelectedPoolId}
                realEstate={realEstate}
                key={realEstate.id.toString()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

type RealEstateItemProps = {
  realEstate: RealEstateState;
  handleClose: () => void;
  setSelectedPoolId: (poolId: string) => void;
};
const RealEstateItem: React.FC<RealEstateItemProps> = ({
  handleClose,
  realEstate,
  setSelectedPoolId,
}) => {
  const { data: metadata } = useQuery(["metadata", realEstate.uri], fetchMetadata, {
    enabled: !!realEstate.uri,
  });

  const { address } = useAccount();

  const {
    data: pool,
    isLoading: isCheckingPool,
    refetch: refetchPool,
  } = useContractRead<any, any, any>({
    address: CONTRACT_STAKING_ADDRESS,
    abi: CONTRACT_STAKING_ABI,
    functionName: "getPoolIdByrealEstateId",
    args: [realEstate.id],
  });

  const hasPool = pool && pool[0];
  const poolId = hasPool ? pool[1].toString() : null;

  if (!metadata) return null;
  return (
    <div className="flex justify-between p-4 rounded-lg bg-[#1A202C]">
      <div className="flex gap-2 lg:gap-4 max-w-2/3">
        <div className="relative h-[120px] overflow-hidden rounded-lg aspect-square">
          <Image src={metadata.image} alt={metadata.name} fill />
        </div>
        <div className="space-y-2">
          <h3 className="w-full text-xl font-semibold text-white truncate">{realEstate.name}</h3>
          <p className="text-white">
            Pool ID:{" "}
            {isCheckingPool
              ? "Checking..."
              : hasPool
              ? poolId
              : "No pool created for this real estate"}
          </p>
          {!isCheckingPool && !hasPool && address === realEstate.owner && (
            <CreatePool refetchPool={refetchPool} realEstateId={realEstate.id.toString()} />
          )}
        </div>
      </div>
      <div>
        {hasPool && (
          <PoolInfo
            handleClose={handleClose}
            setSelectedPoolId={setSelectedPoolId}
            poolId={poolId}
          />
        )}
      </div>
    </div>
  );
};

type CreatePoolProps = {
  realEstateId: string;
  refetchPool?: () => void;
};
const CreatePool: React.FC<CreatePoolProps> = ({ realEstateId, refetchPool }) => {
  const {
    write,
    data: txCreatePool,
    isLoading: isSubmitting,
  } = useContractWrite({
    address: CONTRACT_STAKING_ADDRESS,
    abi: CONTRACT_STAKING_ABI,
    functionName: "createPool",
    args: [realEstateId],
    onSuccess: refetchPool,
  });

  const { isLoading: isWatingForTx, isSuccess } = useWaitForTransaction(txCreatePool);

  useEffect(() => {
    if (isSuccess) {
      refetchPool?.();
    }
  }, [isSuccess, refetchPool]);

  const handleCreatePool = () => write();

  return (
    <Button
      isLoading={isSubmitting || isWatingForTx}
      className="!rounded-md !py-2 !px-5"
      onClick={handleCreatePool}
    >
      Create Pool
    </Button>
  );
};

type PoolInfoProps = {
  poolId: string;
  setSelectedPoolId: (poolId: string) => void;
  handleClose: () => void;
};
const PoolInfo: React.FC<PoolInfoProps> = ({ poolId, handleClose, setSelectedPoolId }) => {
  const { address } = useAccount();
  const { data: powerStaked } = useContractRead<any, any, any>({
    address: CONTRACT_STAKING_ADDRESS,
    abi: CONTRACT_STAKING_ABI,
    functionName: "getUserTotalPowerStaked",
    args: [address, poolId],
    enabled: !!address,
  });
  const { data: totalEarned } = useContractRead<any, any, any>({
    address: CONTRACT_STAKING_ADDRESS,
    abi: CONTRACT_STAKING_ABI,
    functionName: "getUserTotalEarned",
    args: [address, poolId],
    enabled: !!address,
  });
  const { data: poolTotalReward } = useContractRead<any, any, any>({
    address: CONTRACT_STAKING_ADDRESS,
    abi: CONTRACT_STAKING_ABI,
    functionName: "getReward",
    args: [poolId],
  });

  console.log("poolTotalReward", poolTotalReward);

  const onClick = () => {
    setSelectedPoolId(poolId);
    handleClose();
  };

  return (
    <div className="space-y-2">
      <div className="text-white">Power staked: {powerStaked?.toString() || 0}</div>
      <div className="text-white">Total earned: {totalEarned?.toString() || 0}</div>
      <Button onClick={onClick} className="!rounded-md !py-2 !px-5">
        View Detail
      </Button>
    </div>
  );
};

export default ListRealEstateWithPool;
