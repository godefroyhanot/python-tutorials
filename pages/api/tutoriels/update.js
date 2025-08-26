/**
 * API Route: /api/tutoriels/update
 * Méthode: PUT
 * Description: Met à jour un tutoriel existant dans la base de données
 * 
 * Authentification: Obligatoire (Bearer token)
 * Body requis: { id }
 * Body optionnel: { titre, format, description, fichier, categorie, public }
 * 
 * Fonctionnalité: Permet de modifier tous les champs d'un tutoriel
 * Réponse: { success: boolean, tutoriel: Object }
 */

import { PrismaClient } from '@prisma/client';

// Initialisation du client Prisma pour les opérations de mise à jour
const prisma = new PrismaClient();

/**
 * Handler pour la mise à jour des tutoriels existants
 * @param {NextApiRequest} req - Objet de requête contenant l'ID et les nouvelles données
 * @param {NextApiResponse} res - Objet de réponse Next.js
 */
export default async function handler(req, res) {
  // Vérification de la méthode HTTP - seul PUT est accepté
  // PUT est utilisé pour les mises à jour complètes de ressources
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  // Vérification de l'authentification
  // Seuls les utilisateurs connectés peuvent modifier des tutoriels
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  
  // TODO: Amélioration possible - Vérifier que l'utilisateur
  // a le droit de modifier ce tutoriel spécifique
  
  // Extraction des données du corps de la requête
  // Utilisation de destructuring avec renommage pour 'public' (mot réservé JS)
  const { id, titre, format, description, fichier, categorie, public: isPublic } = req.body;
  
  // Validation du champ obligatoire
  // L'ID est nécessaire pour identifier le tutoriel à modifier
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }
  
  try {
    // Mise à jour du tutoriel en base de données
    // Prisma met à jour uniquement les champs fournis (partial update)
    const tuto = await prisma.tutoriel.update({
      where: { 
        id: Number(id) // Conversion en nombre pour correspondre au type en DB
      },
      data: { 
        // Seuls les champs fournis seront mis à jour
        // Les champs undefined/null ne modifieront pas la valeur existante
        titre, 
        format, 
        description, 
        fichier, 
        categorie, 
        public: isPublic 
      },
    });
    
    // Réponse de succès avec le tutoriel mis à jour
    return res.status(200).json({ success: true, tutoriel: tuto });
    
  } catch (err) {
    // Gestion des erreurs possibles:
    // - Tutoriel non trouvé (ID inexistant)
    // - Erreurs de validation
    // - Erreurs de connexion à la base de données
    console.error('Erreur lors de la mise à jour du tutoriel:', err);
    
    // Si le tutoriel n'existe pas, Prisma lève une erreur spécifique
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Tutoriel non trouvé' });
    }
    
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
