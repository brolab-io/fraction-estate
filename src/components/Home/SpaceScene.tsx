"use client";
import { MyScene } from "@/libs/MyScene";
import { Engine } from "@babylonjs/core";
import { memo, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";

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

  const setupSpace = useCallback(() => {
    const engine = new Engine(canvasRef.current);
    const scene = new MyScene(engine);
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
      <canvas style={canvasStyle} ref={canvasRef} id="space">
        {children}
      </canvas>
    </>
  );
};

export default memo(SpaceScene, isEqual);
