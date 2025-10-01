export default function Header() {
  return (
    <header className="header">
      <div className="logo">Animation JS</div>
      <nav>
        <a href="#hero">Overview</a>
        <a href="#features">Features</a>
        <a
          href="https://animejs.com/documentation/"
          target="_blank"
          rel="noopener noreferrer"
        >Docs</a>
        <a
          href="https://github.com/AGE-00/animation"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
      </nav>
    </header>
  );
}
