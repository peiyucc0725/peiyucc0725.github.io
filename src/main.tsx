import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/variable.scss'
import './index.scss'
import App from './App.tsx'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
