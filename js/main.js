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
  // 7. PARTICULES + CONNEXIONS + INTERACTION SOURIS (canvas hero)
  // ----------------------------------------------------------
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    canvas.parentElement.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -9999; mouse.y = -9999;
    });

    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles(n = 90) {
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          r:  Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.25,
          dy: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.45 + 0.1
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = body.classList.contains('light-mode');
      const accent  = isLight ? '79,70,229' : '99,102,241';
      const MAX_DIST = 130;

      particles.forEach((p, i) => {
        // Légère attraction vers la souris
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 200 && md > 0) {
          p.x += (mdx / md) * 0.18;
          p.y += (mdy / md) * 0.18;
        }

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${p.opacity})`;
        ctx.fill();

        // Lignes entre particules proches
        for (let j = i + 1; j < particles.length; j++) {
          const q   = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d   = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${accent}, ${(1 - d / MAX_DIST) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(drawParticles);
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
  // 8. HIGHLIGHT lien actif dans la navbar
  // ----------------------------------------------------------
  const navAnchors = document.querySelectorAll('.navbar-links a');
  navAnchors.forEach(a => {
    if (a.href === window.location.href) {
      a.style.color = 'var(--text-primary)';
    }
  });


  // ----------------------------------------------------------
  // 9. CURSEUR CUSTOM (desktop uniquement)
  // ----------------------------------------------------------
  if (window.matchMedia('(hover: hover)').matches) {
    const cursorOuter = document.createElement('div');
    const cursorDot   = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    cursorDot.className   = 'cursor-dot';
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorDot);

    let mx = 0, my = 0, ox = 0, oy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
    });

    (function animCursor() {
      ox += (mx - ox) * 0.11;
      oy += (my - oy) * 0.11;
      cursorOuter.style.left = ox + 'px';
      cursorOuter.style.top  = oy + 'px';
      requestAnimationFrame(animCursor);
    })();

    document.querySelectorAll('a, button, .card, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursorOuter.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorOuter.classList.remove('hover'));
    });
    document.addEventListener('mousedown', () => cursorOuter.classList.add('click'));
    document.addEventListener('mouseup',   () => cursorOuter.classList.remove('click'));
  }


  // ----------------------------------------------------------
  // 10. TRANSITIONS DE PAGE (fade in/out)
  // ----------------------------------------------------------
  // Fade in à l'arrivée
  requestAnimationFrame(() => document.body.classList.add('page-ready'));

  // Fade out avant navigation (liens internes non-ancres)
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('tel') || href.startsWith('http')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.remove('page-ready');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

});
