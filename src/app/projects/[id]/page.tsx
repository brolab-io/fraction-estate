"use client";
import ProjectScene from "@/components/Project/ProjectScene";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("@/components/Project/ProjectModal"), { ssr: false });

type PageProps = {
  params: {
    id: string;
  };
};

const ProjectPage = ({ params: { id } }: PageProps) => {
  return (
    <main className="relative w-full h-full">
      <ProjectScene />
      <ProjectModal realEstateId={id} />
    </main>
  );
};

export default ProjectPage;
