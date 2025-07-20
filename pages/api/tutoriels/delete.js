import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  // Auth simple : vérifier qu'un token est présent (améliorable)
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }
  try {
    await prisma.tutoriel.delete({ where: { id: Number(id) } });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
