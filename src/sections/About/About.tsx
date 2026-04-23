import "./About.scss";
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
    { title: "Senior Frontend Specialist", desc: "逾 7 年大型專案實戰，深耕嵌入式系統與 IoT 控制介面。" },
    { title: "Technical Stack Expertise", desc: "精通 Vue 3 生態系，並具備優化大規模 Canvas 組件的豐富經驗。" },
    { title: "Strategic Problem Solver", desc: "超越單純編碼，從設計源頭介入，提供具高度擴展性的技術架構。" }
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
    <section id="about" ref={containerRef} className="about-section">
      <div className="about-content">
        {content.map((item, index) => (
          <div className="highlight-item" key={index}>
            <div className="title" data-text={item.title}></div>
            <div className="description" data-text={item.desc}></div>
          </div>
        ))}
      </div>
      <div className="about-image">
        <PolaroidFrame children={
          <img
            ref={imgRef}
            src={lifestyleImage}
            alt="Life Style Photo"
          />
        } />
      </div>
      <StateMarker key="about-marker" isParentAnimDone={animDone} statusText="UPDATE_STEP_002" />
    </section>
  )
}

export default About