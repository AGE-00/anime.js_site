import { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import './AnimatedTitle.css';

// Props: text, audioReactive (boolean - default prop, now controlled by user toggle)
export default function AnimatedTitle({ text = '', audioReactive = true }) {
  const ref = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const letters = el.querySelectorAll('.at-letter');

    // Intro timeline for entrance animation
    const tl = createTimeline({ easing: 'easeOutExpo' });
    tl
      .add({
        targets: letters,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(45),
        duration: 850,
      })
      .add(
        {
          targets: letters,
          rotateZ: [0, 360],
          scale: [1, 0.92, 1],
          delay: stagger(15),
          duration: 1400,
        },
        '-=300',
      );

    // Subtle perpetual pulse
    animate({
      targets: letters,
      scale: [1, 1.05],
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
      delay: stagger(120, { start: 2000 }),
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

    // Only start audio if globally reactive AND user enabled it
    if (audioReactive && audioEnabled && typeof navigator !== 'undefined') {
      const startAudio = async () => {
        try {
          if (!navigator.mediaDevices?.getUserMedia) return;
          const g = typeof globalThis !== 'undefined' ? globalThis : {};
          const Ctx = g.AudioContext || g.webkitAudioContext;
          if (!Ctx) return;

          const audioCtx = new Ctx();
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

          // If we got here, permission was granted
          setPermissionGranted(true);

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
            setPermissionGranted(false);
          };
        } catch {
          // ignore microphone errors silently (user may deny access)
          setAudioEnabled(false); // Reset toggle if denied
          cleanupAudio = clearPendingStart;
        }
      };

      audioStartTimeout = setTimeout(startAudio, 100);
    }

    return () => {
      tl.pause();
      cleanupAudio();
    };
  }, [text, audioReactive, audioEnabled]);

  const chars = text.split('');
  return (
    <div className="animated-title-container">
      <h1 ref={ref} className="animated-title">
        {chars.map((c, i) => (
          <span key={i} className="at-letter" aria-hidden="true">{c === ' ' ? '\u00A0' : c}</span>
        ))}
        <span className="sr-only">{text}</span>
      </h1>
      {audioReactive && (
        <button
          className={`audio-toggle ${audioEnabled ? 'active' : ''}`}
          onClick={() => setAudioEnabled(!audioEnabled)}
          aria-label={audioEnabled ? "Disable audio reactivity" : "Enable audio reactivity"}
          title={audioEnabled ? "Disable audio reactivity" : "Enable audio reactivity"}
        >
          {audioEnabled ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4.27 3L3 4.27l4.56 4.56C7.12 9.38 7 9.91 7 10.5V17c0 2.21 1.79 4 4 4 1.68 0 3.13-1.03 3.71-2.46l3.56 3.56L19.73 21 4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
          )}
        </button>
      )}
    </div>
  );
}
