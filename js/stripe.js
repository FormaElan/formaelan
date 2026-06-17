// ============================================================
//  FormaElan — stripe.js  (frontend)
//  Checkout Stripe via session créée côté backend
// ============================================================

const FormaElanStripe = (() => {

  const _IS_LOCAL = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  const CONFIG = {
    backendUrl: _IS_LOCAL ? 'http://localhost:4242' : 'https://formaelan.onrender.com',
    siteUrl:    window.location.origin,
    mode: 'live'
  };

  // Warm-up ping — réveille le serveur Render dès le chargement de la page
  // Garde la promesse pour savoir si le serveur est prêt au moment du checkout
  let _warmupDone = false;
  const _warmup = fetch(`${CONFIG.backendUrl}/health`)
    .then(() => { _warmupDone = true; })
    .catch(() => { _warmupDone = true; });

  // ── Waiver rétractation ────────────────────────────────
  function _injectWaiver() {
    const card = document.getElementById('acheter');
    const btn  = document.getElementById('btnAcheter');
    if (!card || !btn || document.getElementById('waiverCheckbox')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'waiverWrapper';
    wrapper.style.cssText = [
      'margin:0.75rem 0',
      'padding:0.75rem 0.9rem',
      'background:rgba(242,108,58,0.05)',
      'border:1px solid rgba(242,108,58,0.22)',
      'border-radius:8px',
      'font-size:0.78rem',
      'line-height:1.55',
      'transition:outline 0.25s',
    ].join(';');
    wrapper.innerHTML = `
      <label style="display:flex;gap:0.6rem;align-items:flex-start;cursor:pointer;">
        <input type="checkbox" id="waiverCheckbox"
          style="margin-top:3px;flex-shrink:0;accent-color:#F26C3A;width:14px;height:14px;" />
        <span style="color:var(--text-secondary);">
          Je comprends que l'accès à la formation commence <strong>immédiatement</strong>
          après le paiement et j'accepte expressément de renoncer à mon droit de
          rétractation de 14 jours
          <span style="font-size:0.72rem;">(art. L221-28 Code de la consommation)</span>.
        </span>
      </label>`;
    card.insertBefore(wrapper, btn);
  }

  function _checkWaiver() {
    const checkbox = document.getElementById('waiverCheckbox');
    if (!checkbox) return true;
    if (checkbox.checked) return true;
    const wrapper = document.getElementById('waiverWrapper');
    if (wrapper) {
      wrapper.style.outline = '2px solid rgba(242,108,58,0.7)';
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { if (wrapper) wrapper.style.outline = ''; }, 2200);
    }
    return false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _injectWaiver);
  } else {
    _injectWaiver();
  }

  // ── Lancer le paiement ─────────────────────────────────
  async function checkout(slug, prix, titre) {

    if (CONFIG.mode === 'stub') {
      _showStubModal(slug, prix, titre);
      return;
    }

    if (!_checkWaiver()) return;

    // ── Mode LIVE ──────────────────────────────────────────
    try {
      _showLoader(true);

      // Si le warm-up n'est pas terminé, on attend qu'il se finisse (max 8s)
      if (!_warmupDone) {
        await Promise.race([_warmup, new Promise(r => setTimeout(r, 8000))]);
      }

      const _doCheckout = () => fetch(`${CONFIG.backendUrl}/create-checkout-session`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ slug })
      });

      let response = await _doCheckout();

      // Retry unique si cold start (503/502/504)
      if (response.status === 503 || response.status === 502 || response.status === 504) {
        _showLoader(false);
        _showWakeup();
        await new Promise(r => setTimeout(r, 4000));
        _hideWakeup();
        _showLoader(true);
        response = await _doCheckout();
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Erreur serveur ${response.status}`);
      }

      const { url } = await response.json();
      window.location.href = url; // → Page Stripe sécurisée

    } catch (err) {
      console.error('[FormaElan Stripe]', err.message);
      _showError('Une erreur est survenue. Réessaie ou écris-nous à contact@formaelan.fr');
    } finally {
      _showLoader(false);
    }
  }

  // ── Modal simulation (mode stub) ──────────────────────
  function _showStubModal(slug, prix, titre) {
    const existing = document.getElementById('stripeStubModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'stripeStubModal';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      display:flex;align-items:center;justify-content:center;
      background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);
    `;
    modal.innerHTML = `
      <div style="
        background:var(--bg-secondary);
        border:1px solid var(--border-glow);
        border-radius:20px;padding:2.5rem;
        max-width:460px;width:90%;
        box-shadow:0 0 60px var(--accent-glow);
        position:relative;
      ">
        <button onclick="document.getElementById('stripeStubModal').remove()"
          style="position:absolute;top:1rem;right:1.2rem;background:transparent;border:none;
                 color:var(--text-secondary);font-size:1.5rem;cursor:pointer;line-height:1;">×</button>

        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:3rem;margin-bottom:.5rem;">🔒</div>
          <h3 style="font-size:1.2rem;font-weight:800;margin-bottom:.3rem;">${titre}</h3>
          <div style="font-size:2rem;font-weight:900;
            background:var(--gradient-accent);-webkit-background-clip:text;
            -webkit-text-fill-color:transparent;background-clip:text;">${prix} €</div>
        </div>

        <div style="padding:1rem;background:rgba(99,102,241,0.1);border:1px solid var(--border-glow);
                    border-radius:10px;font-size:0.85rem;color:var(--text-secondary);
                    margin-bottom:1.5rem;text-align:center;line-height:1.7;">
          ✅ <strong>Stripe est configuré et prêt</strong><br/>
          Il manque uniquement les <strong>Price IDs</strong> dans le fichier <code>.env</code><br/>
          <span style="font-size:.78rem;">(PRICE_SEO_SAAS, PRICE_IA_FREELANCE, etc.)</span>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border-glass);border-radius:10px;
                    padding:1rem;font-size:.82rem;color:var(--text-secondary);margin-bottom:1.5rem;
                    line-height:1.8;">
          <strong style="color:var(--text-accent);">Formation :</strong> ${titre}<br/>
          <strong style="color:var(--text-accent);">Slug :</strong> <code>${slug}</code><br/>
          <strong style="color:var(--text-accent);">Prix :</strong> ${prix} €<br/>
          <strong style="color:var(--text-accent);">Backend :</strong> <code>${CONFIG.backendUrl}</code>
        </div>

        <div style="font-size:.8rem;color:var(--text-secondary);
                    background:rgba(34,211,238,0.07);border:1px solid rgba(34,211,238,0.2);
                    border-radius:8px;padding:.8rem;margin-bottom:1.2rem;line-height:1.6;">
          📋 <strong>Étapes restantes :</strong><br/>
          1. Stripe Dashboard → Catalogue → copie les <code>price_xxx</code><br/>
          2. Colle-les dans <code>backend/.env</code><br/>
          3. Lance <code>npm install && node server.js</code> dans /backend<br/>
          4. Redémarre le backend et teste le checkout
        </div>

        <button onclick="document.getElementById('stripeStubModal').remove()"
          style="width:100%;padding:.9rem;background:var(--gradient-accent);border:none;
                 border-radius:10px;color:#fff;font-weight:700;font-size:.95rem;cursor:pointer;">
          OK, compris !
        </button>
      </div>`;

    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  }

  // ── Toast "serveur en démarrage" (cold start Render) ──
  function _showWakeup() {
    if (document.getElementById('feWakeup')) return;
    const t = document.createElement('div');
    t.id = 'feWakeup';
    t.style.cssText = `
      position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
      background:#0D1B3E;color:#fff;padding:1rem 1.5rem;border-radius:10px;
      font-size:.88rem;font-weight:600;z-index:9999;
      border:1px solid rgba(26,158,143,0.4);
      box-shadow:0 4px 24px rgba(0,0,0,0.4);max-width:90%;text-align:center;`;
    t.textContent = '⏳ Connexion au serveur en cours, encore quelques secondes…';
    document.body.appendChild(t);
  }
  function _hideWakeup() {
    const t = document.getElementById('feWakeup');
    if (t) t.remove();
  }

  // ── Loader plein écran ─────────────────────────────────
  function _showLoader(show) {
    let el = document.getElementById('stripeLoader');
    if (show && !el) {
      el = document.createElement('div');
      el.id = 'stripeLoader';
      el.style.cssText = `
        position:fixed;inset:0;z-index:9998;
        display:flex;align-items:center;justify-content:center;
        background:rgba(0,0,0,0.65);backdrop-filter:blur(6px);`;
      el.innerHTML = `
        <div style="text-align:center;color:#fff;">
          <div style="width:48px;height:48px;border:3px solid rgba(255,255,255,0.15);
            border-top-color:#6366f1;border-radius:50%;
            animation:feSpinLoader .75s linear infinite;margin:0 auto 1rem;"></div>
          <div style="font-size:.9rem;font-weight:600;">Connexion au paiement sécurisé…</div>
        </div>`;
      if (!document.getElementById('feStripeStyles')) {
        const s = document.createElement('style');
        s.id = 'feStripeStyles';
        s.textContent = '@keyframes feSpinLoader{to{transform:rotate(360deg)}}';
        document.head.appendChild(s);
      }
      document.body.appendChild(el);
    } else if (!show && el) {
      el.remove();
    }
  }

  // ── Toast erreur ───────────────────────────────────────
  function _showError(msg) {
    const t = document.createElement('div');
    t.style.cssText = `
      position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
      background:#ef4444;color:#fff;padding:1rem 2rem;border-radius:10px;
      font-size:.9rem;font-weight:600;z-index:9999;
      box-shadow:0 4px 24px rgba(239,68,68,0.4);max-width:90%;text-align:center;`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 6000);
  }

  // ── API publique ───────────────────────────────────────
  return {
    checkout,
    goLive: () => { CONFIG.mode = 'live'; console.log('[FormaElan] Stripe → mode LIVE'); }
  };

})();
