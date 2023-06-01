"use client";
import { CityScene } from "@/libs/CityScene";
import { Engine } from "@babylonjs/core";
import { memo, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import FullscreenLoading from "../CommonUI/FullscreenLoading";

const canvasStyle = {
  height: "100%",
  width: "100%",
};

const SpaceScene: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@babylonjs/loaders");
      require("@babylonjs/inspector");
      setMounted(true);
    }
  }, []);

  const ref = useRef<any>(null);

  const setupSpace = useCallback(() => {
    if (!ref.current) return;
    const engine = new Engine(canvasRef.current);
    const scene = new CityScene(engine, ref);
    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    if (mounted && canvasRef.current) {
      return setupSpace();
    }
  }, [mounted, setupSpace]);

  if (!mounted) return null;

  return (
    <>
      <FullscreenLoading ref={ref} />
      <canvas style={canvasStyle} ref={canvasRef} id="space">
        {children}
      </canvas>
    </>
  );
};

export default memo(SpaceScene, isEqual);
