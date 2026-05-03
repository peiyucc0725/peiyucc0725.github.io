import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";
import PolaroidFrame from '../../components/PolaroidFrame';
import lifestyleImage from '../../assets/images/lifestyle.jpg';
import StateMarker from '../../components/StateMarker';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(TextPlugin);

const About = () => {
  const { t } = useTranslation();
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [animDone, setAnimDone] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      onComplete: () => setAnimDone(true)
    });

    tl.fromTo(countRef.current,
      { innerText: "0" },
      {
        innerText: "7",
        duration: 3,
        snap: { innerText: 1 },
        ease: "power2.out"
      })
      .from(".about-paragraph", {
        y: 80,
        opacity: 0,
        stagger: 0.3,
        duration: 2,
        ease: "power2.out"
      }, "<")
      .fromTo(imgRef.current,
        { filter: "blur(15px) grayscale(100%)", opacity: 0 },
        { filter: "blur(0px) grayscale(0%)", opacity: 1, duration: 1 },
        "<"
      );

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="about-section relative min-h-screen pt-20">
      <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-80px)] gap-12 lg:gap-16 w-full px-[8vw] md:px-[12vw] lg:mb-0 mb-20 lg:h-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 w-full lg:flex-1">
          <div className="flex flex-col items-center md:items-start min-w-[140px] md:min-w-[180px] 
              border-t md:border-t-0 md:border-l border-black/10 pt-8 md:pt-0 md:pl-8">
            <div className="relative">
              <span ref={countRef} className="text-[100px] md:text-[140px] font-serif leading-none text-primary">
                0
              </span>
              <span className="text-3xl md:text-5xl font-serif text-primary absolute top-2 md:top-4 -right-8 md:-right-10">+</span>
            </div>
            <div className="mt-4 md:mt-10 text-[0.75rem] md:text-sm uppercase tracking-[0.2em] text-text-main/60 font-medium text-center md:text-left">
              <div className="text-[14px]">{t('about.year')}</div>
              <div>{t('about.devExperience')}</div>
            </div>
            <div className="mt-4 md:mt-6 text-[10px] md:text-xs text-text-main/40 font-mono italic">
              {t('common.seniorFrontend')}
            </div>

            <div className="about-paragraph mt-6 inline-flex items-center gap-3 px-4 py-2 border border-black/5 bg-black/2 rounded-sm w-fit mx-auto md:mx-0">
              {/* 在職中的狀態 bg-green-500, 等待機會的狀態 bg-blue-500 */}
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-mono text-text-main/60 uppercase tracking-widest">
                {t('about.currentStatus')}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-[480px]">
            <div className="about-paragraph mb-6 text-text-main text-[0.9rem] md:text-[1.05rem] leading-[1.7] md:leading-[1.8] text-justify opacity-90">
              {t('about.paragraph1')}
            </div>
            <div className="about-paragraph mb-6 text-text-main text-[0.9rem] md:text-[1.05rem] leading-[1.7] md:leading-[1.8] text-justify opacity-90">
              {t('about.paragraph2')}
            </div>
            <div className="about-paragraph text-text-main text-[0.9rem] md:text-[1.05rem] leading-[1.7] md:leading-[1.8] text-justify opacity-90">
              {t('about.paragraph3')}
            </div>
          </div>
        </div>

        <div className="about-image relative group md:w-[320px] lg:w-[22vw] shrink-0">
          <PolaroidFrame text={`22° 37' 38" N, 120° 18' 05" E`}>
            <div className="relative overflow-hidden">
              <img
                ref={imgRef}
                src={lifestyleImage}
                alt="Life Style Photo"
                className="block w-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </PolaroidFrame>
        </div>
      </div>
      <StateMarker isParentAnimDone={animDone} statusText="UPDATE_STEP_002" />
    </section>
  );
};

export default About;