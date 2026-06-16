# FormaElan — Contexte Court

Lire d'abord `../CONTEXTE_SESSION.md`.

## État actif
- Site : GitHub Pages `https://formaelan.fr`.
- Backend : Render `https://formaelan.onrender.com`.
- Phase : lancement MVP avant Stripe live.
- 6 formations : `seo-saas`, `ia-freelance`, `copywriting-ecom`, `seo-ecom`, `optimiser-ia`, `seo-createurs`.

## Accès formations
- Contenu payant : `_private/formations/<slug>/chN-xxx.html`.
- Ne pas recréer `formations/` pour les chapitres payants.
- Route backend protégée : `/formation/:slug/:chapter`.
- `success.html` doit utiliser `data.accessUrl` depuis `/get-access`.
- `/health` doit afficher `protectedContent:true`.

## Backend
- Fichier principal : `backend/server.js`.
- Stripe Checkout : `/create-checkout-session`.
- Webhook : `/webhook`.
- Accès : `/get-access`.
- Renvoi client : `/admin/resend-access`, protégé par `ACCESS_ADMIN_SECRET`.
- Certificat : `/send-certificate`.

## Conventions
- HTML/CSS/JS vanilla.
- CSS site : `css/style.css`.
- CSS chapitres : `css/formations.css`.
- Pas de clé secrète côté client.
- Pas de faux témoignages, faux chiffres ou promesses irréalistes.

## À lire selon besoin
- Roadmap : `.claude/commands/roadmap.md`.
- Données formations : `js/formations.js`.
- Paiement front : `js/stripe.js`.
- Post-paiement : `success.html`.
