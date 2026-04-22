import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const initActions = () => {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#hero",
          start: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.fromTo(logoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: "#hero",
            start: "bottom 20%",
            end: "bottom 20%",
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        }
      );
    }

    const timer = setTimeout(initActions, 50)

    return () => clearTimeout(timer);
  }, { scope: headerRef });

  return (
    <div className="header fixed-header" ref={headerRef}>
      <div className="logo" ref={logoRef}>
        <img src="/logo.png" width={80} height={80} alt="PeiYu" />
      </div>
      <div className="menu">
        <ul className="menu-list">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;