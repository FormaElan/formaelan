Reproduis mot pour mot le contenu ci-dessous — ne rien ajouter, ne rien réorganiser, ne rien interpréter :

---

## Roadmap FormaElan — Phase 1 (Lancement MVP)

Dis-moi le numéro ou le nom de la tâche que tu veux lancer.

---

### ✅ Réalisé

- 5 formations complètes en ligne (SEO SaaS, IA Freelance, Copywriting Ecom, SEO Ecom, Optimiser IA)
- Backend Stripe opérationnel — token d'accès, webhook, PRICE_MAP 5 slugs
- Site complet — index, pages de vente, success/cancel
- GitHub configuré — FormaElan/formaelan (public)
- Backend déployé sur Render (free tier) — https://formaelan.onrender.com (18/05)
- Tunnel paiement validé en mode test — carte 4242, token généré, accès formation OK (18/05)
- Warm-up ping — réveille Render dès le chargement de chaque page de vente (18/05)
- Pages légales créées — mentions-legales.html, cgv.html, politique-confidentialite.html, contact.html (18/05)
- Webhook Stripe secret configuré — STRIPE_WEBHOOK_SECRET ajouté dans Render Environment (18/05)
- Email post-achat — code Nodemailer prêt dans server.js, en attente config Zimbra formaelan.fr (18/05)
- access-tokens.json ajouté au .gitignore — sécurité données personnelles (18/05)
- formaelan.fr acheté — OVH, 5,99€ TTC, 1 an, Zimbra Starter inclus, installation en cours (18/05)

---

### 🔴 Bloquants légaux (avant toute vente réelle)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 33 | Décision structure légale | Choisir entre : (A) micro-entrepreneur — gratuit, 22% charges, nom visible dans mentions légales ; (B) SASU "FormaElan" — ~200€ création + ~50€/mois, nom de société visible au lieu du nom perso ; (C) Lemon Squeezy merchant of record — 0€ création, 5% de frais, leur nom comme vendeur légal, aucune immatriculation. Décision à prendre avant les premières ventes réelles. | Décision |
| 1 | Remplir infos légales | Pages créées ✅. Il reste à remplir les `[À compléter]` : nom, adresse, SIRET dans `mentions-legales.html`, `cgv.html`, `politique-confidentialite.html`. À faire après décision #33. | 15 min |

---

### 🟠 Bloquants techniques production

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 2 | Webhook Stripe — secret ✅ | ~~Stripe Dashboard → Webhooks → signing secret → Render `STRIPE_WEBHOOK_SECRET`~~ — **Fait (18/05).** | — |
| 3 | Clés Stripe live | Stripe Dashboard → basculer en mode Live → copier `sk_live_...` et `pk_live_...` → mettre à jour Render + `js/stripe.js`. À faire le jour J uniquement, pas avant. | 30 min |
| 4 | Email post-achat — config Zimbra | Code Nodemailer prêt dans server.js ✅. Il reste : (1) attendre que formaelan.fr soit actif sur OVH ; (2) configurer `contact@formaelan.fr` via Zimbra Starter OVH ; (3) ajouter `GMAIL_USER=contact@formaelan.fr` + `GMAIL_APP_PASSWORD=xxx` dans Render Environment. Zimbra utilise SMTP Gmail-compatible. | 30 min |
| 25 | Rate limiting `/create-checkout-session` | Sans protection, un bot peut spammer des centaines de sessions Checkout → coûts Stripe + alertes fraude. Ajouter `express-rate-limit` : max 5 requêtes/min par IP. Npm, zéro dépendance tierce. | 30 min |
| 32 | Waiver droit de rétractation | Les CGV stipulent l'exclusion du droit de rétractation, mais aucun mécanisme ne collecte l'accord explicite. Ajouter une case à cocher avant le redirect Stripe : "J'accepte que l'accès débute immédiatement et renonce à mon droit de rétractation". | ~1h |
| 26 | Render : tokens éphémères | `access-tokens.json` effacé à chaque restart Render (spin-down ~15 min inactivité). Atténuation : fallback Stripe dans `/get-access` régénère le token via `session_id` → dépendance à l'email #4 (l'acheteur doit avoir son URL). Solution propre : Render Disk ($7/mois) ou SQLite. À décider avant 1ère vente réelle. | ~1h |

---

