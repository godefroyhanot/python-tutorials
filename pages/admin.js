import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useState } from 'react';
export default function Admin() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const pseudo = localStorage.getItem('pseudoMembre');
      if (!token || !pseudo) {
        router.replace('/login');
      } else if (pseudo.toLowerCase() !== 'godefroy') {
        router.replace('/');
      }
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    setError("");
    const form = e.target;
    const titre = form.titre.value;
    const format = form.format.value;
    const description = form.description?.value || "";
    const categorie = form.categorie?.value || "";
    const fichierInput = form.fichier;
    let fichier = "";
    if (fichierInput && fichierInput.files && fichierInput.files.length > 0) {
      // upload réel
      const data = new FormData();
      data.append('fichier', fichierInput.files[0]);
      const uploadRes = await fetch('/api/tutoriels/upload', {
        method: 'POST',
        body: data
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success && uploadData.path) {
        fichier = uploadData.path;
      } else {
        setError(uploadData.error || "Erreur lors de l'upload du fichier");
        return;
      }
    } else {
      setError("Veuillez sélectionner un fichier.");
      return;
    }
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/tutoriels/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titre, format, description, fichier, categorie })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        form.reset();
      } else {
        setError(data.error || "Erreur lors de l'ajout");
      }
    } catch (err) {
      setError("Erreur serveur");
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Administration</h2>
        <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="text-left font-medium">Titre du tutoriel
            <input type="text" name="titre" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="text-left font-medium">Format
            <select name="format" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2">
              <option value="pdf">PDF</option>
              <option value="video">Vidéo</option>
            </select>
          </label>
          <label className="text-left font-medium">Catégorie
            <input type="text" name="categorie" className="mt-1 w-full border border-gray-300 rounded px-3 py-2" placeholder="ex: Bases, Avancé, Installation..." />
          </label>
          <label className="text-left font-medium">Fichier
            <input type="file" name="fichier" className="mt-1 w-full border border-gray-300 rounded px-3 py-2" required accept=".pdf,.mp4,.mov,.avi,.mkv,.webm" />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">Ajouter le tutoriel</button>
        </form>
        {success && <div className="mt-8 text-center text-green-600 text-sm">Tutoriel ajouté avec succès !</div>}
        {error && <div className="mt-8 text-center text-red-600 text-sm">{error}</div>}
        <div className="mt-8 text-center text-gray-500 text-sm">Seuls les membres connectés peuvent ajouter des tutoriels.</div>
      </main>
      <Footer />
    </>
  );
}
