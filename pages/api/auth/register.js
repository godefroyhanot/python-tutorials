import { PrismaClient } from '../../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const { email, password, pseudo } = req.body;
  if (!email || !password || !pseudo) {
    return res.status(400).json({ error: 'Email, mot de passe et pseudo requis' });
  }
  try {
    // Vérifie si l'utilisateur existe déjà
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);
    // Crée l'utilisateur
    const user = await prisma.user.create({
      data: { email, password: hashed, pseudo },
    });
    return res.status(201).json({ success: true, user: { id: user.id, email: user.email, pseudo: user.pseudo } });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
