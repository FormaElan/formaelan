# FormaElan — Instructions Claude Code

## Vision
Plateforme de vente de formations en ligne (SEO · IA · Copywriting).
**Phase actuelle : Phase 1 — Lancement MVP** (Phase 0 complète, 6 formations en ligne)

---

## Structure du projet

```
FormaElan/
├── backend/            (server.js, .env)
├── css/                (style.css, formations.css)
├── formations/         (1 répertoire par formation, 1 HTML par chapitre)
├── js/                 (main.js, stripe.js)
├── pages/              (pages de vente)
├── .claude/commands/   (skills Claude Code)
└── index.html, success.html, cancel.html
```

---

## Formations — état

| # | Slug | Prix | Statut | Dernière MAJ |
|---|---|---|---|---|
| 1 | `seo-saas` | 49€ | ✅ 8 ch. + 17 SVGs | 13/05/2026 |
| 2 | `ia-freelance` | 49€ | ✅ 9 ch. | 13/05/2026 |
| 3 | `copywriting-ecom` | 29€ | ✅ 7 ch. | 13/05/2026 |
| 4 | `seo-ecom` | 39€ | ✅ 8 ch. + 16 SVGs | 13/05/2026 |
| 5 | `optimiser-ia` | 39€ | ✅ 7 ch. + audit IA | 13/05/2026 |
| 6 | `seo-createurs` | 49€ | ✅ 8 ch. + audit IA + 8 SVGs | 20/05/2026 |

---

## Conventions formations (non-négociables)

- 1 répertoire par formation : `formations/<slug>/`
- 1 fichier HTML par chapitre : `chN-<titre-kebab>.html`
- CSS externe uniquement : `../../css/formations.css` — jamais de `<style>` inline
- Zéro `<script>` dans les fichiers chapitre
- Sidebar : classe `active` hardcodée sur le chapitre courant
- Navigation : liens par filename (`ch2-xxx.html`), jamais d'ancres (`#ch2`)
- Éléments obligatoires par chapitre : en-tête · intro · 1+ SVG inline · 2+ sections · keybox · nav bas de page

---

## Voix & Ton

- Ton : expert, humain, direct — pas enthousiaste par défaut, pas robotique
- Registre : professionnel sans être froid — adulte intelligent
- Rythme : phrases courtes et moyennes alternées
- Éviter : jargon creux, superlatifs non justifiés, promesses floues

### Structure page de vente
1. Accroche — le problème réel (1-2 phrases)
2. Promesse — ce que l'apprenant saura faire (concret, vérifiable)
3. Programme — modules et logique de progression
4. Preuves — méthode, outils, exemples réels (jamais inventés)
5. Pour qui — profil idéal + pour qui ce n'est pas fait
6. Certificat — valeur du certificat de réussite
7. CTA — appel à l'action clair, sans pression artificielle

---

## Éthique (non négociable)

- ❌ Faux témoignages ou témoignages inventés
- ❌ Faux chiffres (clients, taux de réussite non vérifiés)
- ❌ Promesses de résultats rapides ou magiques
- ❌ Garanties non vérifiables
- ✅ Valeur réelle, preuves concrètes, claims vérifiables
- ✅ Certificat de réussite = seul élément de prestige (70% + tous modules complétés)

---

## Stack technique

- HTML5 sémantique (`<main>`, `<section>`) — jamais de div soup
- CSS pur : variables CSS uniquement, jamais de valeurs hardcodées
- JS vanilla — pas de jQuery, pas de dépendances inutiles
- Backend : Node/Express pour Stripe uniquement — jamais de clé secrète côté client
- Images : WebP, `width`/`height` obligatoires, `loading="lazy"` sauf hero
- Accessibilité : contraste WCAG AA, `alt` sur images, focus visible

---

## Design

- Orange rare : 1 seul point d'ancrage par écran, jamais saupoudré
- Palette : `#0D1B3E` navy · `#1A9E8F` teal · `#F26C3A` orange · `#F7F8FA` fond clair
- Typo : Syne (titres) · DM Sans (corps) · JetBrains Mono (code)
- Espace négatif généreux — cohérence inter-pages stricte

---

## Skills disponibles

| Commande | Usage |
|---|---|
| `/creer_chapitre` | Générer un chapitre HTML complet |
| `/auditer_formation` | Contrôler la conformité d'une formation (navigation, SVGs, liens...) |
| `/tester_stripe` | Vérifier le tunnel de paiement Stripe |
| `/optimiser` | Auditer et optimiser tokens / contextes IA |
| `/roadmap` | Liste des travaux Phase 1 |
| `/sauvegarde` | Commit + push GitHub en fin de session |

---

## Dépôt GitHub

`https://github.com/FormaElan/formaelan` (public)
