import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TutorielDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tuto, setTuto] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch('/data/tutoriels.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => String(t.id) === String(id));
        setTuto(found);
      });
    setCompleted(JSON.parse(localStorage.getItem('completedTutos') || '[]'));
  }, [id]);

  const markCompleted = (titre) => {
    if (!completed.includes(titre)) {
      const updated = [...completed, titre];
      setCompleted(updated);
      localStorage.setItem('completedTutos', JSON.stringify(updated));
    }
  };

  if (!tuto) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="text-gray-500">Chargement du tutoriel...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{tuto.titre}</h2>
        <span className={`px-2 py-1 rounded text-xs mb-4 inline-block ${tuto.format === 'video' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>{tuto.format.toUpperCase()}</span>
        <p className="mb-6 text-gray-700">{tuto.description}</p>
        {tuto.format === 'video' ? (
          <video controls className="w-full rounded mb-4">
            <source src={tuto.fichier} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        ) : (
          <iframe
            src={tuto.fichier}
            className="w-full h-96 rounded mb-4"
            title={tuto.titre}
          ></iframe>
        )}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <a
            href={tuto.fichier}
            download
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Télécharger
          </a>
          <button
            onClick={() => markCompleted(tuto.titre)}
            disabled={completed.includes(tuto.titre)}
            className={`px-4 py-2 rounded shadow transition ${completed.includes(tuto.titre) ? 'bg-green-400 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
          >
            {completed.includes(tuto.titre) ? 'Déjà complété' : 'Marquer comme complété'}
          </button>
        </div>
        <a href="/tutoriels" className="text-blue-600 hover:underline">← Retour à la liste</a>
      </main>
      <Footer />
    </>
  );
}
