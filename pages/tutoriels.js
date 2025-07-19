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
    fetch('/data/tutoriels.json')
      .then(res => res.json())
      .then(data => {
        setTutos(data);
        // Extraire dynamiquement les catégories
        const cats = Array.from(new Set(data.map(t => t.categorie).filter(Boolean)));
        setCategories(cats);
      });
    setCompleted(JSON.parse(localStorage.getItem('completedTutos') || '[]'));
  }, []);

  const markCompleted = (titre) => {
    const updated = [...completed, titre];
    setCompleted(updated);
    localStorage.setItem('completedTutos', JSON.stringify(updated));
  };

  let filteredTutos = tutos
    .filter(t => filter === 'all' || t.format === filter)
    .filter(t => catFilter === 'all' || t.categorie === catFilter)
    .filter(t => t.titre.toLowerCase().includes(search.toLowerCase()));

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
              <h3 className="text-xl font-semibold mb-2">{tuto.titre}</h3>
              {tuto.categorie && <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs mb-2">{tuto.categorie}</span>}
              <span className={`inline-block px-3 py-1 rounded text-xs mb-2 ${tuto.format === 'pdf' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>Format : {tuto.format === 'pdf' ? 'PDF' : 'Vidéo'}</span>
              <p className="mb-4">{tuto.description}</p>
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
