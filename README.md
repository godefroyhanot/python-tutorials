# Python Tutorials – Next.js

Ce projet est un site vitrine moderne pour présenter tes tutoriels Python, réalisé avec Next.js et Prisma.

## Démarrage

1. Installe les dépendances :
   ```bash
   npm install
   ```

2. Configure la base de données :
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. Lance le serveur de développement :
   ```bash
   npm run dev
   ```

4. Expose ton site avec ngrok :
   ```bash
   # Dans un autre terminal
   ngrok http 3000
   ```

## Structure
- `pages/` : pages principales (accueil, tutoriels, admin, etc.)
- `pages/api/` : API routes (authentification, CRUD tutoriels)
- `components/` : composants réutilisables (Navbar, Footer)
- `prisma/` : schéma de base de données et migrations
- `public/tutorials/` : fichiers PDF, vidéos, images

## Fonctionnalités
- ✅ Système d'authentification JWT avec bcrypt
- ✅ CRUD complet des tutoriels via API
- ✅ Interface d'administration
- ✅ Base de données SQLite avec Prisma
- ✅ Upload de fichiers
- ✅ Système de visibilité public/privé

## Accès
- **Local** : http://localhost:3000
- **Public** : URL générée par ngrok

---
Travail pédagogique sans objectifs commerciaux.
