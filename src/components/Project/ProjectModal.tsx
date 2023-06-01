"use client";
import { Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, useCallback, useMemo, useState } from "react";
import Button from "../CommonUI/Button";
import clsx from "clsx";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_NFT_ABI, CONTRACT_NFT_ADDRESS } from "@/configs/contract";
import { RealEstateState } from "@/types/RealEstateState";
import { utils, BigNumber } from "ethers";
import Loading from "../CommonUI/Loading";
import ConnectWallet from "../Home/ConnectWallet";
import { toast } from "react-toastify";
type InfoItemProps = {
  label: string;
};
const InfoItem: React.FC<PropsWithChildren<InfoItemProps>> = ({ label, children }) => {
  return (
    <div className="p-2.5 border rounded-lg shadow-sm border-gray-50">
      <div className="text-sm text-slate-900">{label}</div>
      <div className="font-bold text-black">{children}</div>
    </div>
  );
};

const Tabs = () => {
  return (
    <div className="flex gap-4">
      <div className="text-[#6558f5] border-b-4 border-[#6558f5] py-1.5 font-medium">Invest</div>
      <div className="py-1.5 font-medium text-black">Investor</div>
      <div className="py-1.5 font-medium text-black">Detail</div>
    </div>
  );
};

type Props = {
  realEstateId: string;
};
const ProjectModal: React.FC<Props> = ({ realEstateId }) => {
  const [isOpen, setOpen] = useState(true);
  const { connect } = useConnect();
  const { address } = useAccount();
  const { data, refetch: refetchRealEstate } = useContractRead<any, any, RealEstateState>({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "getRealEstate",
    args: [realEstateId],
  });

  const { data: tokenSymbol } = useContractRead<any, any, string>({
    address: data?.paymentToken as `0x${string}`,
    abi: [
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "symbol",
    enabled: !!data,
  });

  const {
    data: allowanced,
    refetch: refetchAllowanced,
    isLoading: isCheckingAllowance,
  } = useContractRead<any, any, BigInt>({
    address: data?.paymentToken as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "allowance",
    enabled: !!address,
    args: [address, CONTRACT_NFT_ADDRESS],
  });

  const {
    write: approve,
    isLoading: isApproving,
    data: approveTx,
  } = useContractWrite<any, any, any>({
    address: data?.paymentToken as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "approve",
    args: [CONTRACT_NFT_ADDRESS, data?.basePrice],
  });

  const { isLoading: isWatingForApprove } = useWaitForTransaction({
    ...approveTx,
    onSuccess: () => refetchAllowanced(),
  });

  const {
    write: buy,
    isLoading: isBuying,
    data: buyTx,
  } = useContractWrite({
    address: CONTRACT_NFT_ADDRESS,
    abi: CONTRACT_NFT_ABI,
    functionName: "payAndMintNFT",
    args: [realEstateId],
  });

  const { isLoading: isWatingForBuying } = useWaitForTransaction({
    ...buyTx,
    onSuccess: () => {
      toast.success("Real estate bought successfully");
      refetchRealEstate();
      refetchAllowanced();
    },
  });

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const totalRaised = useMemo(() => {
    if (!data) return 0;
    const _basePrice = BigNumber.from(data.basePrice);
    const _numberOfFraction = BigNumber.from(data.fractionMinted);
    return utils.formatEther(_basePrice.mul(_numberOfFraction));
  }, [data]);

  const totalSupplyInPrice = useMemo(() => {
    if (!data) return 0;
    const _basePrice = BigNumber.from(data.basePrice);
    const _totalSupply = BigNumber.from(data.numberOfFraction);
    return utils.formatEther(_basePrice.mul(_totalSupply));
  }, [data]);

  const isApprovedEnough = useMemo(() => {
    if (!allowanced || !data) return false;
    return BigNumber.from(allowanced).gte(BigNumber.from(data.basePrice));
  }, [allowanced, data]);

  const raisePercentStyle = useMemo(() => {
    if (!data)
      return {
        width: "0%",
      };
    const _numberOfFraction = BigNumber.from(data.fractionMinted);
    const _totalSupply = BigNumber.from(data.numberOfFraction);
    return {
      width: `${_numberOfFraction.mul(100).div(_totalSupply).toNumber()}%`,
    };
  }, [data]);

  return (
    <>
      <Button
        onClick={toggleOpen}
        className={clsx(
          "absolute left-6 top-6 !rounded-md !py-2.5 !px-7",
          isOpen ? "!bg-inherit !text-[#5C8AED] border border-[#5C8AED]" : ""
        )}
      >
        {isOpen ? "Hide" : "Show Info"}
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="fixed z-50 w-full max-w-md left-6 top-20">
          <div className="p-6 space-y-4 overflow-hidden bg-white rounded-lg">
            <Tabs />
            <div className="text-xl font-bold text-black truncate">{data?.name || ""}</div>
            <div className="text-xl font-bold truncate text-slate-600">
              Total raise: {totalSupplyInPrice}{" "}
              {tokenSymbol ? tokenSymbol : <Loading className="inline-block w-3 h-3" />}
            </div>
            <div className="relative h-5 bg-gray-100 rounded-full">
              <div className="rounded-full bg-[#00c805] h-5" style={raisePercentStyle}></div>
              <div className="absolute text-sm font-bold text-black transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                {data?.fractionMinted.toString() || 0} / {data?.numberOfFraction.toString() || 0}
              </div>
            </div>
            <div />

            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <InfoItem label="Total raised">{totalRaised}</InfoItem>
              <InfoItem label="Total supply">{data?.numberOfFraction.toString() || 0}</InfoItem>
              <InfoItem label="Accepted currency">
                {tokenSymbol ? tokenSymbol : <Loading className="w-3 h-3" />}
              </InfoItem>
              <InfoItem label="Price per token">
                {utils.formatEther(data?.basePrice.toString() || "0")}
              </InfoItem>
              <InfoItem label="Network">XDC</InfoItem>
              <InfoItem label="Asset">1</InfoItem>
            </div>
            <div className="flex items-center justify-center">
              {!address ? <ConnectWallet /> : null}
            </div>
            {address ? (
              isApprovedEnough ? (
                <Button
                  isLoading={isBuying || isWatingForBuying || isCheckingAllowance}
                  onClick={() => buy?.()}
                  className="w-full !rounded-md !py-2.5"
                >
                  Invest
                </Button>
              ) : (
                <Button
                  isLoading={isApproving || isWatingForApprove || isCheckingAllowance}
                  onClick={() => approve?.()}
                  className="w-full !rounded-md !py-2.5"
                >
                  Approve {utils.formatEther(data?.basePrice.toString() || "0")}{" "}
                  {tokenSymbol ? tokenSymbol : <Loading className="inline-block w-3 h-3" />} To
                  Invest
                </Button>
              )
            ) : null}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default ProjectModal;