### 🟢 Domaine + migration (EN COURS)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 15 | Acheter formaelan.fr ✅ | ~~OVH~~ — **Fait (18/05)** : 5,99€ TTC, 1 an, Zimbra Starter inclus. Installation en cours sur OVH. | — |
| 16 | Configurer DNS GitHub Pages | Attendre que formaelan.fr soit actif sur OVH (statut "Actif"). Puis dans OVH Zone DNS : ajouter 4 enregistrements A pointant vers GitHub Pages IPs + CNAME `www`. Dans GitHub repo Settings → Pages → Custom domain → `formaelan.fr`. HTTPS automatique (Let's Encrypt, ~24h). | ~30 min |
| 17 | Mettre à jour SITE_URL sur Render | Après DNS propagé : changer `SITE_URL=https://formaelan.fr` dans Render Environment. Tester tunnel complet sur le vrai domaine. | 15 min |
| 18 | Configurer email contact@formaelan.fr | OVH → Zimbra Starter → créer compte `contact@formaelan.fr`. Récupérer les paramètres SMTP. Mettre à jour Render : `GMAIL_USER=contact@formaelan.fr` + `GMAIL_APP_PASSWORD`. Remplacer `multimind.team@gmail.com` dans server.js et les pages HTML. | 45 min |
| 31 | Sitemap.xml | Créer un sitemap listant les 5 pages de vente + index. Soumettre dans Google Search Console après migration formaelan.fr. | 15 min |

---

### 🟡 Problèmes visuels / contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 6 | Image OG manquante | Créer `og-cover.jpg` (1200×630px). Sans elle, aucun aperçu visuel sur LinkedIn/Facebook/Twitter. Impact direct sur l'acquisition. | ~1h |
| 27 | Favicon manquant | Aucun favicon ni `<link rel="icon">`. Onglets vides + erreur 404 silencieuse. Créer SVG ou ICO 32×32 à partir du logo ⚡. | 15 min |
| 28 | Page 404 custom | GitHub Pages affiche une 404 générique. Créer `404.html` branded. | 30 min |
| 7 | Supprimer formations/seo-saas.html | Ancienne version monolithique obsolète. Risque doublon contenu indexé par Google. | 5 min |
| 8 | formation-template.html public | `pages/formation-template.html` accessible publiquement. Supprimer ou noindex. | 10 min |
| 24 | Refonte graphique globale | Animations scroll hero, micro-interactions, transitions sections. Flip cards 3D ✅ fait (18/05). | ~4h |

---

### 🔵 Accès et protection du contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 9 | Chapitres accessibles sans paiement | HTML chapitres publics — URL directe suffit. Acceptable Phase 1 (obscurité). Solution Phase 2 : token dans URL ou vérification côté serveur. | Phase 2 |
| 10 | Certificat de réussite | Promis dans pages de vente mais aucun mécanisme. Pour Phase 1 : conditionner à "bientôt disponible" ou retirer. | Décision |
| 11 | robots.txt | Sans robots.txt, Google indexe les chapitres (contenu payant public). Ajouter noindex sur `formations/`. | 15 min |

---

### 🔵 Qualité et tests

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 12 | Tests mobile | Tunnel complet sur téléphone : page de vente → Stripe → success.html → chapitre. | ~1h |
| 13 | Contrôle qualité formations | Lancer `/auditer_formation` sur les 5 formations. | ~2h |
| 14 | Analytics | Plausible ou Umami (RGPD, léger). Sans analytics impossible de savoir d'où viennent les visiteurs. | ~1h |
| 29 | Monitoring Render (UptimeRobot) | Ping /health toutes les 5 min, alerte email si panne. Gratuit, 5 min d'inscription. | 15 min |
| 30 | Test Safari / cross-browser | Flip cards : tester `backface-visibility` sur Safari iOS/macOS. | 30 min |

---

### 🟣 Acquisition (après domaine actif)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 19 | SEO on-page final | Balises meta, OG tags, schema Course. À faire après migration formaelan.fr. | ~2h |
| 20 | LinkedIn personnel | Post de valeur (astuce concrète) avec mention naturelle. Pas un post "j'ai lancé". | ~1h |
| 21 | Groupes Facebook/Discord | 5 groupes actifs (freelance FR, SEO France, IA francophone). Valeur d'abord, formation ensuite. | Continu |
| 22 | Product Hunt | Description, visuels, tagline. Génère 200-500 visites en 24h. | ~2h |
| 23 | Première vente réelle | — | Objectif |

---

### ❌ Hors scope Phase 1

- SEO organique (3-6 mois) — Phase 2 après formaelan.fr
- Analyse SEO approfondie — inutile tant que le site est sur GitHub Pages
- Pub payante — trop tôt sans conversion prouvée
- Twitter / Instagram — audience trop longue à construire
- Système de compte utilisateur / espace membre — Phase 2

---
