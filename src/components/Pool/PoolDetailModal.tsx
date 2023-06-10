import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import PoolDetail from "./PoolDetail";

type Props = {
  poolId?: string;
};

const PoolDetailModal: React.FC<Props> = ({ poolId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof poolId === "string" && poolId.length > 0) {
      const timeoutId = setTimeout(openModal, 300);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [poolId]);

  return (
    <>
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
            <PoolDetail handleClose={closeModal} poolId={poolId} />
          </div>
        </div>
      </Transition>
    </>
  );
};

export default PoolDetailModal;
