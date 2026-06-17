// ============================================================
//  FormaElan — Quiz de certification
//  Dépend de formations.js (FORMATIONS, FORMATION_BY_SLUG)
// ============================================================

(function () {
  'use strict';

  const BACKEND = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:4242'
    : 'https://formaelan.onrender.com';

  const PASS_SCORE = 0.70;

  const params   = new URLSearchParams(location.search);
  const slug     = params.get('slug');
  const sessionId = params.get('session_id');
  const accessToken = params.get('token');
  const app      = document.getElementById('quizApp');

  // ── Helpers ────────────────────────────────────────────────
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls)  e.className   = cls;
    if (html) e.innerHTML   = html;
    return e;
  }

  function generateCertId() {
    const d   = new Date();
    const ym  = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0');
    const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `FE-${ym}-${rnd}`;
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function accessQuery() {
    return new URLSearchParams({
      slug,
      session_id: sessionId,
      token: accessToken,
    }).toString();
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    if (!slug || !FORMATION_BY_SLUG[slug]) {
      app.innerHTML = `
        <div class="qz-error">
          <div class="qz-error-icon">❌</div>
          <h2>Formation introuvable</h2>
          <p>Aucune formation correspondant à « ${slug || '(vide)'} ».</p>
          <a href="index.html" class="qz-btn">← Retour à l'accueil</a>
        </div>`;
      return;
    }

    if (!sessionId || !accessToken) {
      app.innerHTML = `
        <div class="qz-error">
          <div class="qz-error-icon">🔒</div>
          <h2>Quiz reserve aux acheteurs</h2>
          <p>Ouvre le quiz depuis ton chapitre de formation protege afin de conserver ton acces.</p>
          <a href="index.html" class="qz-btn">← Retour a l'accueil</a>
        </div>`;
      return;
    }

    const f = FORMATION_BY_SLUG[slug];

    if (!f.quiz || f.quiz.length === 0) {
      app.innerHTML = `
        <div class="qz-error">
          <div class="qz-error-icon">🚧</div>
          <h2>Quiz bientôt disponible</h2>
          <p>Le quiz pour « ${f.titre} » sera disponible prochainement.</p>
          <a href="pages/${slug}.html" class="qz-btn">← Retour à la formation</a>
        </div>`;
      return;
    }

    renderQuiz(f);
  }

  // ── Render quiz form ────────────────────────────────────────
  function renderQuiz(f) {
    const total = f.quiz.length;

    const wrap = el('div', 'qz-wrap');

    wrap.appendChild(el('a', 'qz-back', `← ${f.titre}`)).href = `pages/${slug}.html`;

    const header = el('div', 'qz-header');
    header.innerHTML = `
      <div class="qz-badge">🏆 Quiz de certification</div>
      <h1 class="qz-title">${f.titre}</h1>
      <p class="qz-intro">
        ${total} questions · Score minimum requis : ${Math.round(PASS_SCORE * 100)}%
        · Une seule tentative conseillée — relis la formation si tu as un doute.
      </p>`;
    wrap.appendChild(header);

    const form = el('form', 'qz-form');
    form.id = 'quizForm';

    f.quiz.forEach((q, qi) => {
      const block = el('div', 'qz-q');
      block.dataset.correct = q.a;

      block.innerHTML = `<div class="qz-q-num">Question ${qi + 1} / ${total}</div>
        <div class="qz-q-text">${q.q}</div>
        <div class="qz-choices" id="choices-${qi}"></div>`;

      const choicesEl = block.querySelector(`#choices-${qi}`);
      q.r.forEach((choice, ci) => {
        const label = document.createElement('label');
        label.className = 'qz-choice';
        label.innerHTML = `
          <input type="radio" name="q${qi}" value="${ci}" required />
          <span>${choice}</span>`;
        choicesEl.appendChild(label);
      });

      form.appendChild(block);
    });

    const submitRow = el('div', 'qz-submit-row');
    submitRow.innerHTML = `
      <button type="submit" class="qz-btn qz-btn-primary">
        Valider mes réponses →
      </button>`;
    form.appendChild(submitRow);
    form.addEventListener('submit', (e) => handleSubmit(e, f));

    wrap.appendChild(form);
    app.innerHTML = '';
    app.appendChild(wrap);
  }

  // ── Handle submit ───────────────────────────────────────────
  function handleSubmit(e, f) {
    e.preventDefault();

    const questions = document.querySelectorAll('.qz-q');
    let correct = 0;
    const total = questions.length;

    questions.forEach((block, qi) => {
      const chosen   = parseInt(document.querySelector(`input[name="q${qi}"]:checked`)?.value ?? -1);
      const expected = parseInt(block.dataset.correct);
      const choices  = block.querySelectorAll('.qz-choice');

      choices.forEach((c, ci) => {
        c.classList.remove('qz-right', 'qz-wrong');
        if (ci === expected) c.classList.add('qz-right');
        else if (ci === chosen && ci !== expected) c.classList.add('qz-wrong');
        c.querySelector('input').disabled = true;
      });

      if (chosen === expected) correct++;
    });

    document.querySelector('.qz-submit-row').remove();

    const pct     = Math.round((correct / total) * 100);
    const passed  = pct >= Math.round(PASS_SCORE * 100);

    const resultEl = el('div', passed ? 'qz-result qz-pass' : 'qz-result qz-fail');

    if (passed) {
      resultEl.innerHTML = `
        <div class="qz-result-icon">🏆</div>
        <h2>Félicitations — ${pct}% de bonnes réponses</h2>
        <p>Tu as validé le quiz avec ${correct}/${total} bonnes réponses.<br/>
           Remplis le formulaire ci-dessous pour recevoir ton certificat par email.</p>
        <form class="qz-cert-form" id="certForm">
          <div class="qz-field">
            <label for="certNom">Prénom et nom (tel qu'ils apparaîtront sur le certificat)</label>
            <input type="text" id="certNom" name="nom" required
              placeholder="ex. Jean Dupont" autocomplete="name" />
          </div>
          <div class="qz-field">
            <label for="certEmail">Adresse email</label>
            <input type="email" id="certEmail" name="email" required
              placeholder="ex. jean@exemple.fr" autocomplete="email" />
          </div>
          <button type="submit" class="qz-btn qz-btn-primary" id="certSubmitBtn">
            Recevoir mon certificat →
          </button>
          <p class="qz-privacy">Ton email sert uniquement à t'envoyer le certificat. Aucun abonnement.</p>
        </form>`;

      document.getElementById('quizForm').parentElement.appendChild(resultEl);
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      document.getElementById('certForm').addEventListener('submit', (ev) =>
        handleCertSubmit(ev, f, pct));

    } else {
      resultEl.innerHTML = `
        <div class="qz-result-icon">📚</div>
        <h2>${pct}% de bonnes réponses</h2>
        <p>Il te faut ${Math.round(PASS_SCORE * 100)}% pour obtenir le certificat (tu as ${correct}/${total}).<br/>
           Relis les sections en rouge ci-dessus, puis retente le quiz.</p>
        <a href="quiz.html?${accessQuery()}" class="qz-btn qz-btn-secondary">
          Retenter le quiz
        </a>
        <a href="pages/${slug}.html" class="qz-btn">
          Revenir à la formation
        </a>`;

      document.getElementById('quizForm').parentElement.appendChild(resultEl);
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ── Handle cert form submit ─────────────────────────────────
  async function handleCertSubmit(e, f, score) {
    e.preventDefault();

    const nom   = document.getElementById('certNom').value.trim();
    const email = document.getElementById('certEmail').value.trim();
    const btn   = document.getElementById('certSubmitBtn');
    const date  = todayISO();
    const certId = generateCertId();

    btn.disabled    = true;
    btn.textContent = 'Envoi en cours…';

    try {
      const res = await fetch(`${BACKEND}/send-certificate`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          email,
          nom,
          slug,
          score,
          date,
          certId,
          session_id: sessionId,
          token: accessToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erreur ${res.status}`);
      }

      const certUrl = `certificat.html?slug=${encodeURIComponent(slug)}&nom=${encodeURIComponent(nom)}&score=${score}&date=${encodeURIComponent(date)}&id=${encodeURIComponent(certId)}`;
      window.location.href = certUrl;

    } catch (err) {
      btn.disabled    = false;
      btn.textContent = 'Recevoir mon certificat →';
      const errEl = document.createElement('p');
      errEl.className   = 'qz-send-error';
      errEl.textContent = `Erreur : ${err.message}. Réessaie ou écris à contact@formaelan.fr.`;
      btn.insertAdjacentElement('afterend', errEl);
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})();
