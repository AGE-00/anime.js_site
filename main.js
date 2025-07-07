import anime from 'animejs';

// Wrap every letter in a span
const textWrapper = document.querySelector('.title');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

const letters = document.querySelectorAll('.title .letter');

document.addEventListener('mousemove', (e) => {
  letters.forEach((letter) => {
    const rect = letter.getBoundingClientRect();
    const letterX = rect.left + rect.width / 2;
    const letterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - letterX, 2) + Math.pow(e.clientY - letterY, 2)
    );

    const maxDistance = 150; // マウスからの影響範囲
    const intensity = Math.max(0, 1 - distance / maxDistance);

    anime({
      targets: letter,
      color: intensity > 0.1 ? '#fff' : 'transparent',
      textShadow: intensity > 0.1 ? `0 0 ${intensity * 15}px #fff, 0 0 ${intensity * 30}px #0ff` : 'none',
      scale: 1 + intensity * 0.2,
      duration: 200,
      easing: 'easeOutQuad',
    });
  });
});

// Background animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let mouse = {
  x: width / 2,
  y: height / 2
};

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.5 + 0.5,
    color: `hsla(${200 + Math.random() * 60}, 100%, 70%, ${Math.random()})`,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    // Move particle
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Draw line to nearby particles
    for (const p2 of particles) {
      const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `hsla(220, 100%, 80%, ${1 - distance / 100})`;
        ctx.lineWidth = 0.2;
        ctx.stroke();
      }
    }
    
    // Draw line to mouse
    const mouseDistance = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
    if (mouseDistance < 200) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `hsla(0, 100%, 100%, ${0.5 - mouseDistance / 200})`;
      ctx.lineWidth = 0.3;
      ctx.stroke();
    }
  }
  requestAnimationFrame(animateParticles);
}

animateParticles();
