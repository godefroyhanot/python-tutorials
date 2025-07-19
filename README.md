# Python Tutorials – Next.js

Ce projet est un site vitrine moderne pour présenter tes tutoriels Python, réalisé avec Next.js.

## Démarrage

1. Installe les dépendances :
   ```bash
   npm install
   ```
2. Lance le serveur de développement :
   ```bash
   npm run dev
   ```
3. Accède au site sur [http://localhost:3000](http://localhost:3000)

## Structure
- `pages/` : pages principales (accueil, tutoriels, contact, etc.)
- `components/` : composants réutilisables (Navbar, Footer, TutorielCard...)
- `public/tutorials/` : fichiers PDF, vidéos, images
- `data/tutoriels.json` : liste des tutoriels

## Déploiement
Ce projet est prêt pour un hébergement sur Netlify ou Vercel (recommandé pour Next.js). Un export statique est aussi possible.

### Déploiement sur Netlify
1. Crée un compte sur [Netlify](https://www.netlify.com/).
2. Clique sur "Add new site" > "Import an existing project" et connecte ton repo GitHub ou glisse le dossier du projet.
3. Utilise les paramètres par défaut : 
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
4. Choisis un nom de domaine libre et pertinent (ex : python-tutos-godefroy.netlify.app). Le nom doit être défini mais pas acheté.
5. Lance le déploiement. Le site sera en ligne en quelques minutes.

### Déploiement sur Vercel
1. Crée un compte sur [Vercel](https://vercel.com/).
2. Clique sur "New Project" et connecte ton repo GitHub ou importe le dossier.
3. Vercel détecte Next.js automatiquement. Clique sur "Deploy".
4. Choisis un nom de domaine libre (ex : python-tutos.vercel.app).

### Conseils pédagogiques et conformité
- **Mention obligatoire** : le site affiche "travail pédagogique sans objectifs commerciaux" (footer et mentions légales).
- **RGPD** : aucune donnée personnelle n’est collectée côté serveur.
- Pages obligatoires : `/a-propos`, `/mentions-legales`, `/contact`.

### Export statique (optionnel)
Pour un export statique (GitHub Pages) :
```bash
npm run build
npm run export
```

---
Travail pédagogique sans objectifs commerciaux.
