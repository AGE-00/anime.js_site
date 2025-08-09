import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible((typeof globalThis !== 'undefined' ? globalThis.scrollY : 0) > 300);
    };
    if (typeof globalThis !== 'undefined' && globalThis.addEventListener) {
      globalThis.addEventListener('scroll', onScroll);
    }
    return () => {
      if (typeof globalThis !== 'undefined' && globalThis.removeEventListener) {
        globalThis.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (typeof globalThis !== 'undefined' && globalThis.scrollTo) {
      globalThis.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      title="Back to top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      &uarr;
    </button>
  );
}
