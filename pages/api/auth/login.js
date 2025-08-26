/**
 * API Route: /api/auth/login
 * Méthode: POST
 * Description: Authentifie un utilisateur et génère un token JWT
 * 
 * Sécurité: Utilise bcrypt pour vérifier le mot de passe hashé
 * Token: JWT valide 7 jours avec userId et email
 * 
 * Body requis: { email, password }
 * Réponse: { success: boolean, token: string, user: Object }
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';  // Librairie pour hasher/comparer les mots de passe
import jwt from 'jsonwebtoken'; // Librairie pour générer et vérifier les JWT

// Initialisation du client Prisma
const prisma = new PrismaClient();

// Clé secrète pour signer les JWT - DOIT être définie en production
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

/**
 * Handler d'authentification utilisateur
 * @param {NextApiRequest} req - Contient email et password dans le body
 * @param {NextApiResponse} res - Retourne le token et les infos utilisateur
 */
export default async function handler(req, res) {
  // Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  
  // Extraction des données de connexion
  const { email, password } = req.body;
  
  // Validation des champs obligatoires
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  
  try {
    // Recherche de l'utilisateur par email
    const user = await prisma.user.findUnique({ where: { email } });
    
    // Vérification de l'existence de l'utilisateur
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur inconnu' });
    }
    
    // Comparaison du mot de passe fourni avec le hash stocké
    // bcrypt.compare() gère automatiquement le salt et le hashing
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    
    // Génération du token JWT avec les informations utilisateur
    // Payload: userId et email pour identifier l'utilisateur
    // Expiration: 7 jours pour une session longue
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    // Réponse de succès avec le token et les infos utilisateur (sans mot de passe)
    return res.status(200).json({ 
      success: true, 
      token, 
      user: { id: user.id, email: user.email, pseudo: user.pseudo } 
    });
    
  } catch (err) {
    // Gestion des erreurs de base de données ou autres erreurs serveur
    console.error('Erreur lors de la connexion:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
