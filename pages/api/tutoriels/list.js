import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  try {
    // Vérifier si l'utilisateur est connecté via Authorization header
    const auth = req.headers.authorization;
    let tutoriels;
    if (auth && auth.startsWith('Bearer ')) {
      // Utilisateur connecté : tout voir
      tutoriels = await prisma.tutoriel.findMany({ orderBy: { id: 'asc' } });
    } else {
      // Visiteur : voir uniquement les tutoriels publics
      tutoriels = await prisma.tutoriel.findMany({ where: { public: true }, orderBy: { id: 'asc' } });
    }
    return res.status(200).json({ success: true, tutoriels });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
