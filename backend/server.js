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
const { Resend }   = require('resend');
const rateLimit    = require('express-rate-limit');
const helmet       = require('helmet');
const stripe       = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
  'seo-createurs':     process.env.PRICE_SEO_CREATEURS,
};

// ── Noms lisibles des formations ────────────────────────────
const FORMATION_NAMES = {
  'seo-saas':         'SEO pour SaaS',
  'ia-freelance':     'IA pour Freelance',
  'copywriting-ecom': 'Copywriting E-commerce',
  'seo-ecom':         'SEO pour E-commerce',
  'optimiser-ia':     'Optimiser son IA',
  'seo-createurs':    'SEO pour Créateurs de Contenu',
};

// ── Premier chapitre par slug (pour le lien d'accès) ───────
const FIRST_CHAPTER = {
  'seo-saas':         'ch1-fondamentaux.html',
  'ia-freelance':     'ch1-ia-2026.html',
  'copywriting-ecom': 'ch1-psychologie-achat.html',
  'seo-ecom':         'ch1-specificites-seo-ecom.html',
  'optimiser-ia':     'ch1-sous-exploites-ia.html',
  'seo-createurs':    'ch1-createurs-seo-2026.html',
};

const FORMATION_CONTENT_ROOT = path.join(__dirname, '..', '_private', 'formations');

function siteUrl() {
  return (process.env.SITE_URL || 'https://formaelan.fr').replace(/\/$/, '');
}

function requestBaseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

function protectedChapterUrl(req, slug, chapter, sessionId, token) {
  const qs = new URLSearchParams({ session_id: sessionId, token });
  return `${requestBaseUrl(req)}/formation/${encodeURIComponent(slug)}/${encodeURIComponent(chapter)}?${qs}`;
}

function publicQuizUrl(slug, sessionId, token) {
  const qs = new URLSearchParams({ slug, session_id: sessionId, token });
  return `${siteUrl()}/quiz.html?${qs}`;
}

function envPresent(name) {
  return Boolean(process.env[name] && !String(process.env[name]).includes('REMPLACER'));
}

function pricesConfigured() {
  return Object.fromEntries(
    Object.entries(PRICE_MAP).map(([slug, priceId]) => [
      slug,
      Boolean(priceId && !String(priceId).includes('REMPLACER') && String(priceId).startsWith('price_'))
    ])
  );
}

function maskEmail(email) {
  const [name = '', domain = ''] = String(email || '').split('@');
  if (!domain) return '(email invalide)';
  const visible = name.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(1, name.length - visible.length))}@${domain}`;
}

async function verifyPaidAccess(sessionId, token, slug) {
  if (!sessionId || !token) {
    const err = new Error('Acces acheteur requis.');
    err.statusCode = 401;
    throw err;
  }

  const access = await resolvePaidAccess(sessionId);

  if (access.slug !== slug || access.token !== token) {
    const err = new Error('Acces non autorise pour cette formation.');
    err.statusCode = 403;
    throw err;
  }

  return access;
}

// ── Stockage des tokens d'accès ─────────────────────────────
// Primaire  : Upstash Redis (si UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
// Secondaire: fichier JSON local (fallback — éphémère sur Render free tier)
// En cas de redeploy Render sans Redis : /get-access re-vérifie Stripe directement.
const tokenStore = new Map();
const TOKEN_FILE  = path.join(__dirname, 'access-tokens.json');

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const USE_REDIS     = !!(UPSTASH_URL && UPSTASH_TOKEN);

if (USE_REDIS) {
  console.log('[Tokens] Upstash Redis actif');
} else {
  console.log('[Tokens] Stockage fichier local (configurer Upstash pour la persistance)');
}

async function redisSave(sessionId, entry) {
  if (!USE_REDIS) return;
  try {
    await fetch(`${UPSTASH_URL}/set/token:${sessionId}/${encodeURIComponent(JSON.stringify(entry))}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
  } catch (e) {
    console.error('[Redis] Erreur écriture :', e.message);
  }
}

