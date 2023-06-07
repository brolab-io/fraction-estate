import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "../CommonUI/Button";
import ListMyNFT from "./ListMyNFT";

const MyNFTModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button className="!rounded-md" onClick={openModal}>
          My Assets
        </Button>
      </div>
      <Transition
        appear
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
