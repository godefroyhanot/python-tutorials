// Script Node.js pour importer les anciens tutoriels du JSON vers la base Prisma
const { PrismaClient } = require('../generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const jsonPath = path.join(__dirname, '../public/data/tutoriels.json');

async function main() {
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);
  for (const t of data) {
    // Vérifie si un tutoriel avec ce titre ET ce fichier existe déjà
    const exists = await prisma.tutoriel.findFirst({
      where: { titre: t.titre, fichier: t.fichier }
    });
    if (!exists) {
      await prisma.tutoriel.create({
        data: {
          titre: t.titre,
          format: t.format,
          description: t.description || '',
          fichier: t.fichier,
          categorie: t.categorie || null,
        }
      });
      console.log(`Importé: ${t.titre}`);
    } else {
      console.log(`Déjà présent: ${t.titre}`);
    }
  }
  await prisma.$disconnect();
  console.log('Import terminé !');
}

main().catch(e => { console.error(e); process.exit(1); });
