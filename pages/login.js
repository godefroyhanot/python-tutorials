import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Connexion / Inscription</h2>
        <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4" onSubmit={e => { e.preventDefault(); alert('Simulation : Pas de backend, connexion fictive !'); }}>
          <label className="text-left font-medium">Email
            <input type="email" name="email" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="text-left font-medium">Mot de passe
            <input type="password" name="password" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">Se connecter / S'inscrire</button>
        </form>
        <p className="text-center text-gray-500 mt-8 text-sm">Simulation pédagogique : aucune donnée n'est réellement enregistrée.</p>
      </main>
      <Footer />
    </>
  );
}
