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
- Tunnel paiement validé — CORS, URL chapitre, boutons hero câblés Stripe (18/05)
- Warm-up ping — réveille Render dès le chargement de chaque page de vente (18/05)

---

### 🔴 Bloquants légaux (avant toute vente réelle)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 1 | Pages légales | Créer 4 pages : Mentions légales (nom, adresse, SIRET), CGV (droit de rétractation 14j, modalités d'accès), Politique de confidentialité (RGPD, données collectées par Stripe), Contact. Mettre à jour tous les `href="#"` dans les footers. | ~3h |

---

### 🟠 Bloquants techniques production

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 2 | Webhook Stripe — secret | Dans Stripe Dashboard → Webhooks → copier le signing secret → l'ajouter dans Render Environment Variables (`STRIPE_WEBHOOK_SECRET`). Sans ça, n'importe qui peut forger un faux événement de paiement. | 15 min |
| 3 | Clés Stripe live | Stripe Dashboard → basculer en mode Live → copier `sk_live_...` et `pk_live_...` → mettre à jour Render + `js/stripe.js`. À faire le jour J uniquement, pas avant. | 30 min |
| 4 | Email post-achat (Resend) | Créer un compte Resend (gratuit 300 emails/jour) → ajouter la dépendance au backend → dans le webhook `checkout.session.completed`, envoyer un email avec le lien d'accès direct (`success.html?session_id=xxx`). Sans ça, un acheteur qui ferme la page sans noter son token perd définitivement son accès. | ~2h |
| 5 | Email cancel.html incorrect | `contact@formaElan.fr` est hardcodé dans cancel.html mais cette adresse n'existe pas encore. Remplacer par `multimind.team@gmail.com` en attendant le domaine. | 5 min |

---

### 🟡 Problèmes visuels / contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 6 | Image OG manquante | Créer le dossier `img/` et une image `og-cover.jpg` (1200×630px). Sans elle, aucun aperçu visuel sur LinkedIn/Facebook/Twitter quand une page est partagée. Impact direct sur l'acquisition. | ~1h |
| 7 | Supprimer formations/seo-saas.html | Ancienne version monolithique de la formation, obsolète. Risque d'être indexée par Google comme doublon du contenu payant. | 5 min |
| 8 | formation-template.html public | `pages/formation-template.html` est accessible publiquement sur GitHub Pages. Page vide/technique qui ne devrait pas être visible. Soit la supprimer, soit la mettre en noindex. | 10 min |
| 24 | Refonte graphique globale | Moderniser l'ensemble du site au-delà des cartes formations : animations scroll sur le hero, micro-interactions sur les features, transitions de sections fluides, visuels plus attractifs. Objectif : site visuellement compétitif face aux plateformes type Udemy. Flip cards formations (3D néon) : ✅ fait (18/05). | ~4h |

---

### 🔵 Accès et protection du contenu

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 9 | Chapitres accessibles sans paiement | Les fichiers HTML des chapitres sont publics — n'importe qui connaissant l'URL y accède sans payer. Pour Phase 1 MVP c'est acceptable (obscurité comme protection), mais à documenter comme dette technique. Solution future : vérification token côté serveur ou accès via URL signée. | À planifier Phase 2 |
| 10 | Suivi de progression / certificat | "Certificat de réussite" promis dans les pages de vente (70% + tous modules) mais aucun mécanisme de suivi n'existe. À construire en Phase 2. Pour Phase 1 : retirer la mention du certificat des pages de vente ou la conditionner à "bientôt disponible". | Décision à prendre |
| 11 | robots.txt | Sans robots.txt, Google peut indexer les chapitres de formation (contenu payant rendu public). Ajouter un robots.txt qui noindex `formations/`. | 15 min |

---

### 🔵 Qualité et tests

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 12 | Tests mobile | Tester le tunnel complet (page de vente → Stripe → success.html → chapitre) sur téléphone. Vérifier la lisibilité des pages de vente et des chapitres. | ~1h |
| 13 | Contrôle qualité formations | Lancer `/auditer_formation` sur les 5 formations — navigation, SVGs, liens internes, conformité CSS. | ~2h |
| 14 | Analytics | Ajouter Plausible ou Umami (léger, RGPD, gratuit en self-host ou ~9€/mois Plausible cloud). Sans analytics, impossible de savoir d'où viennent les visiteurs ni quelle page de vente convertit. | ~1h |

---

### 🟢 Domaine + migration (déblocage SEO et crédibilité)

> Prérequis : tâches 1, 2, 4, 5 terminées avant d'acheter.

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 15 | Acheter formaelan.fr | OVH (~0.99€ 1ère année puis ~6.99€/an). Pas de .fr gratuit possible (réglementé AFNIC). | 15 min |
| 16 | Configurer DNS GitHub Pages | Dans OVH : ajouter les 4 enregistrements A de GitHub Pages + CNAME `www`. Dans GitHub repo Settings → Pages → Custom domain → `formaelan.fr`. HTTPS automatique (Let's Encrypt). | ~30 min |
| 17 | Mettre à jour SITE_URL sur Render | Changer `SITE_URL=https://formaelan.fr` dans Render Environment. Tester le tunnel complet sur le vrai domaine. | 15 min |
| 18 | Mettre à jour l'email contact | Créer `contact@formaelan.fr` (inclus avec OVH) et remplacer `multimind.team@gmail.com` partout dans le site. | 30 min |

---

### 🟣 Acquisition (après domaine)

| # | Tâche | Détail | Effort |
|---|---|---|---|
| 19 | SEO on-page | Balises meta, OG tags corrects, schema Course sur pages de vente. À faire après migration sur formaelan.fr uniquement. | ~2h |
| 20 | LinkedIn personnel | Rédiger un post de valeur (astuce SEO ou IA concrète) avec mention naturelle de la formation. Pas un post "j'ai lancé". | ~1h |
| 21 | Groupes Facebook/Discord | Identifier 5 groupes actifs (freelance FR, SEO France, IA francophone, copywriting, entrepreneurs web). Apporter de la valeur d'abord, mentionner la formation ensuite. | Continu |
| 22 | Product Hunt | Préparer le lancement : description, visuels, tagline. Génère 200-500 visites en 24h et crédibilise le projet. | ~2h |
| 23 | Première vente réelle | — | Objectif |

---

### ❌ Hors scope Phase 1

- SEO organique (3-6 mois) — Phase 2 après formaelan.fr
- Analyse SEO approfondie — inutile tant que le site est sur GitHub Pages
- Pub payante — trop tôt sans conversion prouvée
- Twitter / Instagram — audience trop longue à construire
- Système de compte utilisateur / espace membre — Phase 2

---
