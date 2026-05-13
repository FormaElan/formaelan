Génère un chapitre HTML complet au format FormaElan.

Architecture : `FormaElan/formations/<slug>/chN-<titre>.html` · CSS externe `../../css/formations.css` · zéro `<script>` · sidebar active hardcodée · navigation par filenames.

Si le slug et le titre du chapitre ne sont pas précisés, les demander avant de commencer.

## Processus

1. **Collecter** — si manquants, demander : slug de la formation, titre du chapitre, liste des sections
2. **Lire le dossier** — Glob `FormaElan/formations/<slug>/ch*.html` pour récupérer tous les fichiers existants et déduire automatiquement le numéro du chapitre (N = nombre de fichiers existants + 1). Lire la sidebar d'un chapitre existant pour extraire les titres et filenames exacts de tous les chapitres. Si le dossier est vide (nouvelle formation), demander la liste complète des chapitres prévus.
3. **Planifier** — sections, SVGs nécessaires, tableaux de données
4. **Générer** — fichier HTML dans `C:\Projet_MultiMind\FormaElan\formations\<slug>\chN-<titre>.html`
5. **Valider** — CSS externe ✓ · aucun `<style>` inline ✓ · aucun `<script>` ✓ · sidebar active hardcodée ✓ · nav prev/next correcte ✓

## Structure du fichier

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Titre chapitre] — [Titre formation] | FormaElan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../../css/formations.css">
</head>
<body>

<nav class="r-nav">
  <a href="../../index.html" class="r-nav-logo"><span>Forma</span>Elan</a>
  <div class="r-breadcrumb">
    <a href="../../index.html">Accueil</a> /
    <a href="../../pages/<slug>.html">[Titre formation court]</a> /
    <span>Chapitre N</span>
  </div>
</nav>

<div class="r-layout">

  <aside class="r-sidebar">
    <div class="r-sidebar-title">Sommaire</div>
    <!-- Tous les chapitres — classe "active" hardcodée sur le chapitre courant -->
    <a href="ch1-<slug>.html" class="r-ch-link [active]">
      <div class="r-ch-num">1</div>[Titre court ch1]
    </a>
    <div class="r-sidebar-sep"></div>
    <a href="../../pages/<slug>.html" class="r-ch-link" style="font-size:.78rem;color:var(--muted)">← Page de la formation</a>
  </aside>

  <main class="r-main">
    <section class="r-chapter" id="chN">

      <div class="r-ch-header">
        <div class="r-ch-badge">N</div>
        <div class="r-ch-meta">
          <div class="num">Chapitre N</div>
          <h2>[Titre 3-5 mots]</h2>
          <div class="dur">⏱ XX min · Y leçons</div>
        </div>
      </div>

      <div class="r-intro">
        [2-3 phrases : enjeu pédagogique + ce que l'apprenant va maîtriser]
      </div>

      <!-- SVG principal (OBLIGATOIRE — au moins 1 par chapitre) -->
      <div class="r-svg-wrap">
        <svg viewBox="0 0 640 [hauteur]" role="img" aria-label="[description]">
          <!-- SVG inline -->
        </svg>
        <div class="r-svg-caption">Figure N.1 — [Légende]</div>
      </div>

      <!-- Sections de contenu (2-3 minimum) -->
      <h3 class="r-section-title">N.1 — [Titre action]</h3>
      <p class="r-text">[Prose 2-3 phrases]</p>
      <ul class="r-list">
        <li><strong>[Point clé] :</strong> [Explication concise]</li>
      </ul>

      <!-- Points clés (OBLIGATOIRE) -->
      <div class="r-keybox">
        <div class="r-keybox-title">Points clés — Chapitre N</div>
        <ul>
          <li>[Règle actionnable 1]</li>
          <li>[Règle actionnable 2]</li>
          <li>[Règle actionnable 3]</li>
          <li>[Règle actionnable 4]</li>
        </ul>
      </div>

      <!-- Navigation (OBLIGATOIRE sur tous les chapitres) -->
      <div class="r-ch-nav">
        <!-- Premier chapitre : <span></span> à la place du lien précédent -->
        <a href="ch[N-1]-<slug>.html">
          <div>
            <span class="ch-label">Chapitre précédent</span>
            <span class="ch-name">[Titre ch N-1]</span>
          </div>
        </a>
        <!-- Dernier chapitre : pointe vers pages/<slug>.html avec label "Fin de la formation" -->
        <a href="ch[N+1]-<slug>.html" class="next">
          <div>
            <span class="ch-label">Chapitre suivant</span>
            <span class="ch-name">[Titre ch N+1]</span>
          </div>
        </a>
      </div>

    </section>
  </main>
</div>
</body>
</html>
```

## Règles absolues

- **CSS externe uniquement** — `../../css/formations.css` — jamais de `<style>` dans le HTML
- **Zéro `<script>`** dans les chapitres
- **Sidebar** : tous les chapitres listés, classe `active` hardcodée sur le chapitre courant
- **Navigation** : liens prev/next par filename (pas d'ancres `#`)
- **SVGs** : inline dans le HTML, `role="img"`, `aria-label`
- **Éthique** : zéro promesse magique, zéro chiffre inventé, claims vérifiables uniquement
