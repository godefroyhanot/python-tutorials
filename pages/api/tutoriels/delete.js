/**
 * API Route: /api/tutoriels/delete
 * Méthode: DELETE
 * Description: Supprime définitivement un tutoriel de la base de données
 * 
 * Authentification: Obligatoire (Bearer token)
 * Paramètre requis: id (dans l'URL query)
 * 
 * Attention: Opération irréversible - le tutoriel sera définitivement supprimé
 * Réponse: { success: boolean }
 */

import { PrismaClient } from '@prisma/client';

// Initialisation du client Prisma pour les opérations de suppression
const prisma = new PrismaClient();

/**
 * Handler pour la suppression de tutoriels
 * @param {NextApiRequest} req - Objet de requête contenant l'ID en query parameter
 * @param {NextApiResponse} res - Objet de réponse Next.js
 */
export default async function handler(req, res) {
  // Vérification de la méthode HTTP - seul DELETE est accepté
  // DELETE est la méthode HTTP standard pour les suppressions
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  // Vérification de l'authentification
  // Seuls les utilisateurs connectés peuvent supprimer des tutoriels
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  
  // TODO: Amélioration critique - Vérifier que l'utilisateur
  // a le droit de supprimer ce tutoriel spécifique
  // (propriétaire ou administrateur)
  
  // Extraction de l'ID depuis les paramètres de requête (URL)
  // Format attendu: /api/tutoriels/delete?id=123
  const { id } = req.query;
  
  // Validation du paramètre obligatoire
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }
  
  try {
    // Suppression du tutoriel de la base de données
    // ATTENTION: Opération irréversible!
    await prisma.tutoriel.delete({ 
      where: { 
        id: Number(id) // Conversion en nombre pour correspondre au type en DB
      } 
    });
    
    // Réponse de succès (pas de contenu retourné, juste la confirmation)
    return res.status(200).json({ success: true });
    
  } catch (err) {
    // Gestion des erreurs possibles:
    // - Tutoriel non trouvé (ID inexistant)
    // - Contraintes de clé étrangère (si des relations existent)
    // - Erreurs de connexion à la base de données
    console.error('Erreur lors de la suppression du tutoriel:', err);
    
    // Si le tutoriel n'existe pas, Prisma lève une erreur spécifique
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Tutoriel non trouvé' });
    }
    
    // Erreur de contrainte de clé étrangère
    if (err.code === 'P2003') {
      return res.status(409).json({ error: 'Impossible de supprimer: tutoriel lié à d\'autres données' });
    }
    
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
