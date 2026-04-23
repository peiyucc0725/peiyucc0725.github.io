import "./Projects.scss";
import { useRef } from 'react';

const Projects = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" ref={container} className="projects-section">
      Projects
    </section>
  )
}

export default Projects