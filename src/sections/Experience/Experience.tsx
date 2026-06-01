import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StateMarker from '../../components/StateMarker';
import { getExperiences } from './Contents.ts';
import './Experience.scss';
import { useTranslation } from 'react-i18next';

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [animDone, setAnimDone] = useState(false);
  const EXPERIENCES = getExperiences(t);

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

    EXPERIENCES.forEach((_, index) => {
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
    <section id="experience" ref={containerRef} className="experience-section relative min-h-screen pt-20">
      <div className="timeline-container relative md:w-full max-w-[calc(100vw-80px)] lg:max-w-[948px] mx-auto py-5 pl-10 md:pl-[40px]">
        <div className="timeline-base-line absolute left-0 top-0 w-[1px] h-full bg-black/5" />
        <div ref={lineRef} className="timeline-growth-line absolute left-0 top-0 w-[2px] h-full bg-title origin-top z-[2]" />

        {EXPERIENCES.map((exp, index) => (
          <div key={index} className={`exp-item exp-item-${index} relative mb-32 last:mb-20`}>
            <div className="exp-dot absolute -left-[45px] md:-left-[45px] top-[5px] w-3 h-3 border-2 border-title bg-white rounded-full z-[3]" />

            <div className="exp-body">
              <header className="exp-header mb-5">
                <span className="exp-date text-title">{exp.period}</span>
                <h3 className="exp-company text-[1.8rem] font-bold my-2 text-text-main">{exp.company}</h3>
                <span className="exp-duration text-xs text-text-muted">[{exp.duration}]</span>
              </header>

              <div className="exp-roles mb-6">
                {exp.roles.map((role, rIdx) => (
                  <div key={rIdx} className="role-entry flex items-baseline gap-4 mb-1">
                    <span className="role-title font-semibold text-[#444]">{role.title}</span>
                    <span className="role-date text-[0.85rem] text-text-muted">{role.date}</span>
                  </div>
                ))}
              </div>

              <ul className="exp-desc list-none p-0">
                {exp.description.map((desc, dIdx) => (
                  <li key={dIdx} className="relative pl-[18px] mb-3 leading-[1.7] text-[#555]">{desc}</li>
                ))}
              </ul>

              <div className="exp-tech mt-8 flex flex-wrap gap-3">
                {exp.tech.map(t => (
                  <span key={t} className="tech-tag text-[0.85rem] bg-primary/10 text-primary px-[10px] py-1 rounded uppercase">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 right-0 flex justify-end pointer-events-none z-[2]">
        <StateMarker isParentAnimDone={animDone} statusText="UPDATE_STEP_004" />
      </div>
    </section>
  );
};

export default Experience;