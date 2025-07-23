import { useRef } from 'react'
import { useParticleAnimation } from '../hooks/useParticleAnimation'

function Hero() {
  const canvasRef = useRef(null)
  
  useParticleAnimation(canvasRef)

  return (
    <section className="hero">
      <div className="hero-background">
        <canvas ref={canvasRef} id="particle-canvas"></canvas>
      </div>
      <div className="hero-content">
        <h1>All-in-one<br />animation<br />engine.</h1>
        <p>A fast and versatile JavaScript library to animate the web.</p>
        <div className="cta-button">Learn more</div>
      </div>
    </section>
  )
}

export default Hero