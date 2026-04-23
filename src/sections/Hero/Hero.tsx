import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.scss';

const Hero: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);

  const runShuffle = (target: string) => {
    if (!statusTextRef.current) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    let iteration = 0;

    const interval = setInterval(() => {
      const shuffled = target
        .split("")
        .map((_, index) => {
          if (index < iteration) return target[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      statusTextRef.current!.innerText = `[${shuffled}]`;

      if (iteration >= target.length) {
        clearInterval(interval);
      }
      iteration += 1 / 4;
    }, 30);
  };

  useGSAP(() => {
    const q = gsap.utils.selector(container);

    gsap.set(logoWrapperRef.current, {
      transformPerspective: 1000,
      z: 0 // 強制 GPU 開啟 3D
    });

    const titleWords = q(".title-word");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      z: -100 // 從深處滑入
    })
      .from(titleWords, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15, // 錯開進場
        skewY: 7,      // 增加斜向進場效果
      }, "-=0.8") // 在 Logo 動畫快結束時提前開始
      .from(q(".subtitle"), {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.5")
      .from(markerRef.current, {
        opacity: 0,
        x: 20,
        duration: 1,
        ease: "power2.out"
      }, "-=1")
      .call(() => {
        runShuffle("UPDATE_STEP_001");
      });

    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    });

    const xTo = gsap.quickTo(logoWrapperRef.current, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(logoWrapperRef.current, "rotationX", { duration: 0.5, ease: "power3" });

    const moveMouse = (e: MouseEvent) => {
      // 計算滑鼠相對於視窗中心的百分比位置 (-1 to 1)
      const relX = (e.clientX / window.innerWidth - 0.5) * 2;
      const relY = (e.clientY / window.innerHeight - 0.5) * 2;

      // 限制旋轉角度在 +-15 度以內
      xTo(relX * 15);
      yTo(-relY * 15); // Y 軸反向
    };

    window.addEventListener("mousemove", moveMouse);

    gsap.to(logoRef.current, {
      rotationY: 360, // 繞 Y 軸旋轉
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom center",
        scrub: 2,
      }
    });

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, { scope: container });

  return (
    <section id="hero" ref={container} className="hero-section flex items-center justify-center relative overflow-hidden">
      <div ref={logoWrapperRef} className="logo-wrapper relative inline-block mb-10">
        <img
          ref={logoRef}
          src="/logo.png"
          width={350}
          height={350}
          alt="Logo"
          className="big-logo 3d-object"
        />
      </div>

      <h1 className="title">
        <span className="title-word">Hello,</span>
        <span className="title-word">I'm</span>
        <span className="title-word name">Pei-Yu</span>
      </h1>

      <p className="subtitle">
        Senior Frontend Engineer. Crafting elegant solutions from complex challenges.
      </p>

      <div ref={markerRef} className="site-state-marker">
        <div className="marker-content">
          <svg ref={spinnerRef} className="spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />
            <path d="M12 2 A10 10 0 0 1 22 12" stroke="#c2a685" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div className="text-group">
            <span className="label">SYSTEM_STATUS</span>
            <span className="value" ref={statusTextRef}>[***************]</span>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Hero;