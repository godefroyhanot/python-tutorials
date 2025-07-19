import { useState, useEffect } from 'react';

export default function EspaceMembre() {
  const [pseudo, setPseudo] = useState("");
  const [logged, setLogged] = useState(false);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('completedTutos');
    if (stored) setCompleted(JSON.parse(stored));
    const pseudoStored = localStorage.getItem('pseudoMembre');
    if (pseudoStored) {
      setPseudo(pseudoStored);
      setLogged(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pseudo.trim()) {
      setLogged(true);
      localStorage.setItem('pseudoMembre', pseudo);
    }
  };
  const handleLogout = () => {
    setLogged(false);
    setPseudo("");
    localStorage.removeItem('pseudoMembre');
  };

  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Espace membre</h1>
      {!logged ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto">
          <label className="text-left font-medium">Pseudo
            <input type="text" value={pseudo} onChange={e => setPseudo(e.target.value)} className="mt-1 w-full border border-gray-300 rounded px-3 py-2" required />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">Se connecter</button>
        </form>
      ) : (
        <div className="text-center">
          <p className="mb-4">Bienvenue, <b>{pseudo}</b> !</p>
          <button onClick={handleLogout} className="mb-8 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Se déconnecter</button>
          <h2 className="text-xl font-semibold mt-8 mb-2">Historique des tutoriels complétés</h2>
          {completed.length === 0 ? (
            <p className="text-gray-500">Aucun tutoriel complété pour le moment.</p>
          ) : (
            <ul className="list-disc pl-6 text-left">
              {completed.map((titre, i) => <li key={i}>{titre}</li>)}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
