import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Administration (Simulation)</h2>
        <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4" onSubmit={e => { e.preventDefault(); alert('Simulation : Pas de backend, ajout fictif !'); }}>
          <label className="text-left font-medium">Titre du tutoriel
            <input type="text" name="titre" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="text-left font-medium">Format
            <select name="format" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2">
              <option value="pdf">PDF</option>
              <option value="video">Vidéo</option>
            </select>
          </label>
          <label className="text-left font-medium">Fichier
            <input type="file" name="fichier" className="mt-1 w-full border border-gray-300 rounded px-3 py-2" />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">Ajouter le tutoriel</button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">Simulation pédagogique : aucune modification réelle des tutoriels.</div>
      </main>
      <Footer />
    </>
  );
}
