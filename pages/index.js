import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [tutos, setTutos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetch('/data/tutoriels.json')
      .then(res => res.json())
      .then(data => setTutos(data));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('completedTutos');
    if (stored) setCompleted(JSON.parse(stored));
  }, []);
  const markCompleted = (titre) => {
    const updated = [...completed, titre];
    setCompleted(updated);
    localStorage.setItem('completedTutos', JSON.stringify(updated));
  };

  const filteredTutos = tutos.filter(tuto => {
    const matchFormat = filter === 'all' || tuto.format === filter;
    const matchCat = catFilter === 'all' || tuto.categorie === catFilter;
    const matchSearch =
      tuto.titre.toLowerCase().includes(search.toLowerCase()) ||
      (tuto.description && tuto.description.toLowerCase().includes(search.toLowerCase()));
    return matchFormat && matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Présentation avec photo de profil */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-8 md:gap-16">
          <div className="order-2 md:order-1 flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">Bienvenue sur mon site de tutoriels Python !</h2>
            <p className="text-lg md:text-xl mb-4 max-w-2xl text-center md:text-left">
              Je suis étudiant à la Normandie Web School en tant que développeur web. Retrouvez ici tous mes tutoriels Python réalisés au premier semestre de ma deuxième année, sous différents formats (vidéo, texte, images). Apprenez à coder facilement et à votre rythme !
            </p>
          </div>
          <div className="order-1 md:order-2 flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto">
            <img src="/photo_a2.jpg" alt="Photo de profil" className="w-52 h-64 md:w-64 md:h-80 rounded-xl shadow-lg object-cover object-top" style={{aspectRatio:'4/5'}} />
          </div>
        </div>

        {/* Section complète Tutoriels */}
        <section className="w-full max-w-5xl bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Liste des tutoriels</h2>
          {/* Filtres format */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <button className="filter-btn bg-blue-100 text-blue-800 px-4 py-2 rounded" onClick={() => setFilter('all')}>Tous</button>
            <button className="filter-btn bg-blue-100 text-blue-800 px-4 py-2 rounded" onClick={() => setFilter('video')}>Vidéos</button>
            <button className="filter-btn bg-green-100 text-green-800 px-4 py-2 rounded" onClick={() => setFilter('pdf')}>PDF</button>
          </div>
          {/* Filtres catégories (extraites dynamiquement) */}
          {Array.from(new Set(tutos.map(t => t.categorie).filter(Boolean))).length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button className="filter-btn bg-gray-100 text-gray-800 px-4 py-2 rounded" onClick={() => setCatFilter('all')}>Toutes catégories</button>
              {Array.from(new Set(tutos.map(t => t.categorie).filter(Boolean))).map(cat => (
                <button key={cat} className="filter-btn bg-gray-100 text-gray-800 px-4 py-2 rounded" onClick={() => setCatFilter(cat)}>{cat}</button>
              ))}
            </div>
          )}
          {/* Barre de recherche */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Rechercher un tutoriel..."
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* Tutoriels complétés */}
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
          {/* Liste des tutoriels filtrés */}
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
        </section>

        {/* Section Contact */}
        <section className="w-full max-w-lg bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Contactez-moi</h2>
          <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4" action="mailto:VOTRE_EMAIL@exemple.com" method="POST" encType="text/plain">
            <label className="text-left font-medium">Nom
              <input type="text" name="nom" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </label>
            <label className="text-left font-medium">Email
              <input type="email" name="email" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </label>
            <label className="text-left font-medium">Message
              <textarea name="message" required rows={5} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </label>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">Envoyer</button>
          </form>
          <p className="text-center text-gray-500 mt-8 text-sm">Remplacez l'adresse email dans le formulaire par la vôtre !</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

