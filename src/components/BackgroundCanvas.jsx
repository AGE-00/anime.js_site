import { useEffect, useRef } from 'react';
import anime from 'animejs';

/*
  Advanced particle background using anime.js timelines + manual canvas rendering.
  Features:
  - Particles orbit with subtle parallax drift
  - Color cycling via HSL + anime.js
  - Burst ripple on interval
  - Responsive density
*/

const CONFIG = {
  baseCount: 120,
  maxSize: 3.2,
  hueStart: 200,
  hueRange: 120,
  orbitRadius: 60,
  burstEveryMs: 6000,
};

function createParticle(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const orbit = Math.random() * CONFIG.orbitRadius;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    baseX: Math.random() * w,
    baseY: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    r: Math.random() * CONFIG.maxSize + 0.4,
    angle,
    orbit,
    hueOffset: Math.random(),
    alpha: Math.random() * 0.6 + 0.2,
  };
}

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);
  const hueRef = useRef(CONFIG.hueStart);
  const lastBurstRef = useRef(performance.now());
  const rippleActiveRef = useRef(false); // 同時多発防止

  // Resize & density calc
  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = typeof globalThis !== 'undefined' ? globalThis : {};
    const dpr = g.devicePixelRatio || 1;
    const iw = g.innerWidth || 1024;
    const ih = g.innerHeight || 768;
    canvas.width = iw * dpr;
    canvas.height = ih * dpr;
    canvas.style.width = iw + 'px';
    canvas.style.height = ih + 'px';
    const area = iw * ih;
    const target = Math.min(400, Math.round(area / 14000));
    const arr = particlesRef.current;
    while (arr.length < target) arr.push(createParticle(canvas.width, canvas.height));
    if (arr.length > target) arr.length = target;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    resize();

    // Hue animation (オブジェクトプロパティで明示的に管理)
    const hueObj = { h: CONFIG.hueStart };
    const hueAnim = anime({
      targets: hueObj,
      h: CONFIG.hueStart + CONFIG.hueRange,
      duration: 18000,
      easing: 'linear',
      loop: true,
      update: () => { hueRef.current = hueObj.h; }
    });

    const render = () => {
  const g = typeof globalThis !== 'undefined' ? globalThis : {};
  const dpr = g.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now();
      const hue = hueRef.current;
      for (const p of particlesRef.current) {
        p.angle += 0.002 + p.r * 0.0004;
        p.x += p.vx;
        p.y += p.vy;
        // orbit wobble
        const ox = Math.cos(p.angle) * p.orbit * 0.6;
        const oy = Math.sin(p.angle * 1.1) * p.orbit * 0.4;
        // wrap
        if (p.x < 0) p.x += canvas.width; else if (p.x > canvas.width) p.x -= canvas.width;
        if (p.y < 0) p.y += canvas.height; else if (p.y > canvas.height) p.y -= canvas.height;
        const localHue = (hue + p.hueOffset * 180) % 360;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${localHue},70%,${55 - p.r * 5}%,${p.alpha})`;
        ctx.arc(p.x + ox, p.y + oy, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Burst ripple
      if (t - lastBurstRef.current > CONFIG.burstEveryMs && !rippleActiveRef.current) {
        lastBurstRef.current = t;
        rippleActiveRef.current = true;
        const cx = canvas.width * (0.2 + Math.random() * 0.6); // 端を避ける
        const cy = canvas.height * (0.2 + Math.random() * 0.6);
        const ripple = { r: 0, max: Math.min(canvas.width, canvas.height) * (0.25 + Math.random() * 0.25) };
        anime({
          targets: ripple,
          r: ripple.max,
          duration: 1800,
          easing: 'easeOutCubic',
          update: () => {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${hue},80%,60%,${1 - ripple.r / ripple.max})`;
            ctx.lineWidth = 2 * dpr;
            ctx.arc(cx, cy, ripple.r, 0, Math.PI * 2);
            ctx.stroke();
          },
          complete: () => { rippleActiveRef.current = false; }
        });
      }

      frameRef.current = requestAnimationFrame(render);
    };
    render();

    if (typeof globalThis !== 'undefined' && globalThis.addEventListener) {
      globalThis.addEventListener('resize', resize);
    }
    return () => {
      hueAnim.pause();
      cancelAnimationFrame(frameRef.current);
      if (typeof globalThis !== 'undefined' && globalThis.removeEventListener) {
        globalThis.removeEventListener('resize', resize);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-particles" />;
}
