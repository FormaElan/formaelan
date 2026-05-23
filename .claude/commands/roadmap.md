Reproduis mot pour mot le contenu ci-dessous — ne rien ajouter, ne rien réorganiser, ne rien interpréter :

---

## Roadmap FormaElan — Phase 1 (Lancement MVP)

Dis-moi le numéro ou le nom de la tâche que tu veux lancer.

---

### ✅ Réalisé

- 6 formations complètes en ligne (SEO SaaS, IA Freelance, Copywriting Ecom, SEO Ecom, Optimiser IA, SEO Créateurs)
- Backend Stripe opérationnel — token d'accès, webhook, PRICE_MAP 6 slugs
- Site complet — index, pages de vente, success/cancel, quiz, certificat
- GitHub configuré — FormaElan/formaelan (public)
- Backend déployé sur Render (free tier) — https://formaelan.onrender.com (18/05)
- Tunnel paiement validé en mode test — carte 4242, token généré, accès formation OK (18/05)
- Warm-up ping — réveille Render dès le chargement de chaque page de vente (18/05)
- Pages légales créées — mentions-legales.html, cgv.html, politique-confidentialite.html, contact.html (18/05)
- Webhook Stripe secret configuré — STRIPE_WEBHOOK_SECRET dans Render Environment (18/05)
- Email post-achat — Resend configuré, DKIM Verified (19/05)
- access-tokens.json ajouté au .gitignore (18/05)
- formaelan.fr acheté — OVH, 5,99€ TTC, 1 an, Zimbra Starter (18/05)
- DNS GitHub Pages configuré — 4 A records + CNAME www, HTTPS Let's Encrypt (18/05)
- SITE_URL mis à jour sur Render → https://formaelan.fr (18/05)
- Tunnel paiement validé sur formaelan.fr (18/05)
- UptimeRobot configuré — ping /health toutes les 5 min (18/05)
- Zimbra contact@formaelan.fr créé (19/05)
- Resend : DKIM Verified, SPF, DMARC configurés (19/05)
- Rate limiting /create-checkout-session — express-rate-limit 5 req/min (fait)
- Waiver droit de rétractation — case à cocher avant Stripe (stripe.js, fait)
- Sitemap.xml — 6 pages de vente + index (fait)
- Favicon favicon.svg (fait)
- Page 404 custom 404.html (fait)
- Quiz de certification — quiz.js + certificat.html + /send-certificate backend (fait)
- robots.txt — formations/ + success/cancel/quiz/projet_FormaElan disallowed (23/05)
- CSS flip cards 3D — bug transition box-shadow corrigé (23/05)
- formation-template.html noindexé (fait)
- Démarches INPI Guichet-unique lancées (20/05) — en attente SIRET

---

### 🔴 Bloquants légaux (avant toute vente réelle)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 33 | Décision structure légale | Démarches Guichet-unique INPI lancées 20/05. Choisir : (A) micro-entrepreneur — gratuit, 22% charges, nom visible dans mentions légales ; (B) SASU "FormaElan" — ~200€ création ; (C) Lemon Squeezy merchant of record — 5% frais, aucune immat. Décision à prendre avant premières ventes réelles. | Décision |
| 1 | Remplir infos légales | Remplir les `[À compléter]` dans mentions-legales.html, cgv.html, politique-confidentialite.html — après décision #33 et réception SIRET. | 15 min |

---

### 🟠 Bloquants techniques production

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 3 | Clés Stripe live | Stripe Dashboard → basculer en mode Live → `sk_live_...` dans Render + `pk_live_...` dans js/stripe.js. À faire le jour J uniquement. | 30 min |
| 4 | Email post-achat — finaliser Resend | Attendre propagation DNS SPF `send` TXT → Verified sur Resend. Retenter achat test. Supprimer SMTP_USER + SMTP_PASSWORD obsolètes de Render. | 15 min |
| 34 | Stripe — formation seo-createurs | Créer le produit Stripe "SEO pour Créateurs de Contenu" (49€), récupérer PRICE_ID, ajouter `PRICE_SEO_CREATEURS=price_xxx` dans Render + `.env` local. server.js déjà prêt. | 15 min |
| 26 | Render : tokens éphémères | access-tokens.json effacé à chaque restart Render (~15 min inactivité). Fallback Stripe atténue. Solution propre : Render Disk ($7/mois) ou SQLite. | ~1h |

---

### 🟡 Problèmes visuels / contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 6 | Image OG manquante ⚠️ | Créer `img/og-cover.jpg` (1200×630px). Sans elle, aucun aperçu visuel sur LinkedIn/Facebook/Twitter lors du partage de formaelan.fr. Impact direct acquisition. | ~1h |
| 35 | Revoir grille tarifaire | Avec 6 formations : cohérence des prix (29€ / 39€ / 49€), logique de valeur perçue. Comparer concurrents FR. Décision avant campagne acquisition. | 1h réflexion |
| 36 | Prompt Perplexity — veille | Créer Sources/perplexity-veille-formations.md : prompt structuré pour analyser marché formations FR, identifier 5-10 nouvelles opportunités. À relancer tous les 2-3 mois. | 1h |

---

### 🔵 Accès et protection du contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 9 | Chapitres accessibles sans paiement | HTML chapitres publics — URL directe suffit. Acceptable Phase 1 (obscurité). Solution Phase 2 : token dans URL. | Phase 2 |

---

### 🔵 Qualité et tests

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 12 | Tests mobile | Tunnel complet sur téléphone : page de vente → Stripe → success.html → chapitre. | ~1h |
| 13 | Contrôle qualité formations | Lancer `/auditer_formation` sur les 6 formations. | ~2h |
| 14 | Analytics | Plausible ou Umami (RGPD, léger). Sans analytics impossible de savoir d'où viennent les visiteurs. | ~1h |
| 30 | Test Safari / cross-browser | Flip cards : tester `backface-visibility` + transitions sur Safari iOS/macOS. | 30 min |

---

### 🟣 Acquisition (après domaine actif)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 19 | SEO on-page final | Balises meta, OG tags, schema Course. Priorité après og-cover.jpg. | ~2h |
| 20 | LinkedIn personnel | Post de valeur (astuce concrète) avec mention naturelle. Pas un post "j'ai lancé". | ~1h |
| 21 | Groupes Facebook/Discord | 5 groupes actifs (freelance FR, SEO France, IA francophone). Valeur d'abord, formation ensuite. | Continu |
| 22 | Product Hunt | Description, visuels, tagline. Génère 200-500 visites en 24h. | ~2h |
| 23 | Première vente réelle | — | Objectif |

---

### ❌ Hors scope Phase 1

- SEO organique (3-6 mois) — Phase 2
- Pub payante — trop tôt sans conversion prouvée
- Twitter / Instagram — audience trop longue à construire
- Système de compte utilisateur / espace membre — Phase 2

---
