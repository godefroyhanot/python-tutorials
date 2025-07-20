import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024, // 100MB
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'upload' });
    }
    const file = files.fichier;
    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier reçu' });
    }
    // Renommer le fichier pour éviter les collisions
    const ext = path.extname(file.originalFilename || file.newFilename);
    const base = path.basename(file.newFilename, ext);
    const newName = `${base}_${Date.now()}${ext}`;
    const newPath = path.join(uploadDir, newName);
    fs.renameSync(file.filepath, newPath);
    // Retourner le chemin public
    const publicPath = `/uploads/${newName}`;
    res.status(200).json({ success: true, path: publicPath });
  });
}
