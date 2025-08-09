const FEATURE_LIST = [
  { title: 'Intuitive API', desc: 'Animate faster with an easy-to-use, yet powerful animation API.' },
  { title: 'Enhanced transforms', desc: 'Smoothly blend individual CSS transform properties.' },
  { title: 'SVG toolset', desc: 'Morph shapes, follow motion paths, and draw lines easily.' },
  { title: 'Scroll Observer', desc: 'Synchronise and trigger animations on scroll.' },
  { title: 'Advanced staggering', desc: 'Create stunning effects in seconds with the built-in Stagger utility.' },
  { title: 'Springs and draggable', desc: 'Drag, snap, flick and throw HTML elements.' },
];

export default function Features() {
  return (
    <section id="features" className="features">
      <h2>The complete animator's toolbox</h2>
      <div className="features-grid">
        {FEATURE_LIST.map(f => (
          <div key={f.title} className="feature-item">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
