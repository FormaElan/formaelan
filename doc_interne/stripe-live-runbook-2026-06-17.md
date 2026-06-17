# Runbook Stripe Live - FormaElan

Date: 2026-06-17

## Etat actuel

- Site production a jour: `https://formaelan.fr/`
- Backend Render: `https://formaelan.onrender.com`
- Ancienne URL publique `/formations/...`: doit rester en 404
- Page interne `projet_FormaElan.html`: doit rester en 404
- Backend `/health`: expose maintenant des voyants de configuration sans secret

## Valeurs a recuperer

Depuis Stripe Live:

- `sk_live_...`
- `whsec_...` du webhook live
- 6 Price IDs live:
  - `PRICE_SEO_SAAS`
  - `PRICE_IA_FREELANCE`
  - `PRICE_COPYWRITING_ECOM`
  - `PRICE_SEO_ECOM`
  - `PRICE_OPTIMISER_IA`
  - `PRICE_SEO_CREATEURS`

Depuis Render:

- Ajouter/remplacer les variables ci-dessus dans Environment
- Ajouter `ACCESS_ADMIN_SECRET`
- Verifier `SITE_URL=https://formaelan.fr`
- Conserver `RESEND_API_KEY`
- Ajouter Upstash Redis si disponible pour persister les tokens d'acces

## Ordre de bascule

1. Creer les produits/prix Stripe Live.
2. Creer le webhook Stripe Live vers:
   `https://formaelan.onrender.com/webhook`
3. Evenements webhook minimum:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Mettre les variables live dans Render.
5. Redeployer Render.
6. Verifier:
   `https://formaelan.onrender.com/health`
7. Faire un achat live reel a faible montant si possible.
8. Verifier:
   - redirection Stripe
   - retour `success.html`
   - lien chapitre protege
   - email d'acces
   - quiz
   - certificat email

## DNS email

Controle DNS du 2026-06-17:

- SPF detecte: `v=spf1 include:mx.ovh.com ~all`
- DMARC detecte: `v=DMARC1; p=none;`
- CNAME DKIM Resend `resend._domainkey`, `resend2._domainkey`, `resend3._domainkey`: non detectes au moment du controle

Action: verifier le domaine dans le dashboard Resend et ajouter les DNS exacts demandes par Resend avant d'envoyer en volume.

## Blocants restants non techniques

- SIRET
- adresse editeur
- statut TVA / franchise
- validation finale mentions legales et CGV
