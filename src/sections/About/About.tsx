import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from "gsap/TextPlugin";
import PolaroidFrame from '../../components/PolaroidFrame'
import lifestyleImage from '../../assets/images/lifestyle.jpg'
import StateMarker from '../../components/StateMarker'

gsap.registerPlugin(TextPlugin);

const About = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animDone, setAnimDone] = useState(false);

  const content = [
    {
      title: "Senior Frontend Specialist",
      desc: "超過 7 年大型專案開發經驗，專注於嵌入式系統 Web 介面與 IoT 控制設備。"
    },
    {
      title: "Technical Stack Expertise",
      desc: "精通 Vue 3 生態系，並具備大規模 Canvas 組件與效能優化的實務經驗。"
    },
    {
      title: "Strategic Problem Solver",
      desc: "不只是寫 Code，更從產品設計階段介入，提供具備高度擴充性的技術架構建議。"
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      onComplete: () => setAnimDone(true)
    });

    tl.fromTo(imgRef.current,
      { filter: "blur(15px) grayscale(100%)", opacity: 0 },
      { filter: "blur(0px) grayscale(0%)", opacity: 1, duration: 1.2 }
    )
    const items = gsap.utils.toArray<HTMLElement>('.highlight-item');
    items.forEach((item) => {
      const title = item.querySelector('.title');
      const desc = item.querySelector('.description');
      const fullTitle = title?.getAttribute('data-text') || "";
      const fullDesc = desc?.getAttribute('data-text') || "";

      tl.to(title, {
        duration: 0.5,
        text: { value: fullTitle },
        ease: "none"
      }, ">-0.2") // 銜接在前一個動畫快結束時
        .to(desc, {
          duration: 1,
          text: { value: fullDesc },
          ease: "none"
        }, ">-0.1");
    });

  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="about-section min-h-screen flex flex-col-reverse md:flex-row px-[8vw] md:px-[12vw] items-center justify-center relative gap-[30px] md:gap-[60px]"
    >
      <div className="about-content w-full lg:w-[50vw] flex flex-col md:items-start justify-center items-center">
        <div className="flex flex-col items-start w-fit px-0">
          {content.map((item, index) => (
            <div
              className="highlight-item flex flex-col items-start min-h-[61px] md:min-h-[81px] max-w-full text-start mb-4 last:mb-0 md:mb-6 w-fit"
              key={index}
            >
              <div
                className="title title-color text-title font-mono text-[1rem] md:text-[1.1rem] font-semibold mb-2 tracking-wider"
                data-text={item.title}
              ></div>
              <div
                className="description text-text-main text-[0.9rem] md:text-[1rem] leading-relaxed opacity-85"
                data-text={item.desc}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-image lg:w-[25vw]">
        <PolaroidFrame>
          <img
            ref={imgRef}
            src={lifestyleImage}
            alt="Life Style Photo"
            className="block"
          />
        </PolaroidFrame>
      </div>

      <StateMarker
        key="about-marker"
        isParentAnimDone={animDone}
        statusText="UPDATE_STEP_002"
      />
    </section>
  )
}

export default About