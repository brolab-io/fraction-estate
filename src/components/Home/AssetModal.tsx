"use client";
import useEstateStore from "@/services/store";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import Button from "../CommonUI/Button";
import { DocumentDuplicateIcon, PuzzlePieceIcon, WalletIcon } from "@heroicons/react/24/solid";

const AssetModal = () => {
  const selectedRealEstateState = useEstateStore().selectedRealEstateState;
  const isOpen = !!selectedRealEstateState;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="fixed w-full max-w-sm left-6 top-20">
          <div className="overflow-hidden rounded-lg">
            <div className="relative w-full h-56 aspect-square">
              <Image alt="" fill src="/assets/images/estate-placeholder.jpg" />
            </div>
            <div className="px-4 py-3 space-y-0.5 text-black bg-white lg:px-5 lg:py-4">
              <h2 className="font-semibold">{selectedRealEstateState?.name || ""}</h2>
              <p className="font-medium text-[#00c805]">RTTG</p>
              <p className="w-full text-sm truncate">
                With a minimum investment of 1$ in the Tropical Garden project, you will receive a
                2% return on investment every month.
              </p>
            </div>

            <div className="bg-[#00c805] w-full h-1"></div>

            <div className="px-4 py-2 mt-px bg-white lg:px-5 lg:py-3">
              <div className="flex justify-between">
                <div>
                  <div className="text-slate-900">Total raised</div>
                  <div className="font-bold text-black">$129, 872</div>
                </div>
                <div>
                  <div className="text-slate-900">Total supply</div>
                  <div className="font-bold text-black">129,872 Tokens</div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 mt-px bg-white lg:px-5 lg:py-4">
              <div className="flex items-center">
                <div className="flex items-center w-3/5 gap-2 text-black">
                  <WalletIcon width={20} color="black" className="inline-flex" />
                  <span>Accepted currency</span>
                </div>
                <div className="w-2/5 font-bold text-black">USDT</div>
              </div>
            </div>
            <div className="px-4 py-3 mt-px bg-white lg:px-5 lg:py-4">
              <div className="flex items-center">
                <div className="flex items-center w-3/5 gap-2 text-black">
                  <PuzzlePieceIcon width={20} color="black" className="inline-flex" />
                  <span>Underlying Asset</span>
                </div>
                <div className="w-2/5 font-bold text-black">Real Estate</div>
              </div>
            </div>
            <div className="px-4 py-3 mt-px bg-white lg:px-5 lg:py-4">
              <div className="flex items-center">
                <div className="flex items-center w-3/5 gap-2 text-black">
                  <DocumentDuplicateIcon width={20} color="black" className="inline-flex" />
                  <span>Total expected return</span>
                </div>
                <div className="w-2/5 font-bold text-black">30.5%</div>
              </div>
            </div>
          </div>
          <div className="mt-1.5">
            <Button
              href={`/projects/${selectedRealEstateState?.id || ""}`}
              className="w-full !rounded-md"
            >
              View Detail
            </Button>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default AssetModal;
