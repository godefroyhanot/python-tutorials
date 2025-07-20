import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  // Auth simple : vérifier qu'un token est présent (améliorable)
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  // (Optionnel : vérifier le token JWT ici)
  const { titre, format, description, fichier, categorie } = req.body;
  if (!titre || !format || !fichier) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }
  try {
    const tuto = await prisma.tutoriel.create({
      data: { titre, format, description, fichier, categorie, public: false },
    });
    return res.status(201).json({ success: true, tutoriel: tuto });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
