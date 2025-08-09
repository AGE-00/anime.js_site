import { useEffect, useRef } from 'react';
import anime from 'animejs';
import './AnimatedTitle.css';

// Props: text, audioReactive (boolean)
export default function AnimatedTitle({ text = '', audioReactive = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = el.querySelectorAll('.at-letter');

    // intro timeline
  const tl = anime.timeline({ easing: 'easeOutExpo' });
    tl.add({
      targets: letters,
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(45),
      duration: 850
    })
    .add({
      targets: letters,
      rotateZ: [0, 360],
      scale: [1, 0.92, 1],
      delay: anime.stagger(15),
      duration: 1400
    }, '-=300');

    // subtle pulse loop
    anime({
      targets: letters,
      scale: [1, 1.05],
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      delay: anime.stagger(120, { start: 2000 }),
      duration: 2600
    });

    let cleanupAudio = () => {};
    if (audioReactive && typeof navigator !== 'undefined') {
      // init audio after slight delay to avoid blocking initial paint
      const startAudio = async () => {
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
          const g = typeof globalThis !== 'undefined' ? globalThis : {};
          const Ctx = g.AudioContext || g.webkitAudioContext;
          const audioCtx = new Ctx();
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 1024;
          source.connect(analyser);
          const data = new Uint8Array(analyser.frequencyBinCount);
          let rafId;
          const loop = () => {
            analyser.getByteFrequencyData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) sum += data[i];
            const avg = sum / data.length; // 0 - ~255
            const norm = Math.min(1, avg / 170); // normalize
            const t = performance.now();
            letters.forEach((el, idx) => {
              // dynamic amplitude with slight per-letter oscillation
              const amp = 0.9 + norm * 0.8 + Math.sin((t / 350) + idx * 0.35) * 0.06;
              el.style.setProperty('--glowAmp', amp.toFixed(3));
            });
            rafId = requestAnimationFrame(loop);
          };
          loop();
          cleanupAudio = () => {
            cancelAnimationFrame(rafId);
            stream.getTracks().forEach(tr => tr.stop());
            audioCtx.close();
          };
        } catch {
          // ignore microphone errors silently
        }
      };
      setTimeout(startAudio, 800);
    }

    return () => { tl.pause(); cleanupAudio(); };
  }, [text, audioReactive]);

  const chars = text.split('');
  return (
  <h1 ref={ref} className="animated-title">
      {chars.map((c, i) => (
        <span key={i} className="at-letter" aria-hidden="true">{c === ' ' ? '\u00A0' : c}</span>
      ))}
      <span className="sr-only">{text}</span>
  </h1>
  );
}
