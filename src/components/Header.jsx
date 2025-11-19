import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">Animation JS</div>

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
      </button>

      <nav className={menuOpen ? 'open' : ''}>
        <a href="#hero" onClick={() => setMenuOpen(false)}>Overview</a>
        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
        <a
          href="https://animejs.com/documentation/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >Docs</a>
        <a
          href="https://github.com/AGE-00/animation"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >GitHub</a>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </nav>
    </header>
  );
}
