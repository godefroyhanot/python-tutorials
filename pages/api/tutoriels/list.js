/**
 * API Route: /api/tutoriels/list
 * Méthode: GET
 * Description: Récupère la liste des tutoriels selon le statut d'authentification
 * 
 * Fonctionnalités:
 * - Utilisateur connecté: accès à tous les tutoriels (publics + privés)
 * - Visiteur non connecté: accès uniquement aux tutoriels publics
 * 
 * Authentification: Optionnelle (Bearer token dans Authorization header)
 * Réponse: { success: boolean, tutoriels: Array }
 */

import { PrismaClient } from '@prisma/client';

// Initialisation du client Prisma pour interagir avec la base de données
const prisma = new PrismaClient();

/**
 * Handler principal de l'API route
 * @param {NextApiRequest} req - Objet de requête Next.js
 * @param {NextApiResponse} res - Objet de réponse Next.js
 */
export default async function handler(req, res) {
  // Vérification de la méthode HTTP - seul GET est autorisé
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  try {
    // Extraction du token d'authentification depuis les headers
    // Format attendu: "Bearer <token>"
    const auth = req.headers.authorization;
    let tutoriels;
    
    // Logique conditionnelle basée sur l'authentification
    if (auth && auth.startsWith('Bearer ')) {
      // Cas 1: Utilisateur authentifié
      // Récupération de TOUS les tutoriels (publics et privés)
      // orderBy: tri par ID croissant pour un affichage cohérent
      tutoriels = await prisma.tutoriel.findMany({ 
        orderBy: { id: 'asc' } 
      });
    } else {
      // Cas 2: Visiteur non authentifié
      // Récupération uniquement des tutoriels publics
      // where: { public: true } filtre les tutoriels privés
      tutoriels = await prisma.tutoriel.findMany({ 
        where: { public: true }, 
        orderBy: { id: 'asc' } 
      });
    }
    
    // Réponse de succès avec les données
    return res.status(200).json({ success: true, tutoriels });
    
  } catch (err) {
    // Gestion des erreurs de base de données ou autres erreurs serveur
    // En production, il serait mieux de logger l'erreur détaillée
    console.error('Erreur lors de la récupération des tutoriels:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
