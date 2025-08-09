export default function Hero({ children }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-background" />
      <div className="hero-content">{children}</div>
    </section>
  );
}
