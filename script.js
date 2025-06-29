// Hearts background
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.8 + 0.2;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size, this.y + this.size / 2,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 2,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.reset();
    }
    this.draw();
  }
}

const hearts = [];

function createHearts(count) {
  for (let i = 0; i < count; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}

// Modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll(".photo img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Scroll fade effect
const fadeElems = document.querySelectorAll('.love-letter, .gallery, .dream-moment, .final-reveal');
window.addEventListener('scroll', () => {
  fadeElems.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// Autoplay music and start heart animation
window.addEventListener("load", () => {
  resizeCanvas();
  createHearts(40);
  animate();

  const music = document.getElementById("bg-music");
  setTimeout(() => {
    music.muted = false;
    music.play().catch(() => {
      console.log("Autoplay blocked.");
    });
  }, 2000);

  // Scroll to love letter
  document.getElementById("letter").scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('resize', resizeCanvas);
// Hide welcome screen after animation
window.addEventListener('load', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
  }, 4000); // 3s animation + 1s buffer
});
// Enable autoplay after user interaction (browsers block it otherwise)
window.addEventListener('click', () => {
  const audio = document.getElementById('loveAudio');
  if (audio && audio.paused) {
    audio.play().catch(e => {
      console.log("Autoplay blocked. Will retry on next click.");
    });
  }
});

