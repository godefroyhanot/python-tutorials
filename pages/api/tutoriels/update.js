import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  // Auth simple : vérifier qu'un token est présent (améliorable)
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  const { id, titre, format, description, fichier, categorie, public: isPublic } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }
  try {
    const tuto = await prisma.tutoriel.update({
      where: { id: Number(id) },
      data: { titre, format, description, fichier, categorie, public: isPublic },
    });
    return res.status(200).json({ success: true, tutoriel: tuto });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
