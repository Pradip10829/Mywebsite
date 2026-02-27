// Loading screen fade-out after page is ready.
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hide"), 700);
});

// Mobile navigation toggle.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Typing effect for hero subtitle.
const typedText = document.getElementById("typedText");
const typingItems = [
  "Social Media Strategist",
  "Managing Director",
  "Computer Science Graduate"
];

let typeIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedText) return;

  const current = typingItems[typeIndex];
  const speed = deleting ? 45 : 85;

  if (!deleting) {
    typedText.textContent = current.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      typeIndex = (typeIndex + 1) % typingItems.length;
    }
  }

  setTimeout(typeLoop, speed);
}

typeLoop();

// Smooth reveal on scroll.
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.18 }
);
revealItems.forEach((item) => revealObserver.observe(item));

// Animate progress bars when skill section appears.
const skillSection = document.getElementById("skills");
if (skillSection) {
  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".progress span").forEach((bar) => {
            bar.style.width = bar.getAttribute("data-width") || "0%";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  progressObserver.observe(skillSection);
}

// Ripple effect for interactive buttons.
document.querySelectorAll(".ripple").forEach((button) => {
  button.addEventListener("click", (event) => {
    const circle = document.createElement("span");
    const size = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    circle.className = "ripple-effect";
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${event.clientX - rect.left - size / 2}px`;
    circle.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.querySelector(".ripple-effect")?.remove();
    button.appendChild(circle);
  });
});

// Cursor glow follows mouse movement on desktop.
const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

// Lightweight particle animation for subtle premium motion.
const canvas = document.getElementById("particles");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  let particles = [];
  const particleCount = 42;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    const speed = Math.random() * 0.45 + 0.1;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  function initParticles() {
    particles = Array.from({ length: particleCount }, createParticle);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
      grad.addColorStop(0, `rgba(60, 242, 255, ${p.alpha})`);
      grad.addColorStop(1, "rgba(255, 79, 199, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}

// Handle missing images gracefully with generated placeholders.
document.querySelectorAll("img.glow-image").forEach((img) => {
  img.addEventListener("error", () => {
    const svg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='#10213d'/>
            <stop offset='100%' stop-color='#391138'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#g)'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          fill='#c9d6ff' font-size='52' font-family='Sora, sans-serif'>Image: ${img.getAttribute("src")}</text>
      </svg>`
    );

    img.src = `data:image/svg+xml;charset=UTF-8,${svg}`;
  });
});
