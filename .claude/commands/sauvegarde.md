Effectue la sauvegarde de fin de session via git.

## Étapes dans l'ordre

### 1. État du dépôt
Lance :
```powershell
git status
```
Affiche les fichiers modifiés et non suivis.

### 2. Mettre à jour CLAUDE.md si nécessaire
Si des formations ont changé de statut ou si des décisions importantes ont été prises dans cette session, mettre à jour `CLAUDE.md`.

### 3. Commit et push
```powershell
git add .
git status
git commit -m "[résumé concis du travail de cette session]"
git push
```

⚠️ Vérifier avant de committer que `git status` ne montre PAS : `backend/.env` · `backend/node_modules/` · `*.log` — ces fichiers sont dans `.gitignore`.

### 4. Confirmer
Afficher : "✓ Sauvegarde terminée — github.com/FormaElan/formaelan à jour."
