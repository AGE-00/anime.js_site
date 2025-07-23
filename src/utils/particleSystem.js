// Particle class for managing individual particles
class Particle {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.width
    this.y = Math.random() * this.height
    this.vx = (Math.random() - 0.5) * 1 // particleSpeed = 1
    this.vy = (Math.random() - 0.5) * 1
    this.life = 0
    this.maxLife = 50 + Math.random() * 100 // Random between 50-150
    this.color = '#fff'
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.life++

    if (this.x > this.width || this.x < 0 || this.y > this.height || this.y < 0 || this.life > this.maxLife) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  updateDimensions(width, height) {
    this.width = width
    this.height = height
  }
}

// Main particle system factory
export function createParticleSystem(canvas) {
  const ctx = canvas.getContext('2d')
  let width, height
  let particles = []
  let animationId = null
  
  const particleCount = 30

  function init() {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height))
    }
  }

  function animate() {
    // Clear the canvas completely
    ctx.clearRect(0, 0, width, height)

    particles.forEach(particle => {
      particle.update()
      particle.draw(ctx)
    })

    animationId = requestAnimationFrame(animate)
  }

  function resize() {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    
    // Update all existing particles with new dimensions
    particles.forEach(particle => {
      particle.updateDimensions(width, height)
    })
  }

  function start() {
    init()
    animate()
  }

  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  return {
    start,
    stop,
    resize
  }
}