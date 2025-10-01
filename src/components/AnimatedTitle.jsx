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

    // Intro timeline for entrance animation
    const tl = anime.timeline({ easing: 'easeOutExpo' });
    tl
      .add({
        targets: letters,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(45),
        duration: 850,
      })
      .add(
        {
          targets: letters,
          rotateZ: [0, 360],
          scale: [1, 0.92, 1],
          delay: anime.stagger(15),
          duration: 1400,
        },
        '-=300',
      );

    // Subtle perpetual pulse
    anime({
      targets: letters,
      scale: [1, 1.05],
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      delay: anime.stagger(120, { start: 2000 }),
      duration: 2600,
    });

    let audioStartTimeout = 0;
    const clearPendingStart = () => {
      if (audioStartTimeout) {
        clearTimeout(audioStartTimeout);
        audioStartTimeout = 0;
      }
    };

    let cleanupAudio = clearPendingStart;

    if (audioReactive && typeof navigator !== 'undefined') {
      const startAudio = async () => {
        try {
          if (!navigator.mediaDevices?.getUserMedia) return;
          const g = typeof globalThis !== 'undefined' ? globalThis : {};
          const Ctx = g.AudioContext || g.webkitAudioContext;
          if (!Ctx) return;

          const audioCtx = new Ctx();
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 1024;
          source.connect(analyser);

          const data = new Uint8Array(analyser.frequencyBinCount);
          let rafId = 0;

          const loop = () => {
            analyser.getByteFrequencyData(data);
            const sum = data.reduce((acc, value) => acc + value, 0);
            const avg = sum / data.length; // 0 - ~255
            const norm = Math.min(1, avg / 170);
            const now = performance.now();

            letters.forEach((letter, idx) => {
              const amp = 0.9 + norm * 0.8 + Math.sin(now / 350 + idx * 0.35) * 0.06;
              letter.style.setProperty('--glowAmp', amp.toFixed(3));
            });

            rafId = requestAnimationFrame(loop);
          };

          loop();

          cleanupAudio = () => {
            clearPendingStart();
            cancelAnimationFrame(rafId);
            stream.getTracks().forEach(track => track.stop());
            audioCtx.close();
          };
        } catch {
          // ignore microphone errors silently (user may deny access)
          cleanupAudio = clearPendingStart;
        }
      };

      audioStartTimeout = setTimeout(startAudio, 800);
    }

    return () => {
      tl.pause();
      cleanupAudio();
    };
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
