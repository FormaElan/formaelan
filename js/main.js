// ============================================================
//  FormaElan — main.js
//  Dark/Light mode · Animations · Navbar · Accordéons
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // 1. DARK / LIGHT MODE
  // ----------------------------------------------------------
  const themeToggleInput = document.getElementById('themeToggleInput');
  const body = document.body;
  const THEME_KEY = 'formaElan_theme';

  // Charger le thème sauvegardé
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeToggleInput) themeToggleInput.checked = true;
  }

  if (themeToggleInput) {
    themeToggleInput.addEventListener('change', () => {
      if (themeToggleInput.checked) {
        body.classList.add('light-mode');
        localStorage.setItem(THEME_KEY, 'light');
        updateThemeThumb('☀️');
      } else {
        body.classList.remove('light-mode');
        localStorage.setItem(THEME_KEY, 'dark');
        updateThemeThumb('🌙');
      }
    });
  }

  function updateThemeThumb(emoji) {
    const thumb = document.querySelector('.theme-toggle .thumb');
    if (thumb) thumb.textContent = emoji;
  }

  // Init emoji selon thème courant
  updateThemeThumb(body.classList.contains('light-mode') ? '☀️' : '🌙');


  // ----------------------------------------------------------
  // 2. NAVBAR — scroll + hamburger mobile
  // ----------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.background = body.classList.contains('light-mode')
          ? 'rgba(240,240,255,0.97)'
          : 'rgba(10,10,15,0.97)';
      } else {
        navbar.style.background = '';
      }
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animer les barres
      const bars = hamburger.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity  = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity  = '';
        bars[2].style.transform = '';
      }
    });
  }

  // Fermer le menu si on clique un lien
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const bars = hamburger && hamburger.querySelectorAll('span');
        if (bars) {
          bars[0].style.transform = '';
          bars[1].style.opacity  = '';
          bars[2].style.transform = '';
        }
      });
    });
  }


  // ----------------------------------------------------------
  // 3. ANIMATIONS AU SCROLL (Intersection Observer)
  // ----------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Délai en cascade
          const delay = entry.target.dataset.delay || i * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }


  // ----------------------------------------------------------
  // 4. ACCORDÉONS PROGRAMME
  // ----------------------------------------------------------
  const modules = document.querySelectorAll('.programme-module');

  modules.forEach(mod => {
    const header = mod.querySelector('.module-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = mod.classList.contains('open');
      // Fermer tous les autres
      modules.forEach(m => m.classList.remove('open'));
      // Toggle le cliqué
      if (!isOpen) mod.classList.add('open');
    });
  });

  // Ouvrir le premier module par défaut si la page détail
  if (modules.length > 0) {
    modules[0].classList.add('open');
  }


  // ----------------------------------------------------------
  // 5. COMPTEUR ANIMÉ (stats hero)
  // ----------------------------------------------------------
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target).toLocaleString('fr-FR');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(el => counterObserver.observe(el));
  }


  // ----------------------------------------------------------
  // 6. SCROLL SMOOTH vers #formations
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ----------------------------------------------------------
  // 7. PARTICULES légères (canvas — fond hero)
  // ----------------------------------------------------------
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles(n = 60) {
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = body.classList.contains('light-mode') ? '79,70,229' : '99,102,241';

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${p.opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }


  // ----------------------------------------------------------
  // 8. TOOLTIP sur les étoiles
  // ----------------------------------------------------------
  document.querySelectorAll('.card-stars').forEach(el => {
    el.setAttribute('title', `Note moyenne de ${el.dataset.note || '4.9'}/5`);
  });


  // ----------------------------------------------------------
  // 9. HIGHLIGHT lien actif dans la navbar
  // ----------------------------------------------------------
  const navAnchors = document.querySelectorAll('.navbar-links a');
  navAnchors.forEach(a => {
    if (a.href === window.location.href) {
      a.style.color = 'var(--text-primary)';
      a.style.setProperty('--after-scale', '1');
    }
  });

});
