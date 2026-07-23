import Image from "next/image";
import type { Project } from "@/data/content";

export default function ProjectArtwork({ project, sizes = "100vw" }: { project: Project; sizes?: string }) {
  return (
    <div className="work-art project-art">
      <Image src={project.image} alt={project.imageAlt} fill sizes={sizes} />
    </div>
  );
}
