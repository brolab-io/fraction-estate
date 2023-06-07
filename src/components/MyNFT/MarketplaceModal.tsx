import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../CommonUI/Button";
import ListMyNFT from "./ListMyNFT";

const MarketplaceModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button
          className="!rounded-md !pt-1.5 !pb-1 !flex-col w-24 items-center justify-center flex !font-normal !text-sm"
          onClick={openModal}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9 5.51895H13.6L11 1.41895C11 1.41895 11 1.31895 11.1 1.31895C11.2 0.71895 10.8 0.21895 10.3 0.11895C9.7 0.0189502 9.2 0.41895 9.1 0.91895C9 1.51895 9.4 2.01895 9.9 2.11895H10L12.2 5.61895H9H5.7L8.1 2.01895C8.5 2.01895 8.9 1.71895 9 1.21895C9.1 0.61895 8.7 0.11895 8.2 0.01895C7.7 -0.08105 7.1 0.21895 7 0.81895C7 1.01895 7 1.21895 7.1 1.31895L4.3 5.51895H0.8C0.5 5.61895 0 5.81895 0 7.01895L1.6 16.6189C1.6 16.6189 1.7 17.219 2.6 17.219H7.4H11.8H15C16 17.219 16.1 16.6189 16.1 16.6189L18 7.01895C18 5.41895 16.9 5.51895 16.9 5.51895ZM4.6 14.219C4.6 14.6189 4.3 14.919 3.9 14.919C3.5 14.919 3.2 14.6189 3.2 14.219V8.91895C3.2 8.51895 3.5 8.21895 3.9 8.21895C4.3 8.21895 4.6 8.51895 4.6 8.91895V14.219ZM7.1 14.219C7.1 14.6189 6.8 14.919 6.4 14.919C6 14.919 5.7 14.6189 5.7 14.219V8.91895C5.7 8.51895 6 8.21895 6.4 8.21895C6.8 8.21895 7.1 8.51895 7.1 8.91895V14.219ZM9.7 14.219C9.7 14.6189 9.4 14.919 9 14.919C8.6 14.919 8.3 14.6189 8.3 14.219V8.91895C8.3 8.51895 8.6 8.21895 9 8.21895C9.4 8.21895 9.7 8.51895 9.7 8.91895V14.219ZM12.2 14.219C12.2 14.6189 11.9 14.919 11.5 14.919C11.1 14.919 10.8 14.6189 10.8 14.219V8.91895C10.8 8.51895 11.1 8.21895 11.5 8.21895C11.9 8.21895 12.2 8.51895 12.2 8.91895V14.219ZM14.8 14.219C14.8 14.6189 14.5 14.919 14.1 14.919C13.7 14.919 13.4 14.6189 13.4 14.219V8.91895C13.4 8.51895 13.7 8.21895 14.1 8.21895C14.5 8.21895 14.8 8.51895 14.8 8.91895V14.219Z"
              fill="white"
            />
          </svg>
          <span className="whitespace-nowrap mt-0.5">Marketplace</span>
        </Button>
      </div>
      <Transition
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isOpen}
        as={Fragment}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-[90%] lg:max-w-[900px] xl:max-w-[1200px] h-full max-h-[90%]">
            <div className="flex flex-col items-center justify-center w-full h-full bg-[#1A202C] rounded-lg">
              {/* COMMING SOON */}
              <h1 className="text-4xl font-semibold text-white">COMING SOON</h1>
              <Button className="!rounded-md mt-4" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default MarketplaceModal;
