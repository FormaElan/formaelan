# FormaElan — Instructions Claude Code

## Rôle
Tu travailles sur **FormaElan**, une plateforme de vente de formations en ligne (SEO · IA · Copywriting).
L'interlocuteur unique est **Agent_CEO**. Ne propose jamais d'action non demandée.

---

## Stack technique

- **Frontend** : HTML, CSS, JS pur (data-driven) — jamais de framework
- **Backend** : Node/Express + Stripe (server.js, webhook, PRICE_MAP)
- **Accès formations** : token post-paiement Stripe (à implémenter)

---

## Design system

| Élément | Valeur |
|---|---|
| Bleu marine | `#0D1B3E` |
| Teal | `#1A9E8F` |
| Orange | `#F26C3A` |
| Typographie display | Syne |
| Typographie body | DM Sans |
| CSS site principal | `css/style.css` |
| CSS formations | `css/formations.css` |

---

## Architecture formations — conventions STRICTES

```
formations/<slug>/
├── ch1-<titre-kebab>.html
├── ch2-<titre-kebab>.html
└── ...
```

**Règles absolues (ne jamais déroger) :**
- 1 répertoire par formation : `formations/<slug>/`
- 1 fichier HTML par chapitre : `chN-<titre-kebab>.html`
- CSS uniquement via `<link>` externe : `../../css/formations.css` — zéro `<style>` inline
- **Zéro `<script>`** dans les fichiers chapitre
- Sidebar : classe `active` hardcodée sur le chapitre courant — pas d'IntersectionObserver
- Navigation : liens vers filenames (`ch2-xxx.html`) — jamais d'ancres (`#ch2`)
- Chemin accueil : `../../index.html` · Page vente : `../../pages/<slug>.html`

**Éléments obligatoires par chapitre :**
en-tête · intro · au moins 1 SVG inline · 2+ sections · keybox · navigation bas de page

---

## Formations — état actuel

| # | Slug | Statut | Chapitres |
|---|---|---|---|
| 1 | `seo-saas` | ✅ Complet | 8 ch. + 17 SVGs |
| 2 | `ia-freelance` | ✅ Complet | 9 ch. |
| 3 | `copywriting-ecom` | ✅ Complet | 7 ch. |
| 4 | `seo-ecom` | 🔲 À créer | 8 ch. planifiés |

**Formation bonus** : "Optimiser son IA" — 29€ — structure + production HTML à faire (Phase 0)

---

## Éthique éditoriale — règles non négociables

- Aucune promesse de revenus garantis ("gagnez X€ en 30 jours" interdit)
- Les chiffres doivent être sourcés ou accompagnés de "indicatif" / "variable selon"
- Ton honnête et nuancé sur les résultats attendus
- Tutoiement cohérent dans l'intégralité de chaque formation
- Certificat de réussite = seul élément de prestige validé

---

## Équipe agents FormaElan

| Agent | Rôle |
|---|---|
| Agent_CEO | Orchestration — seul interlocuteur utilisateur |
| Agent_Visuel | Design system, charte graphique |
| Agent_Editorial | Contenu, copywriting éthique |
| Agent_Tech | HTML/CSS/JS, performance, stack |
| Agent_Formation | Structure pédagogique, modules |

---

## Skill de référence

Skill `creer-formation` v2.0 : `C:\Users\user\.claude\plugins\formaelan\skills\creer-formation\`
Toujours utiliser ce skill pour créer ou modifier une formation.

---

## Skills disponibles

| Commande | Usage |
|---|---|
| `/menu` | Menu de démarrage complet |
| `/creer-formation` | Produire un chapitre HTML (conventions strictes) |
| `/agent-formation` | Structure pédagogique uniquement |
| `/agent-tech` | HTML/CSS/JS, backend |
| `/agent-editorial` | Copywriting, pages de vente |
| `/agent-visuel` | Design, composants UI |

---

## Priorités Phase 0 (en cours)

1. 🔲 Formation SEO E-commerce — 8 chapitres HTML
2. 🔲 Formation "Optimiser son IA" — 29€
3. 🔲 Système d'accès par token post-Stripe
4. 🔲 Page de couverture HTML — formation SEO SaaS
