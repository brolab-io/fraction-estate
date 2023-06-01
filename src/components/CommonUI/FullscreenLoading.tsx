"use client";
import Lottie from "lottie-react";
import loadingJson from "./62478-city-buildings.json";
import { forwardRef, useImperativeHandle, useState } from "react";

// @ts-ignore
const FullscreenLoading = (_, ref) => {
  const [show, setShow] = useState(true);
  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    hide: () => setShow(false),
  }));
  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-70">
      <Lottie className="h-[300px]" animationData={loadingJson} />
      <p className="mt-6 text-xl lg:mt8">Loading, please wait....</p>
    </div>
  );
};

export default forwardRef(FullscreenLoading);
