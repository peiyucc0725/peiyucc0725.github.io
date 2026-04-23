import "./Skills.scss";
import { useRef } from 'react';

const Skills = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" ref={container} className="skills-section">
      Skills
    </section>
  )
}

export default Skills