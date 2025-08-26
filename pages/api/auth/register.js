/**
 * API Route: /api/auth/register
 * Méthode: POST
 * Description: Crée un nouveau compte utilisateur avec mot de passe hashé
 * 
 * Sécurité: Utilise bcrypt avec salt de 10 pour hasher le mot de passe
 * Validation: Vérifie l'unicité de l'email avant création
 * 
 * Body requis: { email, password, pseudo }
 * Réponse: { success: boolean, user: Object }
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Librairie de hachage sécurisé pour les mots de passe

// Initialisation du client Prisma pour les opérations de base de données
const prisma = new PrismaClient();

/**
 * Handler pour l'inscription de nouveaux utilisateurs
 * @param {NextApiRequest} req - Contient les données d'inscription
 * @param {NextApiResponse} res - Retourne les informations du compte créé
 */
export default async function handler(req, res) {
  // Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  // Extraction des données d'inscription
  const { email, password, pseudo } = req.body;
  
  // Validation des champs obligatoires
  if (!email || !password || !pseudo) {
    return res.status(400).json({ error: 'Email, mot de passe et pseudo requis' });
  }
  
  // TODO: Ajouter des validations supplémentaires:
  // - Format email valide
  // - Force du mot de passe (longueur, caractères spéciaux)
  // - Longueur du pseudo
  
  try {
    // Vérification de l'unicité de l'email
    // Empêche la création de comptes en double
    const existing = await prisma.user.findUnique({ where: { email } });
    
    if (existing) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    
    // Hachage sécurisé du mot de passe
    // Salt de 10: bon compromis entre sécurité et performance
    // Plus le nombre est élevé, plus le hachage est lent mais sécurisé
    const hashed = await bcrypt.hash(password, 10);
    
    // Création du nouvel utilisateur en base de données
    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashed, // Stockage du mot de passe hashé, jamais en clair
        pseudo 
      },
    });
    
    // Réponse de succès avec les informations utilisateur (sans mot de passe)
    // Status 201: Created (nouvelle ressource créée)
    return res.status(201).json({ 
      success: true, 
      user: { 
        id: user.id, 
        email: user.email, 
        pseudo: user.pseudo 
      } 
    });
    
  } catch (err) {
    // Gestion des erreurs possibles:
    // - Contraintes de base de données
    // - Erreurs de connexion
    // - Erreurs de validation Prisma
    console.error('Erreur lors de l\'inscription:', err);
    
    // Erreur de contrainte d'unicité (email déjà utilisé)
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
