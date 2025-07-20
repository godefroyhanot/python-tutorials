import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Tutoriels() {
  const [tutos, setTutos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [completed, setCompleted] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [catFilter, setCatFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    fetch('/api/tutoriels/list', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.tutoriels)) {
          setTutos(data.tutoriels);
          // Extraire dynamiquement les catégories si elles existent dans la base (optionnel)
          const cats = Array.from(new Set(data.tutoriels.map(t => t.categorie).filter(Boolean)));
          setCategories(cats);
        }
      });
    setCompleted(JSON.parse(localStorage.getItem('completedTutos') || '[]'));
  }, []);

  const markCompleted = (titre) => {
    const updated = [...completed, titre];
    setCompleted(updated);
    localStorage.setItem('completedTutos', JSON.stringify(updated));
  };

  // Ordre personnalisé demandé par l'utilisateur
  const ordreTutos = [
    "Introduction à Python",
    "Installer Python",
    "Les Bases du Langage",
    "Contrôle de flux et conditions",
    "Manipulation des fichiers avec Python"
  ];
  let filteredTutos = tutos
    .filter(t => filter === 'all' || t.format === filter)
    .filter(t => catFilter === 'all' || t.categorie === catFilter)
    .filter(t => t.titre.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const ia = ordreTutos.indexOf(a.titre);
      const ib = ordreTutos.indexOf(b.titre);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return 0;
    });

  const [isAdmin, setIsAdmin] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAdmin(!!token);
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Voulez-vous vraiment supprimer ce tutoriel ?')) return;
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`/api/tutoriels/delete?id=${id}`, {
      method: 'DELETE',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (res.ok) {
      setTutos(tutos => tutos.filter(t => t.id !== id));
    }
  }

  function handleEdit(tuto) {
    setEditId(tuto.id);
    setEditData({ ...tuto });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    const res = await fetch('/api/tutoriels/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(editData)
    });
    if (res.ok) {
      const data = await res.json();
      setTutos(tutos => tutos.map(t => t.id === editId ? data.tutoriel : t));
      setEditId(null);
    }
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData(data => ({ ...data, [name]: value }));
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Liste des tutoriels</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <button className="filter-btn bg-blue-100 text-blue-800 px-4 py-2 rounded" onClick={() => setFilter('all')}>Tous</button>
          <button className="filter-btn bg-blue-100 text-blue-800 px-4 py-2 rounded" onClick={() => setFilter('video')}>Vidéos</button>
          <button className="filter-btn bg-green-100 text-green-800 px-4 py-2 rounded" onClick={() => setFilter('pdf')}>PDF</button>
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <button className="filter-btn bg-gray-100 text-gray-800 px-4 py-2 rounded" onClick={() => setCatFilter('all')}>Toutes catégories</button>
            {categories.map(cat => (
              <button key={cat} className="filter-btn bg-gray-100 text-gray-800 px-4 py-2 rounded" onClick={() => setCatFilter(cat)}>{cat}</button>
            ))}
          </div>
        )}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher un tutoriel..."
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-8 text-center">
          {completed.length === 0 ? (
            <span className="text-gray-400">Aucun tutoriel complété.</span>
          ) : (
            <b>Tutoriels complétés :</b>
          )}
          {completed.length > 0 && (
            <span> {completed.join(', ')}</span>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTutos.length === 0 && <div className="col-span-2 text-center text-gray-500">Aucun résultat</div>}
          {filteredTutos.map(tuto => (
            <div key={tuto.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
              {editId === tuto.id ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 mb-4">
                  <input name="titre" value={editData.titre || ''} onChange={handleEditChange} className="border rounded px-2 py-1" />
                  <input name="categorie" value={editData.categorie || ''} onChange={handleEditChange} className="border rounded px-2 py-1" placeholder="Catégorie" />
                  <select name="format" value={editData.format || ''} onChange={handleEditChange} className="border rounded px-2 py-1">
                    <option value="pdf">PDF</option>
                    <option value="video">Vidéo</option>
                  </select>
                  <input name="fichier" value={editData.fichier || ''} onChange={handleEditChange} className="border rounded px-2 py-1" placeholder="Chemin du fichier" />
                  <textarea name="description" value={editData.description || ''} onChange={handleEditChange} className="border rounded px-2 py-1" placeholder="Description" />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Enregistrer</button>
                    <button type="button" onClick={() => setEditId(null)} className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500">Annuler</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{tuto.titre}</h3>
                  {tuto.categorie && <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs mb-2">{tuto.categorie}</span>}
                  <span className={`inline-block px-3 py-1 rounded text-xs mb-2 ${tuto.format === 'pdf' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>Format : {tuto.format === 'pdf' ? 'PDF' : 'Vidéo'}</span>
                  <p className="mb-4">{tuto.description}</p>
                  {isAdmin && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(tuto)}
                        className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 transition"
                      >Modifier</button>
                      <button
                        onClick={() => handleDelete(tuto.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                      >Supprimer</button>
                    </div>
                  )}
                </>
              )}

              <div className="mb-4">
                {tuto.format === 'pdf' ? (
                  <embed src={tuto.fichier} type="application/pdf" className="w-full h-64 rounded" />
                ) : (
                  <video controls className="w-full rounded">
                    <source src={tuto.fichier} />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                )}
              </div>
              <a href={`/tutoriels/${tuto.id}`} className="text-blue-600 hover:underline text-sm ml-2">Voir le détail</a>
              <a href={tuto.fichier} className="text-blue-500 hover:underline" download>
                Télécharger le {tuto.format === 'pdf' ? 'PDF' : 'vidéo'}
              </a>
              <button
                className="mt-2 px-4 py-2 rounded bg-blue-200 text-blue-900 hover:bg-blue-300"
                disabled={completed.includes(tuto.titre)}
                onClick={() => markCompleted(tuto.titre)}
              >
                {completed.includes(tuto.titre) ? 'Marqué comme complété' : 'Marquer comme complété'}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
