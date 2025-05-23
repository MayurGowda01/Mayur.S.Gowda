const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particlesArray = [];
const numParticles = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#fec096";
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

function connect() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(31,192,192,0.2)";
        ctx.lineWidth = 1;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

const typeText = "Hey, Welcome to my world of Graphs and Vision.";
let index = 0;
const typingTarget = document.getElementById("typewriter-text");

function typeWriter() {
  if (index < typeText.length) {
    typingTarget.innerHTML += typeText.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
window.addEventListener("DOMContentLoaded", typeWriter);

function toggleAbstract(element) {
  const abstract = element.nextElementSibling;
  const icon = element.querySelector('.toggle-icon');

  if (abstract.style.display === "block") {
    abstract.style.display = "none";
    icon.textContent = "(+)";
  } else {
    abstract.style.display = "block";
    icon.textContent = "(–)";
  }
}




init();
animate();
