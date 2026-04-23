import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './StateMarker.scss';

interface StateMarkerProps {
  statusText?: string;
  isParentAnimDone?: boolean;
}

const StateMarker: React.FC<StateMarkerProps> = ({
  statusText = 'UPDATE_STEP_001',
  isParentAnimDone = false,
}) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    });
  }, { scope: markerRef }); // 沒放 dependencies，代表只在掛載時啟動一次

  // 2. 入場與退場動畫：控制整個 Marker 的出現與消失
  useGSAP(() => {
    if (isParentAnimDone) {
      // 進入動畫
      const tl = gsap.timeline();
      tl.to(markerRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        onStart: () => {
          if (statusTextRef.current) statusTextRef.current.innerText = "[***************]";
        }
      })
        .call(() => runShuffle(statusText));
    } else {
      // 離開動畫：直接讓整個 Marker（包含 spinner）一起淡出
      gsap.to(markerRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, { dependencies: [isParentAnimDone], scope: markerRef });

  const runShuffle = (target: string) => {
    if (!statusTextRef.current) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    let iteration = 0;

    const interval = setInterval(() => {
      if (!statusTextRef.current) {
        clearInterval(interval);
        return;
      }
      const shuffled = target
        .split("")
        .map((_, index) => {
          if (index < iteration) return target[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      statusTextRef.current.innerText = `[${shuffled}]`;

      if (iteration >= target.length) clearInterval(interval);
      iteration += 1 / 4;
    }, 30);
  };

  return (
    <div ref={markerRef} className="state-marker">
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
  )
}

export default StateMarker