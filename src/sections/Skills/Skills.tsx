import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Skills.scss';
import StateMarker from '../../components/StateMarker'

interface Skill {
  name: string;
  level: number;
  desc?: string;
}

const skillData: Record<string, Skill[]> = {
  frontend: [
    { name: "Vue", level: 95, desc: "核心技術強項，精通 Vue 2/3 生態系（包含 Router, Pinia），具備大型專案架構設計與效能優化經驗。" },
    { name: "React", level: 60, desc: "目前專案採用的框架，能靈活運用 Hooks 與狀態管理工具，展現跨技術棧的學習力。" },
    { name: "JavaScript", level: 90, desc: "深厚的 ES6+ 基礎，精通非同步處理（Async/Await）、原型鏈及閉包等核心概念。" },
    { name: "jQuery", level: 90, desc: "具備維護大型舊專案與 Legacy Code 的能力，能精確操作 DOM 並處理跨瀏覽器相容性。" },
    { name: "CSS / SCSS / SASS", level: 85, desc: "熟練使用預處理器與 CSS 設計模式，能精準還原設計稿並實作複雜的手勢與動畫。" }
  ],
  backend: [
    { name: "Node.js", level: 50, desc: "擅長撰寫自動化腳本與工具，並具備 Express 開發簡單 RESTful API 的實務經驗。" },
    { name: "PHP", level: 60, desc: "具備 Laravel 與 CodeIgniter 實務開發經驗，曾參與核心系統維護與第三方金流串接。" },
    { name: "Python", level: 65, desc: "具備 Selenium 與 BS4 爬蟲經驗，並曾透過 Flask 實作 Line Bot 與 OpenAI Whisper 語音轉文字應用。" },
    { name: "MySQL", level: 60, desc: "具備資料庫設計與操作經驗，能撰寫 SQL 語法進行 CRUD 操作並優化資料查詢結構。" }
  ],
  tools: [
    { name: "Electron", level: 70, desc: "具備跨平台桌面端開發經驗，能將前端技術轉化為穩定運作的離線應用程式。" },
    { name: "Vite / Webpack", level: 80, desc: "掌握前端建置工具，能優化打包配置（Bundling）以大幅縮減載入時間與專案體積。" },
    { name: "Git", level: 90, desc: "精通 Git Flow 版本控制與多人協作，具備優良的開發規範與衝突解決（Conflict）處理經驗。" }
  ]
};

const Skills: React.FC = () => {
  const [activeCat, setActiveCat] = useState<string>('frontend');
  const containerRef = useRef<HTMLDivElement>(null);
  const [animDone, setAnimDone] = useState(false);
  const lastIsMobile = useRef(typeof window !== 'undefined' ? window.innerWidth <= 768 : true);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [hasScroll, setHasScroll] = useState(false);
  const resizeTimeout = useRef<number | null>(null);

  const checkScroll = () => {
    requestAnimationFrame(() => {
      const activeEl = contentRefs.current[activeCat];
      if (activeEl) {
        const isOverflowing = activeEl.scrollHeight > activeEl.clientHeight + 1;
        setHasScroll(isOverflowing);
      }
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let handleResize: () => void;

    const ctx = gsap.context(() => {
      const updatePanels = (forceAnim = false) => {
        const isMobile = window.innerWidth <= 768;
        const isBreakpointSwitched = isMobile !== lastIsMobile.current;

        if (forceAnim || isBreakpointSwitched) {
          const panels = containerRef.current?.querySelectorAll('.skill-panel');

          panels?.forEach((panel) => {
            const id = panel.getAttribute('data-id');
            const isActive = id === activeCat;
            const content = panel.querySelector('.panel-content');
            const progressFills = panel.querySelectorAll('.progress-fill');
            const descs = panel.querySelectorAll('.desc');

            gsap.killTweensOf([panel, content, progressFills]);

            const tl = gsap.timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
              onComplete: () => {
                if (isActive) {
                  setAnimDone(true);
                  gsap.set(panel, { clearProps: "all" });
                  checkScroll();
                }
              }
            });

            if (isActive) {
              tl.to(panel, {
                flexGrow: isMobile ? 0 : 12,
                flexBasis: isMobile ? "auto" : "0%",
                duration: 0.8,
              })
                .to(content, {
                  opacity: 1, x: 0, y: 0,
                  duration: 0.5,
                }, "-=0.4");

              if (forceAnim) {
                tl.fromTo(progressFills,
                  { scaleX: 0 },
                  { scaleX: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
                  "-=0.3"
                )
                  .to(descs,
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.8,
                      stagger: 0.1,
                      ease: "expo.out",
                    },
                    "<"
                  );
              }
            } else {
              tl.to(content, {
                opacity: 0,
                x: isMobile ? 0 : -20,
                y: isMobile ? -20 : 0,
                duration: 0.3,
              })
                .to(panel, {
                  flexGrow: 0,
                  flexBasis: isMobile ? "60px" : "80px",
                  width: isMobile ? "100%" : "80px",
                  duration: 0.6,
                }, "<");
            }
          });
        }

        lastIsMobile.current = isMobile;
      };

      updatePanels(true);

      handleResize = () => {
        if (resizeTimeout.current !== null) {
          window.clearTimeout(resizeTimeout.current);
        }
        resizeTimeout.current = window.setTimeout(() => {
          updatePanels(false);
          resizeTimeout.current = null;
        }, 120);
      };

      window.addEventListener('resize', handleResize, { passive: true });
    }, containerRef);

    return () => {
      if (resizeTimeout.current !== null) {
        window.clearTimeout(resizeTimeout.current);
        resizeTimeout.current = null;
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      ctx.revert();
    };
  }, [activeCat]);

  return (
    <section id="skills" className="skills-section" ref={containerRef}>
      {Object.entries(skillData).map(([key, skills], index) => (
        <div
          key={key}
          className={`skill-panel ${activeCat === key ? 'active' : ''}`}
          data-id={key}
          onClick={() => {
            setActiveCat(key);
            setHasScroll(false);
          }}
        >
          <div className="panel-label">
            <span className="num">0{index + 1}</span>
            <h2 className="title">{key.toUpperCase()}</h2>
          </div>

          <div
            className="panel-content"
            ref={(el) => { contentRefs.current[key] = el; }}
            style={{
              overscrollBehavior: (activeCat === key && hasScroll) ? 'contain' : 'auto'
            }}
          >
            {skills.map((skill, i) => (
              <div key={i} className="skill-item">
                <div className="skill-info">
                  <span className="name">{skill.name}</span>
                  <span className="percent">{skill.level}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${skill.level}%`, transformOrigin: 'left' }}
                  ></div>
                </div>
                {skill.desc && <p className="desc">{skill.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <StateMarker key="about-marker" isParentAnimDone={animDone} statusText="UPDATE_STEP_003" />
    </section>
  );
};

export default Skills;