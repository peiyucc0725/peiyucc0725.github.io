import "./Experience.scss";
import { useRef } from 'react';

const Experience = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" ref={container} className="experience-section">
      Experience
    </section>
  )
}

export default Experience