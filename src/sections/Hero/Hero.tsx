import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.scss';
import StateMarker from '../../components/StateMarker'
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const rafId = useRef<number | null>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const xToRef = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const yToRef = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const [animDone, setAnimDone] = useState(false);

  const updateRotation = () => {
    xToRef.current?.(pointerTarget.current.x);
    yToRef.current?.(pointerTarget.current.y);
    rafId.current = null;
  };

  const moveMouse = (e: MouseEvent) => {
    const relX = (e.clientX / window.innerWidth - 0.5) * 2;
    const relY = (e.clientY / window.innerHeight - 0.5) * 2;

    pointerTarget.current.x = relX * 15;
    pointerTarget.current.y = -relY * 15;

    if (rafId.current === null) {
      rafId.current = window.requestAnimationFrame(updateRotation);
    }
  };

  useGSAP(() => {
    const q = gsap.utils.selector(container);

    gsap.set(logoWrapperRef.current, {
      transformPerspective: 1000,
      z: 0 // 強制 GPU 開啟 3D
    });

    const titleWords = q(".hero-title__word");
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => setAnimDone(true)
    });

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 2.5,
      z: -100
    })
      .from(titleWords, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15, // 錯開進場
        skewY: 7,      // 增加斜向進場效果
      }, "-=0.8") // 在 Logo 動畫快結束時提前開始
      .from(q(".hero-subtitle"), {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.5");

    xToRef.current = gsap.quickTo(logoWrapperRef.current, "rotationY", { duration: 0.5, ease: "power3" });
    yToRef.current = gsap.quickTo(logoWrapperRef.current, "rotationX", { duration: 0.5, ease: "power3" });

    window.addEventListener("mousemove", moveMouse);

    gsap.to(logoRef.current, {
      rotationY: 360,
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
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, { scope: container });

  return (
    <section id="hero" ref={container} className="hero-section h-screen min-h-screen flex flex-col items-center justify-center 
      relative overflow-hidden px-[8vw] md:px-[12vw]">
      <div ref={logoWrapperRef} className="logo-wrapper relative inline-block">
        <img
          ref={logoRef}
          src="/logo.png"
          alt="Logo"
          className="big-logo 3d-object display-block mx-auto"
        />
      </div>

      <h1 className="hero-title flex justify-center flex-wrap gap-[30px] cursor-default text-center text-text-muted">
        <span className="hero-title__word">Hello, </span>
        <span className="hero-title__word">I'm</span>
        <span className="hero-title__word name uppercase">PeiYu</span>
      </h1>

      <span className="hero-subtitle relative mx-auto w-fit text-text-muted-light mb-1">
        {t('common.seniorFrontend')}
      </span>

      <span className="hero-subtitle relative mx-auto w-fit text-text-muted-light">
        {t('home.description')}
      </span>

      <StateMarker key="hero-marker" isParentAnimDone={animDone} />
    </section>
  );
};

export default Hero;