import { useState } from 'react';

export default function Footer() {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm">&copy; {new Date().getFullYear()} Python Tutorials - Tous droits réservés.</span>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0 items-center text-xs">
          <span className="mb-1 md:mb-0">Travail pédagogique sans objectifs commerciaux</span>
          <a href="/mentions-legales" className="hover:underline mb-1 md:mb-0 md:ml-2">Mentions légales</a>
          <span className="mb-1 md:mb-0 md:ml-2">Conforme à la législation RGPD</span>
          <button onClick={() => setShowAbout(true)} className="hover:underline md:ml-2">À propos</button>
        </div>
      </div>
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button onClick={() => setShowAbout(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-center">À propos</h2>
            <p className="mb-4"><b>Travail pédagogique sans objectifs commerciaux.</b></p>
            <p className="mb-4">Ce site a été réalisé dans le cadre d’un projet étudiant à la Normandie Web School. Il regroupe des tutoriels Python sous différents formats (vidéo, PDF, etc.).</p>
            <p className="mb-4">Conformité RGPD : aucune donnée personnelle n’est collectée ni stockée sur ce site.</p>
          </div>
        </div>
      )}
    </footer>
  );
}
