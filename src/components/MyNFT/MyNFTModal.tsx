import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../CommonUI/Button";
import ListMyNFT from "./ListMyNFT";

const MyNFTModal = () => {
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
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8841 2L15.0921 0H4.9085L4.34274 1.8C4.34274 1.8 -4.70933 2.4 3.32438 13.8L3.21123 15.7C3.32438 17.3 4.9085 17.8 4.9085 17.8H5.70055V13.8C5.70055 13.8 5.92686 12.5 8.07672 12.4H8.41618H11.4713H11.8107C13.8474 12.6 14.1869 13.8 14.1869 13.8V17.8H14.5263C16.4499 17.9 16.7893 16 16.7893 16V13.7C23.8047 3.7 17.3551 2.2 15.8841 2ZM10.2266 4.9C10.6792 4.9 11.1318 5.3 11.1318 5.8C11.1318 6.3 10.6792 6.7 10.2266 6.7C9.66084 6.7 9.32138 6.3 9.32138 5.8C9.20823 5.3 9.66084 4.9 10.2266 4.9ZM16.563 5.2C13.7343 9.4 10.1134 9 10.1134 9C6.26631 9.1 3.66384 5 3.66384 5L3.43754 10.9C2.41918 9.3 0.0430075 4.5 3.89014 3.2L3.66384 3.6C3.66384 3.6 6.94521 8.2 10.0003 7.9C10.0003 7.9 13.8474 8.2 16.4499 3.6L16.3367 3.4C19.6181 4.8 17.6945 8.9 16.563 10.7V5.2Z"
              fill="white"
            />
          </svg>
          <span className="whitespace-nowrap mt-0.5">My Assets</span>
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
            <ListMyNFT handleClose={closeModal} />
          </div>
        </div>
      </Transition>
    </>
  );
};

export default MyNFTModal;
