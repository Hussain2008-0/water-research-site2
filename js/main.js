/**
 * Water Purification Research — Interactive JS
 * Science Exhibition Website
 */

// ===== NAVBAR: Sticky scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate burger
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle?.querySelectorAll('span');
    spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== BACKGROUND PARTICLES =====
function createParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * 15}s;
    `;
    container.appendChild(p);
  }
}

// ===== HERO BUBBLES =====
function createBubbles() {
  const container = document.getElementById('heroBubbles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 8 : 18;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 40 + 8;
    b.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(b);
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement?.querySelectorAll('[data-reveal]');
        let delay = 0;
        if (siblings) {
          siblings.forEach((sib, i) => {
            if (sib === entry.target) delay = i * 80;
          });
        }
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===== BAR CHART ANIMATION =====
function initBarCharts() {
  const bars = document.querySelectorAll('.bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  const isDecimal = target % 1 !== 0;
  let start = 0;
  const step = target / (duration / 16);

  const update = () => {
    start += step;
    if (start >= target) {
      el.textContent = isDecimal ? target.toFixed(1) : target;
      return;
    }
    el.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.dataset.count);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ===== SMOOTH ACTIVE NAV LINK =====
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        activeLink?.classList.add('active');
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(s => observer.observe(s));
}

// ===== VISITOR CARD REVEAL =====
function initVisitorCards() {
  const cards = document.querySelectorAll('.visitor-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ===== ACTIVE NAV HIGHLIGHT CSS =====
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-link.active { color: var(--water-glow) !important; background: rgba(56,200,245,0.12); }`;
document.head.appendChild(navStyle);

// ===== SMOOTH SCROLL for older browsers =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== PARALLAX HERO subtle effect =====
function initParallax() {
  const hero = document.querySelector('.hero-content');
  if (!hero || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.18}px)`;
      hero.style.opacity = `${1 - scrolled / (window.innerHeight * 0.85)}`;
    }
  }, { passive: true });
}

// ===== MATERIAL CARDS — tilt on hover =====
function initTiltEffect() {
  document.querySelectorAll('.material-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx * 8;
      const dy = (y - cy) / cy * 8;
      card.style.transform = `perspective(600px) rotateX(${-dy}deg) rotateY(${dx}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  createBubbles();
  initScrollReveal();
  initBarCharts();
  initCounters();
  initActiveNav();
  initVisitorCards();
  initParallax();

  // Tilt effect — desktop only
  if (window.innerWidth > 768) {
    initTiltEffect();
  }

  // Add a small ripple on click anywhere
  document.addEventListener('click', e => {
    if (e.target.closest('a, button, .visitor-card, .material-card')) return;
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid rgba(56,200,245,0.5);
      pointer-events: none;
      z-index: 9999;
      animation: ripple-expand 0.6s ease forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Ripple keyframe
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-expand {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(6); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);
});

// ===== PERFORMANCE: prefers-reduced-motion =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.wave, .bubble, .particle').forEach(el => {
    el.style.animation = 'none';
  });
}
