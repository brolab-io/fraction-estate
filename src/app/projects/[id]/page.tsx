"use client";
import ProjectScene from "@/components/Project/ProjectScene";
import useFractions from "@/hooks/useFractions";

const HomePage = () => {
  useFractions();

  return (
    <main className="relative w-full h-full">
      <ProjectScene />
    </main>
  );
};

export default HomePage;
