import "./About.scss";
import { useRef } from 'react';

const About =() => {
  const container = useRef<HTMLDivElement>(null);

  return (<section id="about" ref={container} className="about-section"></section>)
}

export default About