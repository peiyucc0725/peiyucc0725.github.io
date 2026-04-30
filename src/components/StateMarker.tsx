import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './StateMarker.module.scss'; // 假設使用 CSS Modules

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
  const intervalRef = useRef<number | null>(null);

  useGSAP(() => {
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    });
  }, { scope: markerRef });

  useGSAP(() => {
    if (isParentAnimDone) {
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
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    let iteration = 0;

    intervalRef.current = window.setInterval(() => {
      if (!statusTextRef.current) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
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

      if (iteration >= target.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      iteration += 1 / 4;
    }, 30);
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div ref={markerRef} className={styles.stateMarker}>
      <div className={styles.markerContent}>
        <svg ref={spinnerRef} className={styles.markerSpinner} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />
          <path d="M12 2 A10 10 0 0 1 22 12" stroke="#c2a685" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div className={styles.markerStatus}>
          <span className={styles.statusLabel}>SYSTEM_STATUS</span>
          <span className={styles.statusText} ref={statusTextRef}>[***************]</span>
        </div>
      </div>
    </div>
  )
}

export default StateMarker