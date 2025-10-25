import ProjectCard from "../components/ProjectCard";
import LogoLoop from "../components/LogoLoop";
import FadeInSection from "../components/FadeInSection";
import { projects, techIcons } from "../content/meta";

const Projects = () => {
  const logoItems = techIcons.map((icon) => ({
    node: <i className={`${icon.className} text-5xl`} />,
    href: icon.href,
    title: icon.alt,
    ariaLabel: icon.alt,
  }));

  return (
    <section id="projects">
      <div className="mb-6">
        <LogoLoop
          logos={logoItems}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={32}
          pauseOnHover={true}
          fadeOut={true}
          scaleOnHover={true}
        />
      </div>
      <div className="w-full columns-1 md:columns-2 gap-4 space-y-4">
        {projects.map((project, index) => (
          <FadeInSection
            key={index}
            direction="up"
            duration={500}
          >
            <ProjectCard {...project} />
          </FadeInSection>
        ))}
      </div>
    </section>
  );
};

export default Projects;
