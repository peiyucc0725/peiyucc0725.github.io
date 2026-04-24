import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StateMarker from '../../components/StateMarker';
import { EXPERIENCES } from './Contents';
import './Experience.scss';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [animDone, setAnimDone] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      onEnter: () => setAnimDone(true),
      onLeaveBack: () => setAnimDone(false),
    });

    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      }
    );

    EXPERIENCES.forEach((exp, index) => {
      const itemSelector = `.exp-item-${index}`;

      gsap.from(itemSelector, {
        opacity: 0,
        x: 30,
        duration: 1,
        scrollTrigger: {
          trigger: itemSelector,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="experience-section">
      <div className="timeline-container">
        <div className="timeline-base-line" />
        <div ref={lineRef} className="timeline-growth-line" />

        {EXPERIENCES.map((exp, index) => (
          <div key={index} className={`exp-item exp-item-${index}`}>
            <div className="exp-dot" />
            <div className="exp-body">
              <header className="exp-header">
                <span className="exp-date">{exp.period}</span>
                <h3 className="exp-company">{exp.company}</h3>
                <span className="exp-duration">[{exp.duration}]</span>
              </header>

              <div className="exp-roles">
                {exp.roles.map((role, rIdx) => (
                  <div key={rIdx} className="role-entry">
                    <span className="role-title">{role.title}</span>
                    <span className="role-date">{role.date}</span>
                  </div>
                ))}
              </div>

              <ul className="exp-desc">
                {exp.description.map((desc, dIdx) => (
                  <li key={dIdx}>{desc}</li>
                ))}
              </ul>

              <div className="exp-tech">
                {exp.tech.map(t => <span key={t} className="tech-tag">#{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="monitor-anchor">
        <StateMarker
          isParentAnimDone={animDone}
          statusText="UPDATE_STEP_004"
        />
      </div>
    </section>
  );
};

export default Experience;