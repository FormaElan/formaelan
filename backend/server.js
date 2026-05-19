// ============================================================
//  FormaElan — Backend Express + Stripe
//  Lance avec : node server.js  (ou npm run dev)
// ============================================================

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const crypto     = require('crypto');
const fs         = require('fs');
const path       = require('path');
const { Resend } = require('resend');
const stripe     = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

const app  = express();
const PORT = process.env.PORT || 4242;

// ── Mapping slug → Price ID Stripe ─────────────────────────
// Ces IDs viennent de ton .env — remplis-les dans .env
const PRICE_MAP = {
  'seo-saas':          process.env.PRICE_SEO_SAAS,
  'ia-freelance':      process.env.PRICE_IA_FREELANCE,
  'copywriting-ecom':  process.env.PRICE_COPYWRITING_ECOM,
  'seo-ecom':          process.env.PRICE_SEO_ECOM,
  'optimiser-ia':      process.env.PRICE_OPTIMISER_IA,
};

// ── Noms lisibles des formations ────────────────────────────
const FORMATION_NAMES = {
  'seo-saas':         'SEO pour SaaS',
  'ia-freelance':     'IA pour Freelance',
  'copywriting-ecom': 'Copywriting E-commerce',
  'seo-ecom':         'SEO pour E-commerce',
  'optimiser-ia':     'Optimiser son IA',
};

// ── Premier chapitre par slug (pour le lien d'accès) ───────
const FIRST_CHAPTER = {
  'seo-saas':         'formations/seo-saas/ch1-fondamentaux.html',
  'ia-freelance':     'formations/ia-freelance/ch1-ia-2026.html',
  'copywriting-ecom': 'formations/copywriting-ecom/ch1-psychologie-achat.html',
  'seo-ecom':         'formations/seo-ecom/ch1-specificites-seo-ecom.html',
  'optimiser-ia':     'formations/optimiser-ia/ch1-sous-exploites-ia.html',
};

// ── Stockage des tokens d'accès ─────────────────────────────
// Clé : session_id Stripe  |  Valeur : { token, slug, email, createdAt }
const tokenStore = new Map();
const TOKEN_FILE  = path.join(__dirname, 'access-tokens.json');

function loadTokens() {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      Object.entries(data).forEach(([k, v]) => tokenStore.set(k, v));
      console.log(`[Tokens] ${tokenStore.size} token(s) chargé(s)`);
    }
  } catch (e) {
    console.error('[Tokens] Erreur chargement :', e.message);
  }
}

function saveTokens() {
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(Object.fromEntries(tokenStore), null, 2));
  } catch (e) {
    console.error('[Tokens] Erreur sauvegarde :', e.message);
  }
}

loadTokens();

