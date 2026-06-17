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
- Protection des chapitres — contenu déplacé hors `/formations`, servi par Render via `session_id + token` (16/06)
- Email d'accès renforcé + renvoi admin — message "conserver cet email" ajouté, endpoint `/admin/resend-access` protégé par `ACCESS_ADMIN_SECRET` déployé (16/06)
- Audit pré-live complet — sécurité, Stripe, légal, SEO/social preview, dépendances npm et stratégie réseaux sociaux départ zéro analysés (16/06)

---

### 🟠 Bloquants techniques production

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 42 | Protéger le certificat | `/send-certificate` vérifie seulement le score envoyé par le navigateur. Exiger `session_id + token` valides et lier le certificat à un achat Stripe payé avant envoi email/génération lien. | ~1h30 |
| 43 | Retirer `projet_FormaElan.html` du public | La page répond 200 sur `https://formaelan.fr/projet_FormaElan.html` malgré robots.txt et contient des infos internes/obsolètes. Supprimer du site publié ou l'exclure via `_config.yml`/déplacement hors racine. | 15 min |
| 44 | Corriger dépendances npm | `npm audit --omit=dev` remonte 3 vulnérabilités modérées (`nodemailer`, `express/qs`). Lancer `npm audit fix`, vérifier `package-lock.json`, puis retester backend. | 30 min |
| 45 | Durcir légal avant vente réelle | Mentions légales : identité éditeur à compléter. CGV : vérifier TVA/franchise, accès à vie, renonciation au droit de rétractation avec case explicite avant Stripe. Politique confidentialité : ajouter Resend comme sous-traitant et clarifier token/session. | ~1h |
| 46 | Headers sécurité backend | Ajouter `helmet` ou headers équivalents pour les pages servies par Render (`X-Content-Type-Options`, `X-Frame-Options`, CSP raisonnable). Ajouter logs/rate limit sur `/admin/resend-access`. | ~45 min |
| 3 | Stripe live | Stripe Dashboard → mode Live → recréer les 6 produits/prix live → `STRIPE_SECRET_KEY=sk_live_...`, 6 `PRICE_*` live et `STRIPE_WEBHOOK_SECRET=whsec_...` live dans Render. Remplacer aussi l'ancienne `pk_test_...` dans `js/stripe.js` pour éviter toute confusion. À faire le jour J uniquement. | 45 min |
| 4 | Email post-achat — finaliser Resend | Attendre propagation DNS SPF `send` TXT → Verified sur Resend. Retenter achat test. Supprimer SMTP_USER + SMTP_PASSWORD obsolètes de Render. | 15 min |
| ~~34~~ | ~~Stripe — formation seo-createurs~~ | ~~✅ Fait le 31/05/2026 — `PRICE_SEO_CREATEURS=price_1Td40NGnMFelvstEUutMpx4X` dans Render + `.env`.~~ | ~~15 min~~ |
| 26 | Render : tokens éphémères | access-tokens.json effacé à chaque restart Render (~15 min inactivité). Fallback Stripe atténue. Solution propre : Render Disk ($7/mois) ou SQLite. | ~1h |

---

### 🟡 Problèmes visuels / contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| ~~6~~ | ~~Image OG~~ | ~~✅ Fait — `img/og-cover.png` existant (1200×630px), design soigné, conforme.~~ | ~~~1h~~ |
| 47 | SEO/social preview statique | Les pages de vente ont encore title/meta/OG/canonical génériques côté HTML puis modifiés par JS. Rendre les métas statiques par page, ajouter schema.org Course, intégrer l'aperçu gratuit au sitemap. | ~2h |
| 35 | Revoir grille tarifaire | Avec 6 formations : cohérence des prix (29€ / 39€ / 49€), logique de valeur perçue. Comparer concurrents FR. Décision avant campagne acquisition. | 1h réflexion |
| 36 | Prompt Perplexity — veille | Créer Sources/perplexity-veille-formations.md : prompt structuré pour analyser marché formations FR, identifier 5-10 nouvelles opportunités. À relancer tous les 2-3 mois. | 1h |

---

### 🔵 Accès et protection du contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| ~~9~~ | ~~Chapitres accessibles sans paiement~~ | ~~✅ Corrigé le 16/06/2026 — les chapitres sont dans `_private/formations` et servis par `/formation/:slug/:chapter` après validation `session_id + token`.~~ | ~~Fait~~ |
| ~~41~~ | ~~Renvoi d'accès client perdu~~ | ~~✅ Corrigé le 16/06/2026 — `POST /admin/resend-access` retrouve une session Stripe payée par email et renvoie le lien d'accès via Resend. À activer avec `ACCESS_ADMIN_SECRET` dans Render.~~ | ~~Fait~~ |

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
| 37 | **Envoyer 1ère publication LinkedIn** | Post de présentation FormaElan prêt : `doc_interne/reseaux-sociaux/linkedin-post-01-presentation-formaelan.md` (version finale révisée). Copier-coller le texte sur LinkedIn, ajouter le lien aperçu en 1er commentaire. Puis attendre 2-4 jours avant post #02 (aperçu IA Freelance). | 5 min |
| 38 | **Stratégie réseaux sociaux départ zéro** | Ne pas publier comme si l'audience existait déjà. Priorité : profil LinkedIn personnel + 15-20 commentaires utiles/jour sur comptes ciblés. 4 posts LinkedIn/semaine orientés valeur. Instagram/TikTok/Shorts = recyclage découverte (carousels/reels courts), pas canal principal de vente au départ. | Continu |
| 19 | SEO on-page final | Voir tâche 47 : métas statiques, OG tags, canonical, schema Course, sitemap. | ~2h |
| 20 | LinkedIn — post #02 aperçu IA | Post formation IA pour Freelance prêt : `doc_interne/reseaux-sociaux/linkedin-post-02-apercu-ia-freelance.md`. À poster 2-4 jours après le post #37. | 5 min |
| 21 | Groupes Facebook/Discord | 5 groupes actifs (freelance FR, SEO France, IA francophone). Valeur d'abord, formation ensuite. | Continu |
| 22 | Product Hunt | Description, visuels, tagline. Génère 200-500 visites en 24h. | ~2h |
| 39 | **Agent commercial IA** | Script/agent autonome qui : (1) identifie des prospects qualifiés (freelances, e-commerçants, créateurs FR) via LinkedIn/Apollo, (2) enrichit les données (poste, entreprise, déclencheur récent), (3) génère un message personnalisé via le prompt du chapitre 3 IA Freelance, (4) prépare une liste d'envoi. Peut être un script Python + Claude API ou un workflow Make. Scope Phase 1 = prototype manuel guidé. Scope Phase 2 = automatisation complète. | ~4h proto |
| 23 | Première vente réelle | — | Objectif |

---

### ❌ Hors scope Phase 1

- SEO organique (3-6 mois) — Phase 2
- Pub payante — trop tôt sans conversion prouvée
- Twitter / Instagram — pas canal principal Phase 1, uniquement recyclage et preuve de présence
- Système de compte utilisateur / espace membre — Phase 2

---

### 🔲 Phase 2 — À faire après lancement

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 40 | Mise à jour formations SEO — AI Overviews | Ajouter un chapitre ou une section dans les 3 formations SEO (SaaS, E-commerce, Créateurs) sur l'expansion des AI Overviews Google I/O 2026 : impact sur le CTR, stratégies d'adaptation (featured snippets, schema markup, contenu de marque). Google May 2026 core update = contexte déclencheur. | ~2h |

---