async function redisGet(sessionId) {
  if (!USE_REDIS) return null;
  try {
    const r = await fetch(`${UPSTASH_URL}/get/token:${sessionId}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    const { result } = await r.json();
    return result ? JSON.parse(decodeURIComponent(result)) : null;
  } catch (e) {
    console.error('[Redis] Erreur lecture :', e.message);
    return null;
  }
}

function loadTokens() {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      Object.entries(data).forEach(([k, v]) => tokenStore.set(k, v));
      console.log(`[Tokens] ${tokenStore.size} token(s) chargé(s) depuis fichier`);
    }
  } catch (e) {
    console.error('[Tokens] Erreur chargement fichier :', e.message);
  }
}

function saveTokensFile() {
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(Object.fromEntries(tokenStore), null, 2));
  } catch (e) {
    console.error('[Tokens] Erreur sauvegarde fichier :', e.message);
  }
}

async function saveTokens(sessionId, entry) {
  tokenStore.set(sessionId, entry);
  saveTokensFile();
  await redisSave(sessionId, entry);
}

async function resolvePaidAccess(sessionId) {
  const stored = (await redisGet(sessionId)) || tokenStore.get(sessionId);
  if (stored) return stored;

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== 'paid') {
    const err = new Error('Paiement non confirmé');
    err.statusCode = 402;
    throw err;
  }

  const slug = session.metadata?.formation_slug;
  if (!slug || !FIRST_CHAPTER[slug]) {
    const err = new Error('Formation introuvable pour cette session');
    err.statusCode = 404;
    throw err;
  }

  const entry = {
    token: crypto.randomUUID(),
    slug,
    email: session.customer_details?.email || '',
    createdAt: new Date().toISOString(),
  };

  await saveTokens(sessionId, entry);
  return entry;
}

function rewriteProtectedChapterHtml(html, req, slug, sessionId, token) {
  const publicSite = siteUrl();
  const qs = new URLSearchParams({ session_id: sessionId, token }).toString();
  const protectedBase = `${requestBaseUrl(req)}/formation/${encodeURIComponent(slug)}/`;

  return html
    .replace(/href="\.\.\/\.\.\/css\/formations\.css"/g, `href="${publicSite}/css/formations.css"`)
    .replace(/href="\.\.\/\.\.\/index\.html"/g, `href="${publicSite}/index.html"`)
    .replace(/href="\.\.\/\.\.\/pages\/([^"]+)"/g, `href="${publicSite}/pages/$1"`)
    .replace(/href="\.\.\/\.\.\/quiz\.html\?slug=([^"]+)"/g, (_match, quizSlug) => `href="${publicQuizUrl(quizSlug, sessionId, token)}"`)
    .replace(/href="(ch[0-9]+-[a-z0-9-]+\.html)"/g, `href="${protectedBase}$1?${qs}"`);
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
          <div style="margin:24px 0 0;padding:14px 16px;background:#fff7ed;
                      border:1px solid #fed7aa;border-radius:8px;color:#7c2d12;
                      font-size:0.86rem;line-height:1.6;">
            <strong>Important : conserve cet email.</strong><br/>
            C'est ton lien d'accès personnel à la formation. Ajoute-le à tes favoris
            ou archive cet email dans un dossier dédié pour le retrouver facilement.
          </div>
          <p style="margin:16px 0 0;font-size:0.8rem;color:#9ca3af;line-height:1.6;">
            Si tu perds ce mail, réponds-nous à contact@formaelan.fr avec l'adresse utilisée lors du paiement :
            nous pourrons vérifier l'achat et te renvoyer ton accès.<br/>
            Une question ? Réponds simplement à cet email.
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

async function findPaidCheckoutSessionByEmail(email, slug = '') {
  const normalizedEmail = email.trim().toLowerCase();
  let found = null;

  await stripe.checkout.sessions
    .list({ limit: 100 })
    .autoPagingEach(session => {
      const sessionEmail = (session.customer_details?.email || session.customer_email || '').toLowerCase();
      const sessionSlug = session.metadata?.formation_slug || '';

      if (
        session.payment_status === 'paid' &&
        sessionEmail === normalizedEmail &&
        (!slug || sessionSlug === slug)
      ) {
        found = session;
        return false;
      }

      return true;
    });

  return found;
}

// ── Trust proxy (Render) ────────────────────────────────────
app.set('trust proxy', 1);

// ── Middlewares ─────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      scriptSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'", siteUrl()],
      imgSrc: ["'self'", 'data:', siteUrl()],
      fontSrc: ["'self'", 'data:'],
      formAction: ["'self'"],
    },
  },
}));

app.use(cors({
  origin: process.env.SITE_URL
    ? new URL(process.env.SITE_URL).origin
    : '*',
  methods: ['GET', 'POST'],
}));

// ── Webhook Stripe — AVANT express.json() ───────────────────
// Stripe requiert le body brut (Buffer) pour vérifier la signature.
// express.json() consommerait le body avant que express.raw() puisse le lire.
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig           = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Rejeter systématiquement si la clé webhook n'est pas configurée.
  // Sans elle, n'importe qui peut forger un checkout.session.completed.
  if (!webhookSecret) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET absent — requête rejetée (403)');
    return res.status(403).json({ error: 'Webhook non autorisé : STRIPE_WEBHOOK_SECRET manquant.' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('[Webhook] Signature invalide :', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object;
      const slug    = session.metadata?.formation_slug;
      const email   = session.customer_details?.email || '';
      const token   = crypto.randomUUID();

      if (slug) {
        const entry = { token, slug, email, createdAt: new Date().toISOString() };
        await saveTokens(session.id, entry);
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

app.use(express.json());

// ── Health check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  const stripeMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'live' : 'test';
  const priceStatus = pricesConfigured();
  res.json({
    status: 'ok',
    mode: stripeMode,
    stripe: '✓ connecté',
    tokens: tokenStore.size,
    protectedContent: fs.existsSync(FORMATION_CONTENT_ROOT),
    config: {
      siteUrl: siteUrl(),
      webhookSecret: envPresent('STRIPE_WEBHOOK_SECRET'),
      resend: envPresent('RESEND_API_KEY'),
      adminSecret: envPresent('ACCESS_ADMIN_SECRET'),
      redis: USE_REDIS,
      pricesConfigured: priceStatus,
      allPricesConfigured: Object.values(priceStatus).every(Boolean),
    },
  });
});

// ── Rate limiting ────────────────────────────────────────────
const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives. Réessaie dans une minute.' },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives admin. Reessaie plus tard.' },
});

// ── Créer une Stripe Checkout Session ───────────────────────
// POST /create-checkout-session
// Body : { slug: "optimiser-ia" }
app.post('/create-checkout-session', checkoutLimiter, async (req, res) => {
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

app.post('/admin/resend-access', adminLimiter, async (req, res) => {
  const adminSecret = process.env.ACCESS_ADMIN_SECRET;
  const providedSecret = req.headers['x-admin-secret'];

  if (!adminSecret || providedSecret !== adminSecret) {
    console.warn(`[Admin] Tentative refusee depuis ${req.ip}`);
    return res.status(403).json({ error: 'Accès admin refusé.' });
  }

  const email = String(req.body.email || '').trim().toLowerCase();
  const slug = String(req.body.slug || '').trim();

  console.log(`[Admin] Demande renvoi acces depuis ${req.ip} pour ${maskEmail(email)} ${slug || '(slug non precise)'}`);

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email client invalide.' });
  }

  if (slug && !FIRST_CHAPTER[slug]) {
    return res.status(400).json({ error: 'Formation inconnue.' });
  }

  try {
    const session = await findPaidCheckoutSessionByEmail(email, slug);

    if (!session) {
      return res.status(404).json({
        error: slug
          ? `Aucun achat payé trouvé pour ${email} sur ${slug}.`
          : `Aucun achat payé trouvé pour ${email}.`,
      });
    }

    const sessionSlug = session.metadata?.formation_slug;
    await resolvePaidAccess(session.id);
    await sendAccessEmail(email, sessionSlug, session.id);

    res.json({
      status: 'resent',
      email,
      slug: sessionSlug,
      session_id: session.id,
    });
  } catch (err) {
    console.error('[Admin] Erreur renvoi accès :', err.message);
    res.status(500).json({ error: 'Impossible de renvoyer l’accès.' });
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

  try {
    const access = await resolvePaidAccess(session_id);
    const chapter = FIRST_CHAPTER[access.slug] || null;

    return res.json({
      slug: access.slug,
      token: access.token,
      email: access.email,
      chapter,
      accessUrl: chapter
        ? protectedChapterUrl(req, access.slug, chapter, session_id, access.token)
        : null,
    });
  } catch (err) {
    console.error('[Access] Erreur Stripe retrieve :', err.message);
    return res.status(err.statusCode || 500).json({
      error: err.statusCode ? err.message : 'Impossible de vérifier la session.',
    });
  }
});

app.get('/formation/:slug/:chapter', async (req, res) => {
  const { slug, chapter } = req.params;
  const { session_id, token } = req.query;

  if (!/^[a-z0-9-]+$/.test(slug) || !/^ch[0-9]+-[a-z0-9-]+\.html$/.test(chapter)) {
    return res.status(404).send('Chapitre introuvable.');
  }

  if (!session_id || !token) {
    return res.status(401).send('Accès réservé aux acheteurs. Utilise le lien reçu après paiement.');
  }

  try {
    await verifyPaidAccess(session_id, token, slug);

    const chapterPath = path.resolve(FORMATION_CONTENT_ROOT, slug, chapter);
    const slugRoot = path.resolve(FORMATION_CONTENT_ROOT, slug);

    if (!chapterPath.startsWith(slugRoot + path.sep) || !fs.existsSync(chapterPath)) {
      return res.status(404).send('Chapitre introuvable.');
    }

    const html = fs.readFileSync(chapterPath, 'utf8');
    const protectedHtml = rewriteProtectedChapterHtml(html, req, slug, session_id, token);

    res.set('Cache-Control', 'private, no-store');
    res.type('html').send(protectedHtml);
  } catch (err) {
    console.error('[Formation] Accès refusé :', err.message);
    return res.status(err.statusCode || 500).send(err.statusCode ? err.message : 'Impossible de vérifier l’accès.');
  }
});


// ── Noms lisibles des formations (partagé) ─────────────────
const FORMATION_TITLES = FORMATION_NAMES; // alias

// ── Rate limiter certificat ─────────────────────────────────
const certificatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de demandes. Réessaie dans une heure.' },
});

// ── Envoyer un certificat par email ─────────────────────────
// POST /send-certificate
// Body : { email, nom, slug, score, date, certId, session_id, token }
app.post('/send-certificate', certificatLimiter, async (req, res) => {
  const { email, nom, slug, score, date, certId, session_id, token } = req.body;

  // Validation
  if (!email || !nom || !slug || score === undefined || !date || !certId || !session_id || !token) {
    return res.status(400).json({ error: 'Paramètres manquants.' });
  }
  if (!FORMATION_NAMES[slug]) {
    return res.status(400).json({ error: `Formation inconnue : ${slug}` });
  }
  if (Number(score) < 70) {
    return res.status(400).json({ error: 'Score insuffisant pour obtenir un certificat.' });
  }

  let access;
  try {
    access = await verifyPaidAccess(session_id, token, slug);
  } catch (err) {
    console.warn(`[Certif] Acces refuse depuis ${req.ip} pour ${slug || '(slug manquant)'} : ${err.message}`);
    return res.status(err.statusCode || 500).json({ error: err.message || 'Acces impossible a verifier.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const purchaseEmail = String(access.email || '').trim().toLowerCase();

  if (purchaseEmail && normalizedEmail !== purchaseEmail) {
    return res.status(403).json({
      error: "Utilise l'adresse email de l'achat pour recevoir le certificat.",
    });
  }

  const formation = FORMATION_NAMES[slug];
  const certUrl   = `${process.env.SITE_URL}/certificat.html?slug=${encodeURIComponent(slug)}&nom=${encodeURIComponent(nom)}&score=${encodeURIComponent(score)}&date=${encodeURIComponent(date)}&id=${encodeURIComponent(certId)}`;

  const months = ['janvier','février','mars','avril','mai','juin',
                  'juillet','août','septembre','octobre','novembre','décembre'];
  function formatDate(iso) {
    const [y, m, d] = (iso || '').split('-');
    return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
  }
  const dateFormatted = formatDate(date);

  const certHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="max-width:620px;margin:0 auto;font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a2e;">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0D1B3E,#1A3260);
                   padding:24px 32px;border-radius:12px 12px 0 0;">
          <span style="color:#1A9E8F;font-size:1.3rem;font-weight:900;">⚡ FormaElan</span>
        </td>
      </tr>

      <!-- Teal stripe -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,#1A9E8F,#22d3c8,#1A9E8F);"></td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#f9fafb;padding:36px 40px;border:1px solid #e5e7eb;border-top:none;">

          <p style="margin:0 0 8px;font-size:.8rem;font-weight:700;letter-spacing:.12em;
                    text-transform:uppercase;color:#1A9E8F;">
            Certificat officiel FormaElan
          </p>

          <h1 style="margin:0 0 4px;font-size:1.8rem;font-weight:900;color:#0D1B3E;line-height:1.2;">
            Certificat de Réussite
          </h1>

          <div style="width:50px;height:3px;background:#1A9E8F;border-radius:2px;margin:16px 0 24px;"></div>

          <p style="margin:0 0 4px;font-size:.85rem;color:#6b7280;">Décerné à</p>
          <p style="margin:0 0 20px;font-size:1.6rem;font-weight:800;color:#0D1B3E;">${nom}</p>

          <p style="margin:0 0 6px;font-size:.85rem;color:#6b7280;">pour avoir complété la formation</p>
          <div style="display:inline-block;background:rgba(26,158,143,.1);border:1px solid rgba(26,158,143,.3);
                      border-radius:8px;padding:10px 20px;margin-bottom:28px;">
            <span style="font-size:1.1rem;font-weight:700;color:#0D1B3E;">${formation}</span>
          </div>

          <!-- Meta -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="margin-bottom:28px;text-align:center;">
            <tr>
              <td style="padding:12px;border-right:1px solid #e5e7eb;">
                <div style="font-size:1.4rem;font-weight:800;color:#0D1B3E;">${score}%</div>
                <div style="font-size:.72rem;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;margin-top:3px;">Score obtenu</div>
              </td>
              <td style="padding:12px;">
                <div style="font-size:1.4rem;font-weight:800;color:#0D1B3E;">${dateFormatted}</div>
                <div style="font-size:.72rem;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em;margin-top:3px;">Date d'obtention</div>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 24px;font-size:.82rem;color:#6b7280;line-height:1.7;">
            Ce certificat atteste la réussite du quiz de certification avec un score ≥ 70 %.
            Il peut être valorisé sur <strong>LinkedIn</strong>, <strong>Malt</strong>
            ou tout portfolio client.
          </p>

          <a href="${certUrl}"
             style="display:inline-block;background:linear-gradient(135deg,#1A9E8F,#0d7a6e);
                    color:#fff;padding:14px 28px;border-radius:9px;text-decoration:none;
                    font-weight:700;font-size:.95rem;">
            📄 Voir mon certificat en ligne
          </a>

          <p style="margin:24px 0 0;font-size:.75rem;color:#9ca3af;line-height:1.6;">
            Identifiant : <strong>${certId}</strong><br/>
            Une question ? Réponds à cet email ou écris-nous à contact@formaelan.fr
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f3f4f6;padding:14px 32px;border-radius:0 0 12px 12px;
                   border:1px solid #e5e7eb;border-top:none;
                   font-size:.72rem;color:#9ca3af;text-align:center;">
          © 2026 FormaElan · contact@formaelan.fr
        </td>
      </tr>
    </table>`;

  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[Certif] RESEND_API_KEY absent — email non envoyé');
      return res.json({ ok: true, certId, note: 'Email non envoyé (clé absente)' });
    }

    const { error: mailError } = await resend.emails.send({
      from:    'FormaElan <contact@formaelan.fr>',
      to:      email,
      subject: `🏆 Ton certificat FormaElan — ${formation}`,
      html:    certHtml,
    });

    if (mailError) throw new Error(`Resend ${mailError.statusCode} — ${mailError.message}`);

    console.log(`[Certif] Certificat envoyé → ${email} (${slug}, ${score}%)`);
    res.json({ ok: true, certId });

  } catch (err) {
    console.error('[Certif] Erreur envoi :', err.message);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email. Réessaie dans quelques instants.' });
  }
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
