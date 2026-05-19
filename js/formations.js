// ============================================================
//  FormaElan — Données complètes des formations
//  Pour ajouter une formation : duplique un objet, change le slug.
// ============================================================

const FORMATIONS = [

  // ──────────────────────────────────────────────────────────
  //  1. SEO POUR SAAS
  // ──────────────────────────────────────────────────────────
  {
    id: "seo-saas",
    slug: "seo-saas",
    titre: "SEO pour SaaS",
    sousTitre: "Domine Google et attire des clients B2B en automatique",
    description: "Apprends les stratégies SEO spécifiques aux SaaS : keyword research orienté intent, content clusters, link building B2B et optimisation technique pour des produits en croissance.",
    icon: "🚀",
    categorie: "SEO",
    niveau: "Intermédiaire",
    duree: "6h30",
    modules: 8,
    etudiants: 1240,
    note: 4.9,
    avis: 312,
    prix: 49,
    prixAncien: 97,
    badge: "bestseller",
    couleur: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2))",
    couleurGlow: "rgba(99,102,241,0.5)",

    formateur: {
      nom: "L'équipe FormaElan",
      role: "Praticiens actifs · Formateurs",
      bio: "Cette formation est créée par des praticiens qui appliquent ces méthodes au quotidien. Chaque module est construit à partir d'expériences terrain concrètes, pas de théorie creuse.",
      avatar: "FE",
      stats: [
        { val: "5",    label: "formations disponibles" },
        { val: "100%", label: "méthodes testées en conditions réelles" },
        { val: "2026", label: "contenu à jour" }
      ]
    },

    avantApres: [
      { avant: "Ton blog reçoit 200 visites/mois sans conversions", apres: "Un flux constant de leads qualifiés depuis Google" },
      { avant: "Tu ne sais pas sur quels mots-clés te positionner", apres: "Une roadmap SEO claire avec des opportunités priorisées" },
      { avant: "Tu publies du contenu sans stratégie", apres: "Un système de content clusters qui s'auto-renforce" },
      { avant: "Ton CAC pub monte, ton organique stagne", apres: "SEO = canal d'acquisition prévisible et rentable" }
    ],

    programme: [
      {
        titre: "Fondamentaux SEO pour SaaS",
        duree: "45 min",
        lecons: [
          "Différences SEO SaaS vs SEO classique",
          "Comprendre le funnel d'acquisition organique",
          "Métriques SEO qui comptent vraiment pour un SaaS"
        ]
      },
      {
        titre: "Recherche de mots-clés intent-driven",
        duree: "55 min",
        lecons: [
          "Identifier les mots-clés à forte intention d'achat",
          "Competitor gap analysis avec Semrush / Ahrefs",
          "Cartographier les keywords sur le funnel TOFU/MOFU/BOFU"
        ]
      },
      {
        titre: "Architecture de contenu & Content Clusters",
        duree: "50 min",
        lecons: [
          "Créer des clusters thématiques efficaces",
          "Pages piliers vs pages satellites",
          "Maillage interne stratégique"
        ]
      },
      {
        titre: "SEO technique pour SaaS",
        duree: "45 min",
        lecons: [
          "Core Web Vitals & performance",
          "Gestion des pages /app (no-index, canonical)",
          "Structured data pour les logiciels"
        ]
      },
      {
        titre: "Link Building B2B",
        duree: "60 min",
        lecons: [
          "Stratégie de guest posting B2B",
          "Digital PR et relations presse tech",
          "Obtenir des backlinks via intégrations et partenaires"
        ]
      },
      {
        titre: "Contenu SEO qui convertit",
        duree: "50 min",
        lecons: [
          "Rédiger pour Google ET pour les ICP",
          "Landing pages SEO haute conversion",
          "Cas pratiques : blog, comparatifs, alternatives"
        ]
      },
      {
        titre: "Mesure & Reporting SEO",
        duree: "40 min",
        lecons: [
          "Setup Google Search Console avancé",
          "Tableaux de bord Data Studio",
          "Prioriser les actions avec impact SEO/effort"
        ]
      },
      {
        titre: "Automatisation & IA au service du SEO",
        duree: "45 min",
        lecons: [
          "Générateurs de briefs avec GPT-4",
          "Détection d'opportunités SEO automatisée",
          "Workflows n8n / Make pour le SEO"
        ]
      }
    ],

    objectifs: [
      "Créer une stratégie SEO adaptée aux SaaS",
      "Ranker sur des mots-clés à forte intention d'achat",
      "Construire un système de content clusters efficace",
      "Générer des backlinks B2B de qualité",
      "Mesurer le ROI de tes actions SEO",
      "Automatiser une partie de ta production SEO"
    ],

    pourQui: [
      "Fondateurs de SaaS voulant réduire leur CAC",
      "Growth marketers en charge de l'acquisition SEO",
      "Content managers dans des équipes SaaS",
      "Freelances SEO spécialisés B2B/SaaS"
    ],

    prerequis: "Connaître les bases du SEO (on-page, technique). Avoir accès à un outil SEO (Semrush, Ahrefs ou Ubersuggest).",

    ressources: [
      "Template de keyword research SaaS (Google Sheets)",
      "Checklist SEO technique pour SaaS",
      "50 idées de content clusters par verticale",
      "Scripts de prospection link building B2B",
      "Dashboard Data Studio SEO prêt à l'emploi",
      "🤖 Prompt d'audit IA — 40 points vérifiés sur ton SaaS"
    ],

    bonus: [
      "🤖 Audit IA inclus — fais vérifier les 40 points de la formation sur ton SaaS"
    ],

    faq: [
      {
        q: "La formation convient-elle à un SaaS en phase early-stage ?",
        r: "Oui, un module entier est dédié aux priorités SEO selon le stade de croissance. Early-stage = stratégie différente d'un SaaS à 1M ARR."
      },
      {
        q: "Faut-il un abonnement Semrush ou Ahrefs ?",
        r: "Non obligatoire. On montre les méthodes avec des outils gratuits (GSC, Ubersuggest). Les outils payants sont présentés en bonus."
      },
      {
        q: "En combien de temps voit-on des résultats ?",
        r: "Les premières améliorations techniques sont visibles en 2-4 semaines. Le contenu commence à ranker entre 2 et 6 mois selon la concurrence."
      },
      {
        q: "Y a-t-il un accès à vie ?",
        r: "Oui. Tu accèdes à la formation à vie, mises à jour comprises. Le SEO SaaS évolue — on met à jour tous les trimestres."
      },
    ],

    certif: true,
    stripeProductId: "prod_seo_saas_placeholder"
  },

  // ──────────────────────────────────────────────────────────
  //  2. IA POUR FREELANCE
  // ──────────────────────────────────────────────────────────
  {
    id: "ia-freelance",
    slug: "ia-freelance",
    titre: "IA pour Freelance",
    sousTitre: "Multiplie ta productivité × 5 et augmente tes tarifs",
    description: "Maîtrise les outils IA pour freelances : automatise les tâches répétitives, améliore la qualité de tes livrables, prospecte mieux et facture plus. De ChatGPT à Midjourney en passant par les automatisations no-code.",
    icon: "🤖",
    categorie: "Intelligence Artificielle",
    niveau: "Débutant à Intermédiaire",
    duree: "8h",
    modules: 9,
    etudiants: 2100,
    note: 4.8,
    avis: 487,
    prix: 49,
    prixAncien: 97,
    badge: "popular",
    couleur: "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(99,102,241,0.2))",
    couleurGlow: "rgba(34,211,238,0.5)",

    formateur: {
      nom: "L'équipe FormaElan",
      role: "Praticiens actifs · Formateurs",
      bio: "Cette formation est créée par des praticiens qui appliquent ces méthodes au quotidien. Chaque module est construit à partir d'expériences terrain concrètes, pas de théorie creuse.",
      avatar: "FE",
      stats: [
        { val: "5",    label: "formations disponibles" },
        { val: "100%", label: "méthodes testées en conditions réelles" },
        { val: "2026", label: "contenu à jour" }
      ]
    },

    avantApres: [
      { avant: "Tu passes 3h à rédiger un rapport client", apres: "Le même rapport en 30 min, de meilleure qualité" },
      { avant: "La prospection te prend 2h par semaine", apres: "Messages personnalisés générés et envoyés automatiquement" },
      { avant: "Tu n'oses pas augmenter tes tarifs", apres: "Tu proposes une offre 'IA-powered' qui justifie +40%" },
      { avant: "Tu travailles 50h/semaine pour joindre les deux bouts", apres: "35h/semaine avec plus de clients et de revenus" }
    ],

    programme: [
      {
        titre: "L'IA en 2026 — ce qui change pour les freelances",
        duree: "40 min",
        lecons: [
          "État des lieux des outils IA accessibles",
          "Ce que l'IA ne remplacera PAS (ton avantage)",
          "Choisir les bons outils selon son activité"
        ]
      },
      {
        titre: "Maîtriser ChatGPT & Claude",
        duree: "70 min",
        lecons: [
          "Prompt engineering pour des résultats professionnels",
          "Créer des Custom GPTs pour son activité",
          "Cas concrets : rédaction, code, analyse, stratégie"
        ]
      },
      {
        titre: "Automatiser sa prospection",
        duree: "55 min",
        lecons: [
          "IA pour rédiger des messages de prospection personnalisés",
          "Enrichissement automatique de leads",
          "Suivi automatisé sans CRM complexe"
        ]
      },
      {
        titre: "Livrer plus vite, livrer mieux",
        duree: "60 min",
        lecons: [
          "Créer des templates IA pour tes livrables récurrents",
          "Révision et amélioration de contenu avec l'IA",
          "Créer des SOP assistées par IA"
        ]
      },
      {
        titre: "IA pour la création visuelle",
        duree: "55 min",
        lecons: [
          "Midjourney & DALL-E pour tes projets clients",
          "Générer des maquettes et wireframes avec l'IA",
          "Créer du contenu visuel social media en masse"
        ]
      },
      {
        titre: "Automatisations no-code (Make / n8n)",
        duree: "65 min",
        lecons: [
          "Créer tes premiers workflows automatisés",
          "Connecter ton CRM, email, facturation",
          "Cas pratiques : onboarding client automatique"
        ]
      },
      {
        titre: "Positionner ton offre IA",
        duree: "45 min",
        lecons: [
          "Comment valoriser l'IA dans ton tarif",
          "Construire une offre 'IA-powered'",
          "Argumentaire pour convaincre tes clients"
        ]
      },
      {
        titre: "Développer un revenu passif avec l'IA",
        duree: "50 min",
        lecons: [
          "Vendre des templates, prompts, automatisations",
          "Créer un micro-SaaS avec l'IA",
          "Monétiser ton expertise IA"
        ]
      },
      {
        titre: "Veille & évolution — rester à la pointe",
        duree: "30 min",
        lecons: [
          "Sources de veille IA pour freelances",
          "Tester de nouveaux outils efficacement",
          "Construire sa communauté IA"
        ]
      }
    ],

    objectifs: [
      "Diviser par 3 le temps sur tes tâches répétitives",
      "Livrer des rendus de meilleure qualité, plus vite",
      "Automatiser ta prospection et ton onboarding",
      "Valoriser l'IA dans ton positionnement tarifaire",
      "Créer des revenus complémentaires grâce à l'IA",
      "Mettre en place une veille IA efficace"
    ],

    pourQui: [
      "Freelances tous métiers (rédaction, design, dev, conseil…)",
      "Consultants voulant optimiser leur temps",
      "Solopreneurs cherchant à scaler sans embaucher",
      "Salariés en reconversion vers le freelancing"
    ],

    prerequis: "Aucun prérequis technique. Avoir un compte ChatGPT suffit pour démarrer.",

    ressources: [
      "Pack de 200 prompts professionnels classés par métier",
      "Template Custom GPT prêt à personnaliser",
      "Workflow Make : onboarding client automatique",
      "Modèle de proposition tarifaire 'IA-powered'",
      "Liste de 50 outils IA par cas d'usage",
      "🤖 Prompt d'audit IA — 36 points vérifiés sur ton activité freelance"
    ],

    bonus: [
      "🤖 Audit IA inclus — vérifie ton stack et tes workflows sur les 9 modules"
    ],

    faq: [
      {
        q: "Je ne suis pas du tout technique — cette formation est-elle pour moi ?",
        r: "Absolument. Tout est expliqué pas à pas, sans jargon. Si tu sais utiliser WhatsApp, tu sauras utiliser ChatGPT après ce module."
      },
      {
        q: "Les outils IA ne vont-ils pas remplacer les freelances ?",
        r: "Non — mais les freelances qui utilisent l'IA vont remplacer ceux qui ne l'utilisent pas. C'est exactement ce que cette formation t'enseigne : rester irremplaçable."
      },
      {
        q: "Est-ce que ça marche pour mon métier spécifique ?",
        r: "Oui. La formation couvre rédaction, design, développement, conseil, marketing, comptabilité freelance et plus. Les cas pratiques s'adaptent à ton activité."
      },
      {
        q: "Les outils changent vite — la formation sera-t-elle obsolète ?",
        r: "On met à jour le contenu tous les trimestres. Tu accèdes toujours à la version la plus récente, sans frais supplémentaires."
      },
      {
        q: "Combien coûtent les outils IA nécessaires ?",
        r: "La plupart des outils présentés ont une version gratuite. L'investissement optionnel pour les outils payants (ChatGPT Plus, Make…) est de 20-50 €/mois max."
      }
    ],

    certif: true,
    stripeProductId: "prod_ia_freelance_placeholder"
  },

  // ──────────────────────────────────────────────────────────
  //  3. COPYWRITING E-COMMERCE
  // ──────────────────────────────────────────────────────────
  {
    id: "copywriting-ecom",
    slug: "copywriting-ecom",
    titre: "Copywriting E-commerce",
    sousTitre: "Des mots qui vendent — booste tes conversions dès demain",
    description: "Techniques de copywriting éprouvées pour l'e-commerce : fiches produits qui convertissent, emails de vente, landing pages, publicités Meta/Google et abandoned cart. Du psychologique au pratique.",
    icon: "✍️",
    categorie: "Copywriting",
    niveau: "Débutant à Avancé",
    duree: "7h",
    modules: 7,
    etudiants: 1850,
    note: 4.9,
    avis: 421,
    prix: 29,
    prixAncien: 59,
    badge: "new",
    couleur: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(239,68,68,0.2))",
    couleurGlow: "rgba(245,158,11,0.5)",

    formateur: {
      nom: "L'équipe FormaElan",
      role: "Praticiens actifs · Formateurs",
      bio: "Cette formation est créée par des praticiens qui appliquent ces méthodes au quotidien. Chaque module est construit à partir d'expériences terrain concrètes, pas de théorie creuse.",
      avatar: "FE",
      stats: [
        { val: "5",    label: "formations disponibles" },
        { val: "100%", label: "méthodes testées en conditions réelles" },
        { val: "2026", label: "contenu à jour" }
      ]
    },

    avantApres: [
      { avant: "Tes fiches produits sont copiées-collées du fournisseur", apres: "Des descriptions uniques qui se positionnent sur Google et vendent" },
      { avant: "Ton taux de conversion est à 1,2%", apres: "Objectif 2,5-3% grâce aux techniques de cette formation" },
      { avant: "Tes emails d'abandon panier ne sont jamais ouverts", apres: "Séquence automatisée qui récupère 15-20% des paniers perdus" },
      { avant: "Tes pubs Facebook ont un CTR de 0,8%", apres: "Hooks qui stoppent le scroll et font cliquer" }
    ],

    programme: [
      {
        titre: "Psychologie de l'achat en ligne",
        duree: "55 min",
        lecons: [
          "Les 7 déclencheurs d'achat universels",
          "Biais cognitifs au service du copy",
          "Comprendre ton avatar client parfaitement"
        ]
      },
      {
        titre: "Fiches produits qui convertissent",
        duree: "65 min",
        lecons: [
          "La structure PAS et FAB pour les produits",
          "Titres, bullets points et descriptions irrésistibles",
          "Optimiser pour les moteurs de recherche ET la conversion"
        ]
      },
      {
        titre: "Emails e-commerce haute performance",
        duree: "60 min",
        lecons: [
          "Séquence de bienvenue qui vend",
          "Abandon panier : récupérer 15%+ de ventes perdues",
          "Emails post-achat et upsell automatisés"
        ]
      },
      {
        titre: "Landing pages & pages catégories",
        duree: "55 min",
        lecons: [
          "Structure d'une landing page qui convertit",
          "Hero section, preuves sociales, CTA",
          "A/B testing pour améliorer en continu"
        ]
      },
      {
        titre: "Copywriting pour les publicités",
        duree: "60 min",
        lecons: [
          "Hooks Meta Ads qui stoppent le scroll",
          "Google Shopping : titres et descriptions",
          "Angles créatifs selon les audiences"
        ]
      },
      {
        titre: "Storytelling & branding éditorial",
        duree: "50 min",
        lecons: [
          "Construire une voix de marque cohérente",
          "Story produit qui crée l'attachement",
          "UGC et preuves sociales intégrées au copy"
        ]
      },
      {
        titre: "Mesurer et optimiser son copy",
        duree: "35 min",
        lecons: [
          "KPIs du copywriter e-commerce",
          "Interpréter les heatmaps et sessions recordings",
          "Processus d'itération rapide"
        ]
      }
    ],

    objectifs: [
      "Rédiger des fiches produits qui font vraiment vendre",
      "Créer des séquences emails automatisées haute conversion",
      "Maîtriser les hooks publicitaires Meta et Google",
      "Structurer une landing page de A à Z",
      "Construire une voix de marque reconnaissable",
      "Mesurer et améliorer continuellement son copy"
    ],

    pourQui: [
      "E-commerçants voulant augmenter leur taux de conversion",
      "Rédacteurs et copywriters souhaitant se spécialiser",
      "Responsables marketing en charge du contenu",
      "Agences web voulant enrichir leur offre"
    ],

    prerequis: "Aucun prérequis. Avoir une boutique e-commerce ou un projet e-commerce est un plus.",

    ressources: [
      "50 templates de fiches produits par niche",
      "Séquence email abandon panier prête à importer (Klaviyo/Mailchimp)",
      "Banque de 100 hooks publicitaires Meta testés",
      "Checklist de relecture copy avant publication",
      "Guide complet des biais cognitifs appliqués à l'e-commerce",
      "🤖 Prompt d'audit IA — 28 points vérifiés sur le copy de ta boutique"
    ],

    bonus: [
      "🤖 Audit IA inclus — fais auditer le copy de ta boutique sur les 7 modules"
    ],

    faq: [
      {
        q: "Je ne suis pas 'écrivain' — puis-je apprendre le copywriting ?",
        r: "Le copywriting n'est pas de la littérature, c'est une technique. La formation te donne des formules et des structures à appliquer, même si tu n'aimes pas écrire."
      },
      {
        q: "Est-ce que ça marche pour ma niche (mode, beauté, high-tech…) ?",
        r: "Oui. Les principes psychologiques sont universels. Chaque module contient des exemples dans au moins 5 niches e-commerce différentes."
      },
      {
        q: "J'utilise Shopify. La formation est-elle compatible ?",
        r: "Totalement. Les techniques s'appliquent sur Shopify, WooCommerce, PrestaShop et toute autre plateforme. On montre les manipulations sur Shopify."
      },
      {
        q: "Combien de temps pour voir des résultats sur les conversions ?",
        r: "Avec les fiches produits et les emails d'abandon panier, la plupart des étudiants voient une amélioration en 2 à 4 semaines après implémentation."
      },
      {
        q: "Puis-je utiliser cette formation si j'accompagne des clients e-commerce ?",
        r: "Oui, la formation est parfaite pour les freelances et agences qui gèrent du contenu e-commerce pour leurs clients."
      }
    ],

    certif: true,
    stripeProductId: "prod_copy_ecom_placeholder"
  },

  // ──────────────────────────────────────────────────────────
  //  4. SEO POUR E-COMMERCE
  // ──────────────────────────────────────────────────────────
  {
    id: "seo-ecom",
    slug: "seo-ecom",
    titre: "SEO pour E-commerce",
    sousTitre: "Génère du trafic organique massif sur ta boutique",
    description: "Stratégie SEO complète pour les sites e-commerce : optimisation des pages produits et catégories, SEO technique Shopify/WooCommerce, contenu éditorial, link building e-commerce et suivi des performances.",
    icon: "🛒",
    categorie: "SEO",
    niveau: "Intermédiaire",
    duree: "7h30",
    modules: 8,
    etudiants: 980,
    note: 4.7,
    avis: 198,
    prix: 39,
    prixAncien: 79,
    badge: "new",
    couleur: "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(16,185,129,0.2))",
    couleurGlow: "rgba(34,197,94,0.5)",

    formateur: {
      nom: "L'équipe FormaElan",
      role: "Praticiens actifs · Formateurs",
      bio: "Cette formation est créée par des praticiens qui appliquent ces méthodes au quotidien. Chaque module est construit à partir d'expériences terrain concrètes, pas de théorie creuse.",
      avatar: "FE",
      stats: [
        { val: "5",    label: "formations disponibles" },
        { val: "100%", label: "méthodes testées en conditions réelles" },
        { val: "2026", label: "contenu à jour" }
      ]
    },

    avantApres: [
      { avant: "90% de ton trafic vient des pubs payantes", apres: "40% de trafic organique en 6 mois, coût d'acquisition divisé" },
      { avant: "Tes pages produits ne rankent sur rien", apres: "Top 3 Google sur tes mots-clés transactionnels prioritaires" },
      { avant: "Tes filtres créent du duplicate content pénalisé", apres: "Architecture technique propre, zéro pénalité, crawl optimisé" },
      { avant: "Tu ne sais pas pourquoi certaines pages chutent", apres: "Dashboard de monitoring qui détecte et explique chaque variation" }
    ],

    programme: [
      {
        titre: "Spécificités SEO e-commerce",
        duree: "45 min",
        lecons: [
          "SEO e-commerce vs SEO blog : les différences clés",
          "Auditer une boutique e-commerce",
          "Prioriser les actions à fort impact"
        ]
      },
      {
        titre: "Mots-clés e-commerce",
        duree: "55 min",
        lecons: [
          "Identifier les mots-clés transactionnels",
          "Analyse de la concurrence e-commerce",
          "Mots-clés longue traîne pour les produits"
        ]
      },
      {
        titre: "Optimisation pages produits",
        duree: "60 min",
        lecons: [
          "Titre, meta description, H1 parfaits",
          "Descriptions produits SEO-friendly",
          "Images : compression, alt text, lazy loading"
        ]
      },
      {
        titre: "SEO des pages catégories",
        duree: "55 min",
        lecons: [
          "Architecture de catégories optimisée",
          "Textes de catégories qui rankent",
          "Filtres et facettes : éviter le duplicate content"
        ]
      },
      {
        titre: "SEO Technique Shopify & WooCommerce",
        duree: "65 min",
        lecons: [
          "Vitesse de chargement : étapes clés",
          "Schema Markup pour les produits",
          "Canonicals, redirections et crawl budget"
        ]
      },
      {
        titre: "Contenu éditorial e-commerce",
        duree: "50 min",
        lecons: [
          "Blog e-commerce : sujets qui attirent les acheteurs",
          "Guides d'achat et comparatifs",
          "Maillage interne blog → produits"
        ]
      },
      {
        titre: "Link Building e-commerce",
        duree: "55 min",
        lecons: [
          "Obtenir des backlinks sans budget",
          "Partenariats influenceurs et affiliés",
          "Récupérer les mentions non linkées"
        ]
      },
      {
        titre: "Reporting & Optimisation continue",
        duree: "45 min",
        lecons: [
          "Search Console pour l'e-commerce",
          "Google Analytics 4 : tracking e-commerce",
          "Identifier et corriger les pages qui chutent"
        ]
      }
    ],

    objectifs: [
      "Auditer et optimiser une boutique e-commerce",
      "Créer des pages produits et catégories SEO-optimisées",
      "Résoudre les problèmes techniques spécifiques au e-commerce",
      "Créer un blog qui génère du trafic acheteur",
      "Construire des backlinks dans la niche e-commerce",
      "Suivre et améliorer les performances SEO"
    ],

    pourQui: [
      "E-commerçants Shopify, WooCommerce ou PrestaShop",
      "Consultants SEO voulant se spécialiser e-commerce",
      "Agences e-commerce élargissant leur offre SEO",
      "Managers marketing en charge du trafic organique"
    ],

    prerequis: "Bases du SEO recommandées. Accès à une boutique en ligne (ou projet en cours).",

    ressources: [
      "Audit SEO e-commerce complet (template Google Sheets)",
      "Checklist technique Shopify 2025",
      "Template de description produit SEO (x10 formats)",
      "Script de détection duplicate content automatique",
      "Dashboard GA4 e-commerce prêt à l'emploi",
      "🤖 Prompt d'audit IA — 32 points vérifiés sur le SEO de ta boutique"
    ],

    bonus: [
      "🤖 Audit IA inclus — 32 points vérifiés sur le SEO de ta boutique"
    ],

    faq: [
      {
        q: "La formation couvre-t-elle Shopify ET WooCommerce ?",
        r: "Oui, les deux plateformes sont traitées dans les modules techniques avec des manipulations spécifiques à chacune."
      },
      {
        q: "Mon site est sur PrestaShop — ça fonctionne quand même ?",
        r: "Les stratégies et la logique SEO sont identiques. Les captures d'écran sont sur Shopify/WooCommerce mais les principes s'appliquent à toute CMS e-commerce."
      },
      {
        q: "J'ai déjà fait du SEO basique — est-ce que j'apprendrai encore des choses ?",
        r: "Oui. La formation va bien au-delà des bases : duplicate content e-commerce, crawl budget, schema produit, link building e-com spécifique."
      },
      {
        q: "En combien de temps peut-on espérer du trafic organique ?",
        r: "Les optimisations techniques : résultats en 4-8 semaines. Les pages produits : 2-4 mois. Le contenu blog : 3-6 mois. Le SEO est un investissement long terme."
      },
      {
        q: "Peut-on poser des questions sur notre boutique spécifique ?",
        r: "Oui ! Le Discord communauté inclus dans la formation te permet de poser tes questions et de partager ton site pour obtenir des retours."
      }
    ],

    certif: true,
    stripeProductId: "prod_seo_ecom_placeholder"
  },

  // ──────────────────────────────────────────────────────────
  //  5. OPTIMISER SON IA
  // ──────────────────────────────────────────────────────────
  {
    id: "optimiser-ia",
    slug: "optimiser-ia",
    titre: "Optimiser son IA",
    sousTitre: "Obtenez des résultats 3× meilleurs sans changer d'outil",
    description: "Maîtrise les fondamentaux qui font la différence : tokens, fenêtre de contexte, prompts RCTF, choix du bon modèle, bibliothèque de prompts. De l'utilisateur moyen à l'utilisateur expert — en 5 heures.",
    icon: "⚡",
    categorie: "Intelligence Artificielle",
    niveau: "Débutant à Intermédiaire",
    duree: "5h10",
    modules: 7,
    etudiants: 870,
    note: 4.8,
    avis: 156,
    prix: 39,
    prixAncien: 79,
    badge: "new",
    couleur: "linear-gradient(135deg, rgba(26,158,143,0.3), rgba(99,102,241,0.2))",
    couleurGlow: "rgba(26,158,143,0.5)",

    formateur: {
      nom: "L'équipe FormaElan",
      role: "Praticiens actifs · Formateurs",
      bio: "Cette formation est créée par des praticiens qui appliquent ces méthodes au quotidien. Chaque module est construit à partir d'expériences terrain concrètes, pas de théorie creuse.",
      avatar: "FE",
      stats: [
        { val: "5",    label: "formations disponibles" },
        { val: "100%", label: "méthodes testées en conditions réelles" },
        { val: "2026", label: "contenu à jour" }
      ]
    },

    avantApres: [
      { avant: "Tu obtiens des réponses génériques malgré ChatGPT", apres: "Des résultats précis et utilisables du premier coup" },
      { avant: "Tes longues conversations dérivent et se dégradent", apres: "Tu gères le context rot et gardes la qualité constante" },
      { avant: "Tu ne sais pas quel modèle choisir pour quelle tâche", apres: "Un arbre de décision clair pour chaque situation" },
      { avant: "Tu réexpliques ton contexte à chaque nouvelle session", apres: "Instructions persistantes : 3 min par tâche récurrente" }
    ],

    programme: [
      {
        titre: "Pourquoi tu sous-exploites ton IA",
        duree: "35 min",
        lecons: [
          "Les 5 erreurs que font 90% des utilisateurs",
          "Ce que l'IA peut (et ne peut pas) faire pour toi",
          "Poser le bon diagnostic sur son usage actuel"
        ]
      },
      {
        titre: "Tokens & contexte",
        duree: "45 min",
        lecons: [
          "Qu'est-ce qu'un token ? Impact sur les coûts et la qualité",
          "La fenêtre de contexte : ce que l'IA voit et oublie",
          "Context rot : causes, signes et remèdes"
        ]
      },
      {
        titre: "Prompt Engineering — les bases",
        duree: "55 min",
        lecons: [
          "Le cadre RCTF : Rôle, Contexte, Tâche, Format",
          "Few-shot prompting : calibrer ton style avec des exemples",
          "Chain-of-thought pour les tâches complexes"
        ]
      },
      {
        titre: "Prompt Engineering — avancé",
        duree: "50 min",
        lecons: [
          "System prompts et instructions persistantes",
          "Prompts itératifs : affiner en plusieurs passes",
          "Évaluer et scorer ses prompts (grille en 4 critères)"
        ]
      },
      {
        titre: "Choisir le bon modèle",
        duree: "40 min",
        lecons: [
          "GPT-4o vs Claude vs Gemini : forces et limites réelles",
          "Modèles légers vs puissants : arbre de décision",
          "Outils spécialisés : Perplexity, NotebookLM, GitHub Copilot"
        ]
      },
      {
        titre: "Réduire ses coûts, optimiser son workflow",
        duree: "45 min",
        lecons: [
          "Custom GPTs et Projects Claude : instructions persistantes",
          "Construire sa bibliothèque de prompts personnels",
          "Fichiers de contexte : compenser l'absence de mémoire native"
        ]
      },
      {
        titre: "Ton système IA personnel",
        duree: "40 min",
        lecons: [
          "Construire son fichier de contexte personnel",
          "Veille IA efficace : 15 min/semaine suffisent",
          "Plan d'action 30 jours pour ancrer ses habitudes"
        ]
      }
    ],

    objectifs: [
      "Structurer tous tes prompts avec le cadre RCTF",
      "Comprendre et gérer la fenêtre de contexte et le context rot",
      "Choisir le bon modèle pour chaque type de tâche",
      "Créer des instructions persistantes qui éliminent la répétition",
      "Construire une bibliothèque de prompts réutilisables",
      "Mettre en place une veille IA efficace en 15 min/semaine"
    ],

    pourQui: [
      "Utilisateurs de ChatGPT, Claude ou Gemini déçus de leurs résultats",
      "Professionnels qui veulent gagner du temps sur leurs tâches IA",
      "Entrepreneurs et freelances intégrant l'IA dans leur quotidien",
      "Toute personne voulant dépasser le niveau débutant en IA"
    ],

    prerequis: "Avoir déjà utilisé ChatGPT ou Claude au moins quelques fois. Aucun prérequis technique.",

    ressources: [
      "Grille d'évaluation de prompts (template PDF)",
      "Template bibliothèque de prompts personnels (Notion / Google Docs)",
      "Comparatif modèles IA 2026 (Google Sheet mis à jour trimestriellement)",
      "Plan d'action 30 jours (checklist imprimable)",
      "30 prompts optimisés prêts à l'emploi par cas d'usage",
      "🤖 Prompt d'audit IA — 28 points vérifiés sur ton usage IA"
    ],

    bonus: [
      "🤖 Audit IA inclus — vérifie que tu appliques les 7 modules à ton usage"
    ],

    faq: [
      {
        q: "Je débute avec l'IA — cette formation est-elle pour moi ?",
        r: "Oui, si tu as déjà essayé ChatGPT ou Claude au moins une fois. Les 2 premiers chapitres sont accessibles à tous et construisent la base nécessaire pour la suite."
      },
      {
        q: "Faut-il un abonnement payant (ChatGPT Plus, Claude Pro) ?",
        r: "Non. Les techniques enseignées fonctionnent avec les versions gratuites. Les abonnements payants offrent des limites plus élevées, mais ne sont pas obligatoires pour suivre la formation."
      },
      {
        q: "Est-ce que ça change vraiment les résultats ?",
        r: "Appliquer le cadre RCTF seul améliore la pertinence des réponses de façon visible dès le premier essai. C'est vérifiable immédiatement sur tes cas concrets — pas besoin d'attendre."
      },
      {
        q: "La formation sera-t-elle obsolète dans 6 mois ?",
        r: "Les fondamentaux (tokens, contexte, structure de prompt, choix de modèle) sont liés à l'architecture des LLMs et évoluent lentement. Les outils spécifiques sont mis à jour trimestriellement avec ton accès."
      },
      {
        q: "En quoi c'est différent des tutoriels gratuits sur YouTube ?",
        r: "La formation suit une progression pédagogique cohérente, du diagnostic à la mise en système. Les tutoriels couvrent des astuces isolées — ici, tu construis une méthode complète et réutilisable immédiatement."
      }
    ],

    certif: true,
    stripeProductId: "prod_optimiser_ia_placeholder"
  },

  // ──────────────────────────────────────────────────────────
  //  6. SEO POUR CRÉATEURS DE CONTENU
  // ──────────────────────────────────────────────────────────
  {
    id: "seo-createurs",
    slug: "seo-createurs",
    titre: "SEO pour Créateurs de Contenu",
    sousTitre: "Rankez sur Google, YouTube et Pinterest — 3 moteurs, 1 système",
    description: "Stratégie SEO multi-plateforme pour formateurs, coachs et créateurs : référencement Google pour ton site, YouTube SEO pour tes vidéos, Pinterest SEO pour ta niche visuelle. Un système unifié pour attirer un trafic qualifié sans pub.",
    icon: "🎬",
    categorie: "SEO",
    niveau: "Débutant à Intermédiaire",
    duree: "7h",
    modules: 8,
    etudiants: 0,
    note: 0,
    avis: 0,
    prix: 49,
    prixAncien: 97,
    badge: "new",
    couleur: "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(139,92,246,0.2))",
    couleurGlow: "rgba(236,72,153,0.5)",

    formateur: {
      nom: "L'équipe FormaElan",
      role: "Praticiens actifs · Formateurs",
      bio: "Cette formation est créée par des praticiens qui appliquent ces méthodes au quotidien. Chaque module est construit à partir d'expériences terrain concrètes, pas de théorie creuse.",
      avatar: "FE",
      stats: [
        { val: "6",    label: "formations disponibles" },
        { val: "100%", label: "méthodes testées en conditions réelles" },
        { val: "2026", label: "contenu à jour" }
      ]
    },

    avantApres: [
      { avant: "Tu publies du contenu mais personne ne te trouve", apres: "Un flux constant de trafic qualifié depuis 3 moteurs de recherche" },
      { avant: "Tes vidéos YouTube ne rankent pas malgré le travail investi", apres: "Une méthode d'optimisation YouTube reproductible sur chaque vidéo" },
      { avant: "Tu crées du contenu sans stratégie cross-plateforme", apres: "Un contenu pilier décliné en 3 formats — 3× plus de portée, même effort" },
      { avant: "Ton seul canal d'acquisition est la pub ou les réseaux sociaux", apres: "SEO Google + YouTube + Pinterest = trafic organique prévisible et gratuit" }
    ],

    programme: [
      {
        titre: "Le créateur de contenu et le SEO en 2026",
        duree: "40 min",
        lecons: [
          "Les 3 moteurs de recherche du créateur (Google, YouTube, Pinterest)",
          "Pourquoi le SEO SaaS et e-commerce ne s'appliquent pas directement",
          "Ce que font différemment les créateurs qui vendent le mieux"
        ]
      },
      {
        titre: "Recherche de mots-clés multi-plateforme",
        duree: "55 min",
        lecons: [
          "Keywords Google vs YouTube vs Pinterest : logiques différentes",
          "Outils gratuits : Google Trends, TubeBuddy Free, Pinterest Trends",
          "Construire une seed list depuis les problèmes réels de ton audience"
        ]
      },
      {
        titre: "SEO Google pour créateurs",
        duree: "60 min",
        lecons: [
          "Optimiser ton site et tes pages de vente de formations",
          "Blog de créateur : articles qui attirent ET qui convertissent",
          "Structured data pour les formations en ligne (Course, FAQ, Person)"
        ]
      },
      {
        titre: "YouTube SEO",
        duree: "65 min",
        lecons: [
          "Titres, descriptions et tags : les signaux qui rankent",
          "Watch time, engagement et algorithme expliqués simplement",
          "Playlists et end screens pour maximiser la session et la conversion"
        ]
      },
      {
        titre: "Pinterest SEO",
        duree: "50 min",
        lecons: [
          "Boards optimisés et Rich Pins pour les formations en ligne",
          "Titres et descriptions d'épingles orientés recherche",
          "Stratégie de publication pour créer de la vélocité organique"
        ]
      },
      {
        titre: "Contenu qui convertit — du trafic aux ventes",
        duree: "55 min",
        lecons: [
          "Le funnel de contenu créateur : curiosité → confiance → achat",
          "Articles, vidéos et épingles orientés conversion sans forcer la vente",
          "CTAs naturels qui ne brisent pas l'expérience de contenu"
        ]
      },
      {
        titre: "Synergie inter-plateformes",
        duree: "45 min",
        lecons: [
          "Créer un contenu pilier et le décliner sur Google, YouTube, Pinterest",
          "Repurposing intelligent : 1 idée = 3 formats = 3× plus de portée",
          "Calendrier éditorial cross-plateforme reproductible"
        ]
      },
      {
        titre: "Mesure et optimisation multi-plateforme",
        duree: "40 min",
        lecons: [
          "GSC + YouTube Analytics + Pinterest Analytics : KPIs essentiels",
          "Identifier les contenus qui convertissent vs. ceux qui attirent seulement",
          "Matrice impact/effort pour prioriser tes actions SEO chaque mois"
        ]
      }
    ],

    objectifs: [
      "Ranker sur Google avec un site de formations et un blog stratégique",
      "Optimiser chaque vidéo YouTube pour l'algorithme et la conversion",
      "Utiliser Pinterest comme canal d'acquisition organique pour ta niche",
      "Décliner un contenu pilier sur 3 plateformes sans effort supplémentaire",
      "Mesurer le ROI de ton SEO multi-plateforme",
      "Construire un système d'acquisition organique durable sans pub"
    ],

    pourQui: [
      "Formateurs et coachs qui vendent des formations en ligne",
      "Blogueurs et YouTubeurs voulant monétiser leur audience par le SEO",
      "Créateurs cherchant à réduire leur dépendance aux réseaux sociaux payants",
      "Entrepreneurs du savoir (ebooks, masterclass, programmes en ligne)"
    ],

    prerequis: "Avoir un site web ou une chaîne YouTube (ou les deux). Les bases du SEO on-page sont un plus mais pas obligatoires.",

    ressources: [
      "Template de keyword research multi-plateforme (Google Sheets)",
      "Checklist d'optimisation YouTube — vidéo par vidéo",
      "Modèle de calendrier éditorial cross-plateforme (Notion)",
      "Guide des structured data pour formateurs (JSON-LD prêts à copier)",
      "Dashboard de suivi SEO multi-plateforme (Google Sheets)",
      "🤖 Prompt d'audit IA — 32 points vérifiés sur ta présence multi-plateforme"
    ],

    faq: [
      {
        q: "Je n'ai qu'un blog, pas de YouTube ni Pinterest — est-ce utile ?",
        r: "Oui. Le module SEO Google (chapitre 3) s'applique indépendamment. La formation est conçue pour être modulaire : tu commences par ton canal existant et tu ajoutes les autres quand tu es prêt."
      },
      {
        q: "Est-ce que Pinterest fonctionne vraiment pour les formations ?",
        r: "Oui, pour les niches éducation, développement personnel, marketing, cuisine, design, bien-être. Si ton audience est visuelle ou féminine, Pinterest est souvent sous-exploité — les résultats arrivent plus vite qu'en SEO Google."
      },
      {
        q: "En combien de temps voit-on des résultats sur YouTube ?",
        r: "Les premières améliorations de classement sur des mots-clés de niche sont visibles en 4-8 semaines. La croissance d'une chaîne prend 3-6 mois — l'optimisation accélère la courbe, elle ne la remplace pas."
      },
      {
        q: "J'ai déjà suivi une formation SEO — est-ce redondant ?",
        r: "Non. La formation se concentre sur les spécificités des créateurs : pages de formations, vidéos YouTube, épingles Pinterest, et la synergie entre les 3. Les formations SEO classiques ne couvrent pas YouTube ni Pinterest."
      },
      {
        q: "Y a-t-il un accès à vie ?",
        r: "Oui. Accès permanent, mises à jour comprises. Le SEO multi-plateforme évolue — on met à jour tous les trimestres, inclus dans ton achat."
      }
    ],

    certif: true,
    stripeProductId: "prod_seo_createurs_placeholder",

    bonus: [
      "🤖 Audit IA inclus — 32 points vérifiés sur ta présence multi-plateforme"
    ]
  }
];

// Accès rapide par slug
const FORMATION_BY_SLUG = Object.fromEntries(FORMATIONS.map(f => [f.slug, f]));

if (typeof module !== 'undefined') module.exports = { FORMATIONS, FORMATION_BY_SLUG };
