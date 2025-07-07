/* global anime */

// --- Particle Trail Animation ---

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

const particleCount = 30; // 点の量を減らす
const particleSpeed = 1; // 動きを少し遅くする

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * particleSpeed;
    this.vy = (Math.random() - 0.5) * particleSpeed;
    this.life = 0;
    this.maxLife = anime.random(50, 150);
    this.color = '#fff';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0 || this.life > this.maxLife) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function animate() {
  // Clear the canvas completely in each frame
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

// Initialize and start animation
init();
animate();

window.addEventListener('resize', init);


// --- Back to Top Button ---

const backToTopButton = document.querySelector('.back-to-top');

function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);
