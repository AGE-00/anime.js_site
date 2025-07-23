const featuresData = [
  {
    title: "Intuitive API",
    description: "Animate faster with an easy-to-use, yet powerful animation API."
  },
  {
    title: "Enhanced transforms", 
    description: "Smoothly blend individual CSS transform properties."
  },
  {
    title: "SVG toolset",
    description: "Morph shapes, follow motion paths, and draw lines easily."
  },
  {
    title: "Scroll Observer",
    description: "Synchronise and trigger animations on scroll."
  },
  {
    title: "Advanced staggering",
    description: "Create stunning effects in seconds with the built-in Stagger utility."
  },
  {
    title: "Springs and draggable",
    description: "Drag, snap, flick and throw HTML elements."
  }
]

function FeatureItem({ title, description }) {
  return (
    <div className="feature-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="features">
      <h2>The complete animator&apos;s toolbox</h2>
      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <FeatureItem 
            key={index} 
            title={feature.title} 
            description={feature.description} 
          />
        ))}
      </div>
    </section>
  )
}

export default Features