/**
 * API Route: /api/tutoriels/add
 * Méthode: POST
 * Description: Crée un nouveau tutoriel dans la base de données
 * 
 * Authentification: Obligatoire (Bearer token)
 * Body requis: { titre, format, fichier }
 * Body optionnel: { description, categorie }
 * 
 * Comportement: Les nouveaux tutoriels sont créés en mode privé par défaut
 * Réponse: { success: boolean, tutoriel: Object }
 */

import { PrismaClient } from '@prisma/client';

// Initialisation du client Prisma pour les opérations de base de données
const prisma = new PrismaClient();

/**
 * Handler pour la création de nouveaux tutoriels
 * @param {NextApiRequest} req - Objet de requête contenant les données du tutoriel
 * @param {NextApiResponse} res - Objet de réponse Next.js
 */
export default async function handler(req, res) {
  // Vérification de la méthode HTTP - seul POST est accepté
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  // Vérification de l'authentification
  // Seuls les utilisateurs connectés peuvent créer des tutoriels
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  
  // TODO: Amélioration possible - Vérifier la validité du token JWT
  // et extraire l'ID utilisateur pour l'associer au tutoriel
  
  // Extraction des données du corps de la requête
  const { titre, format, description, fichier, categorie } = req.body;
  
  // Validation des champs obligatoires
  // titre: nom du tutoriel
  // format: type de fichier (vidéo, PDF, etc.)
  // fichier: chemin ou nom du fichier
  if (!titre || !format || !fichier) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }
  
  try {
    // Création du tutoriel en base de données
    const tuto = await prisma.tutoriel.create({
      data: { 
        titre, 
        format, 
        description: description || null, // Optionnel
        fichier, 
        categorie: categorie || null, // Optionnel
        public: false // Par défaut, les nouveaux tutoriels sont privés
      },
    });
    
    // Réponse de succès avec le tutoriel créé
    // Status 201: Created (ressource créée avec succès)
    return res.status(201).json({ success: true, tutoriel: tuto });
    
  } catch (err) {
    // Gestion des erreurs de base de données
    // Peut inclure: contraintes de validation, erreurs de connexion, etc.
    console.error('Erreur lors de la création du tutoriel:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
