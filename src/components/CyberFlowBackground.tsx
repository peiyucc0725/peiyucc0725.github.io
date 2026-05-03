import React, { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const EnergyBeamBackground: React.FC = () => {
  const energyBeamRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const parallaxGroupRef = useRef<SVGGElement>(null);

  const pathsData = useMemo(() => {
    const baseW = 1920;
    const baseH = 1080;
    return [...Array(15)].map((_, i) => {
      const startX = 100 + Math.random() * (baseW - 200);
      const startY = 100 + Math.random() * (baseH - 200);
      const len1 = 150 + Math.random() * 300;
      const len2 = 150 + Math.random() * 300;
      const corner = 30;
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.5 ? 1 : -1;
      const horizontalFirst = Math.random() > 0.5;

      let d = horizontalFirst
        ? `M ${startX},${startY} L ${startX + (len1 - corner) * dirX},${startY} L ${startX + len1 * dirX},${startY + corner * dirY} L ${startX + len1 * dirX},${startY + (len1 + len2) * dirY}`
        : `M ${startX},${startY} L ${startX},${startY + (len1 - corner) * dirY} L ${startX + corner * dirX},${startY + len1 * dirY} L ${startX + (len1 + len2) * dirX},${startY + len1 * dirY}`;

      return { id: `beam-${i}`, d, duration: 5 + Math.random() * 5, delay: Math.random() * 5, beamLength: 50 + Math.random() * 150 };
    });
  }, []);

  useGSAP(() => {
    const paths = gsap.utils.toArray<SVGPathElement>('.energy-path');

    paths.forEach((p, i) => {
      const totalLength = p.getTotalLength();
      const { beamLength, duration, delay } = pathsData[i];

      gsap.set(p, {
        strokeDasharray: `${beamLength} ${totalLength}`,
        strokeDashoffset: beamLength,
        opacity: 0,
      });

      const tl = gsap.timeline({
        repeat: -1,
        delay,
        defaults: { 
          force3D: true 
        }
      });

      tl.to(p, { opacity: 0.4, duration: 0.5 })
        .to(p, {
          strokeDashoffset: -totalLength,
          duration: duration,
          ease: "power1.inOut",
        }, 0)
        .to(p, { opacity: 0, duration: 0.5 }, "-=0.5");
    });
  }, { scope: energyBeamRef });

  return (
    <div ref={energyBeamRef} className="fixed inset-0 w-full h-full bg-bg-secondary -z-10 overflow-hidden pointer-events-none">
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style={{ willChange: 'transform' }}>
        <g ref={parallaxGroupRef}>
          {pathsData.map((path) => (
            <path
              key={path.id}
              className="energy-path"
              d={path.d}
              fill="none"
              stroke="#A3A18E"
              strokeWidth="0.8"
              strokeLinecap="round"
              style={{
                mixBlendMode: 'multiply',
                willChange: 'transform'
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default EnergyBeamBackground;