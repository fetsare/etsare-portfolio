import ProjectCard from "../components/ProjectCard";
import { projects } from "../content/meta";

const Projects = () => {
  return (
    <section id="projects">
      <div className="w-full columns-1 md:columns-2 gap-4 space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
