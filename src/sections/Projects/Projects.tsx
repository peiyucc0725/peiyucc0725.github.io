import './Projects.scss';
// @ts-ignore
import 'swiper/css';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import projects from './Contents';
import StateMarker from '../../components/StateMarker'

const ProjectSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [animDone, setAnimDone] = useState(false);

  const toggleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      onComplete: () => setAnimDone(true)
    });
  }, {});

  return (
    <section id="projects" ref={containerRef} className="projects-section">
      <div className="max-w-5xl w-full mx-auto pt-14">
        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={1}
          autoHeight={false}
          grabCursor={true}
          navigation={{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="py-8">
              <div
                className="group relative h-95 max-w-95 w-full mx-auto perspective-distant cursor-pointer"
                onClick={() => toggleFlip(project.id)}
              >
                <div
                  className={`relative h-full w-full transition-transform duration-700 transform-3d ${flippedId === project.id ? 'transform-[rotateY(180deg)]' : ''
                    }`}
                >

                  <div className="absolute inset-0 [backface-hidden] bg-card-bg backdrop-blur-sm rounded-4xl overflow-hidden border border-card-border flex flex-col duration-500 hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-bg-secondary">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out pointer-events-none"
                        />
                      </div>
                    </div>

                    <div className="px-7 pb-8 text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase font-semibold">
                          {project.category}
                        </span>
                        <span className="text-[10px] text-text-muted font-mono mb-1">
                          @{project.company}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text-main font-mono truncate">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-[10px] font-mono uppercase rounded-full border border-primary/20 text-text-muted bg-white/40 backdrop-blur-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] bg-primary-dark rounded-4xl border border-primary/20 flex flex-col p-8 justify-center shadow-inner">
                    <h4 className="text-primary-light font-mono text-[10px] tracking-[0.3em] uppercase mb-4 border-b border-primary/20 pb-2">
                      Feature Details
                    </h4>
                    <div className="text-bg-primary font-mono text-sm leading-relaxed">
                      <p className="mb-2 font-bold">{project.content.summary}</p>

                      <ul className="list-inside space-y-1">
                        {project.content.highlights.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <span className="text-primary-light/40 text-[9px] font-mono italic">
                        // click to return
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-6 mt-4">
          <button className="prev-btn group cursor-pointer">
            <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 text-text-main">
              ←
            </div>
          </button>
          <button className="next-btn group cursor-pointer">
            <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 text-text-main">
              →
            </div>
          </button>
        </div>
      </div>
      <StateMarker key="projects-marker" isParentAnimDone={animDone} statusText="UPDATE_STEP_005" />
    </section>
  );
};

export default ProjectSlider;