import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = () => {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: t('navbar.home') },
    { id: 'about', label: t('navbar.about') },
    { id: 'experience', label: t('navbar.experience') },
    { id: 'skills', label: t('navbar.skills') },
    { id: 'projects', label: t('navbar.projects') },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: `#${id}`, offsetY: 0 },
      ease: "power3.inOut"
    });
  };

  useGSAP(() => {
    const initActions = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: "top 20%",
          end: "bottom 20%",
          onToggle: self => self.isActive && setActiveSection(section.id)
        });
      });

      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#hero",
          start: "bottom 20%",
          toggleActions: "play none none reverse",
          onToggle: () => setIsMenuOpen(false)
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

  useGSAP(() => {
    const activeLi = menuRef.current?.querySelector(`.nav-item-${activeSection}`) as HTMLElement;

    if (activeLi && indicatorRef.current && window.innerWidth > 768) {
      gsap.to(indicatorRef.current, {
        x: activeLi.offsetLeft,
        width: activeLi.offsetWidth,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [activeSection]);

  return (
    <div className="header fixed-header" ref={headerRef}>
      {/* <div className="logo" ref={logoRef}>
        <img src="/logo.png" width={80} height={80} alt="PeiYu" />
      </div> */}

      <button 
        className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
        <ul className="menu-list" ref={menuRef} style={{ position: 'relative' }}>
          <span className="nav-indicator" ref={indicatorRef}></span>
          {menuItems.map(item => (
            <li key={item.id} className={`nav-item-${item.id}`}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleScroll(e, item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;