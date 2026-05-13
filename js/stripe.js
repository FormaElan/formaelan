// ============================================================
//  FormaElan — stripe.js  (frontend)
//  Clé publique TEST configurée — mode stub jusqu'aux Price IDs
// ============================================================

const FormaElanStripe = (() => {

  const CONFIG = {
    publicKey:  'pk_test_51TUtLOGnMFelvstENY6I6Q7OzLpDnk4ErPsHb3hsdLUSuOLtvsHHI6U8lqk8bvNvoBv9A7PEYAE4zjThmRU98yRA00steWWzZZ',
    backendUrl: 'http://localhost:4242',
    siteUrl:    window.location.origin,
    // 'stub'  = modal de simulation
    // 'live'  = vrai flux Stripe Checkout
    mode: 'live'
  };

  // ── Lancer le paiement ─────────────────────────────────
  async function checkout(slug, prix, titre) {

    if (CONFIG.mode === 'stub') {
      _showStubModal(slug, prix, titre);
      return;
    }

    // ── Mode LIVE ──────────────────────────────────────────
    try {
      _showLoader(true);

      const response = await fetch(`${CONFIG.backendUrl}/create-checkout-session`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ slug })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Erreur serveur ${response.status}`);
      }

      const { url } = await response.json();
      window.location.href = url; // → Page Stripe sécurisée

    } catch (err) {
      console.error('[FormaElan Stripe]', err.message);
      _showError('Une erreur est survenue. Réessaie ou écris-nous à multimind.team@gmail.com');
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
          4. Change <code>mode: 'live'</code> dans stripe.js
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