// ── Mailer Resend ─────────────────────────────────────────────
async function sendAccessEmail(email, slug, sessionId) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Mail] RESEND_API_KEY absent — email non envoyé');
    return;
  }
  const formation = FORMATION_NAMES[slug] || slug;
  const accessUrl = `${process.env.SITE_URL}/success.html?session_id=${encodeURIComponent(sessionId)}`;

  const { error: mailError } = await resend.emails.send({
    from: 'FormaElan <contact@formaelan.fr>',
    to: email,
    subject: `Ton accès à "${formation}" est prêt`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a2e;">
        <div style="background:#0D1B3E;padding:24px 32px;border-radius:12px 12px 0 0;">
          <span style="color:#1A9E8F;font-size:1.4rem;font-weight:800;">⚡ FormaElan</span>
        </div>
        <div style="background:#f7f8fa;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
          <h2 style="margin:0 0 16px;font-size:1.2rem;">Ton accès est prêt ✅</h2>
          <p style="margin:0 0 8px;">Formation achetée : <strong>${formation}</strong></p>
          <p style="margin:0 0 24px;color:#6b7280;">Clique sur le bouton ci-dessous pour accéder à ta formation :</p>
          <a href="${accessUrl}"
             style="display:inline-block;background:#1A9E8F;color:#fff;padding:14px 28px;
                    border-radius:8px;text-decoration:none;font-weight:700;font-size:1rem;">
            ▶ Accéder à la formation
          </a>
          <p style="margin:24px 0 0;font-size:0.8rem;color:#9ca3af;">
            Conserve cet email — ce lien te permet de retrouver ta formation à tout moment.<br/>
            Une question ? Réponds à cet email ou écris-nous à contact@formaelan.fr
          </p>
        </div>
      </div>
    `,
  });
  if (mailError) {
    throw new Error(`Resend ${mailError.statusCode} — ${mailError.message}`);
  }
  console.log(`[Mail] Email envoyé → ${email} (${slug})`);
}

// ── Middlewares ─────────────────────────────────────────────
app.use(cors({
  origin: process.env.SITE_URL
    ? new URL(process.env.SITE_URL).origin
    : '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ── Health check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: 'test', stripe: '✓ connecté', tokens: tokenStore.size });
});

// ── Créer une Stripe Checkout Session ───────────────────────
// POST /create-checkout-session
// Body : { slug: "optimiser-ia" }
app.post('/create-checkout-session', async (req, res) => {
  const { slug } = req.body;

  const priceId = PRICE_MAP[slug];
  if (!priceId || priceId.includes('REMPLACER')) {
    return res.status(400).json({
      error: `Price ID manquant pour "${slug}". Remplis le .env avec les vrais price_xxx.`
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.SITE_URL}/cancel.html`,
      billing_address_collection: 'auto',
      locale: 'fr',
      metadata: { formation_slug: slug },
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error('[Stripe] Erreur création session :', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Récupérer l'accès post-paiement ─────────────────────────
// GET /get-access?session_id=xxx
// Utilisé par success.html pour afficher le lien de formation
app.get('/get-access', async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'session_id manquant' });
  }

  // 1. Chercher dans le store local (mis à jour par le webhook)
  const stored = tokenStore.get(session_id);
  if (stored) {
    return res.json({
      slug:    stored.slug,
      token:   stored.token,
      email:   stored.email,
      chapter: FIRST_CHAPTER[stored.slug] || null,
    });
  }

  // 2. Fallback : interroger Stripe directement
  // (utile si le webhook n'a pas encore été reçu au moment où l'utilisateur arrive)
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Paiement non confirmé' });
    }

    const slug  = session.metadata?.formation_slug;
    const token = crypto.randomUUID();
    const email = session.customer_details?.email || '';

    const entry = { token, slug, email, createdAt: new Date().toISOString() };
    tokenStore.set(session_id, entry);
    saveTokens();

    return res.json({ slug, token, email, chapter: FIRST_CHAPTER[slug] || null });

  } catch (err) {
    console.error('[Access] Erreur Stripe retrieve :', err.message);
    return res.status(500).json({ error: 'Impossible de vérifier la session.' });
  }
});

// ── Webhook Stripe ───────────────────────────────────────────
// POST /webhook
// Génère et stocke le token dès la confirmation de paiement
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig           = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  if (webhookSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('[Webhook] Signature invalide :', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    // Mode développement sans signature
    try {
      event = JSON.parse(req.body);
    } catch {
      event = req.body;
    }
    console.warn('[Webhook] STRIPE_WEBHOOK_SECRET absent — signature non vérifiée');
  }

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object;
      const slug    = session.metadata?.formation_slug;
      const email   = session.customer_details?.email || '';
      const token   = crypto.randomUUID();

      if (slug) {
        tokenStore.set(session.id, {
          token,
          slug,
          email,
          createdAt: new Date().toISOString(),
        });
        saveTokens();
        console.log(`✓ Paiement confirmé — Formation : ${slug} — Email : ${email}`);
        if (email) sendAccessEmail(email, slug, session.id).catch(err =>
          console.error('[Mail] Erreur envoi :', err.message)
        );
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      console.log('✗ Paiement échoué :', event.data.object.id);
      break;
    }

    default:
      // Ignorer les autres événements
  }

  res.json({ received: true });
});

// ── Démarrage ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ⚡ FormaElan Backend démarré');
  console.log(`  → http://localhost:${PORT}`);
  console.log(`  → Health : http://localhost:${PORT}/health`);
  console.log(`  → Formations : ${Object.keys(PRICE_MAP).join(', ')}`);
  console.log('  → Mode : TEST Stripe');
  console.log('');
});
