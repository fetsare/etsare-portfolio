import ProjectCard from "../ui/ProjectCard";
import { Project } from "../data/types";
import projects from "../data/projects.json";
import DeviconScroller from "../ui/DeviconScroller";

const Projects = () => {
  return (
    <section id="projects">
      <DeviconScroller />
      <div className="w-full columns-1 md:columns-2 gap-4 space-y-4">
        {projects.map((project: Project, index: number) => (
          <ProjectCard
            key={index}
            name={project.name}
            description={project.description}
            image={project.image}
            link={project.link}
            video={project.video}
            github={project.github}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
