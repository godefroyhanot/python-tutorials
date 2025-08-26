/**
 * COMPOSANT NAVBAR - Barre de navigation principale
 * 
 * Fonctionnalités:
 * - Navigation entre les pages principales
 * - Affichage du statut de connexion utilisateur
 * - Gestion de la déconnexion
 * - Interface d'administration pour l'utilisateur "godefroy"
 * 
 * État: Utilise localStorage pour persister l'état de connexion
 * Style: Tailwind CSS avec thème Python (bleu/jaune)
 */

import Link from 'next/link';           // Composant de navigation Next.js
import { useEffect, useState } from 'react'; // Hooks React pour l'état et les effets
import { useRouter } from 'next/router';     // Hook de routage Next.js

/**
 * Composant de barre de navigation responsive
 * @returns {JSX.Element} Interface de navigation avec authentification
 */
export default function Navbar() {
  // État local pour stocker le pseudo de l'utilisateur connecté
  const [pseudo, setPseudo] = useState(null);
  const router = useRouter();

  // Effet pour récupérer les informations de connexion au chargement
  useEffect(() => {
    // Vérification côté client uniquement (évite les erreurs SSR)
    if (typeof window !== 'undefined') {
      // Récupération du pseudo depuis le localStorage
      const p = localStorage.getItem('pseudoMembre');
      setPseudo(p || null);
    }
  }, []); // Tableau de dépendances vide = exécution une seule fois

  /**
   * Fonction de déconnexion
   * - Supprime les données d'authentification du localStorage
   * - Remet à zéro l'état local
   * - Redirige vers la page de connexion
   */
  const handleLogout = () => {
    localStorage.removeItem('auth_token');    // Suppression du token JWT
    localStorage.removeItem('pseudoMembre');  // Suppression du pseudo
    setPseudo(null);                         // Mise à jour de l'état React
    router.push('/login');                   // Redirection vers login
  };

  // Rendu du composant JSX
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        
        {/* Section logo et titre */}
        <div className="flex items-center gap-3">
          {/* Logo Python officiel - améliore l'identité visuelle */}
          <img src="/python-logo.svg" alt="Logo Python" width="40" height="40" className="mr-2" />
          <h1 className="text-2xl font-bold text-blue-700 font-mono tracking-tight">
            Tutoriels Python
          </h1>
        </div>
        
        {/* Menu de navigation principal */}
        <nav>
          {/* Lien vers la page d'accueil */}
          <Link href="/" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">
            Accueil
          </Link>
          
          {/* Lien vers la liste des tutoriels */}
          <Link href="/tutoriels" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">
            Tutoriels
          </Link>
          
          {/* Affichage conditionnel du lien de connexion */}
          {/* Visible uniquement si l'utilisateur n'est PAS connecté */}
          {!pseudo && (
            <Link href="/login" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">
              Connexion
            </Link>
          )}
          
          {/* Interface d'administration - accès restreint */}
          {/* Visible uniquement pour l'utilisateur "godefroy" */}
          {pseudo && pseudo.toLowerCase() === 'godefroy' && (
            <Link href="/admin" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">
              Admin
            </Link>
          )}
          
          {/* Lien vers la page à propos */}
          <Link href="/about" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">
            À propos
          </Link>
        </nav>
        
        {/* Section utilisateur connecté */}
        {/* Affiche les informations de l'utilisateur et le bouton de déconnexion */}
        {pseudo && (
          <div className="ml-4 flex items-center gap-2 text-sm text-blue-900 bg-yellow-100 px-3 py-1 rounded shadow-sm">
            <span>
              Connecté : <span className="font-bold">{pseudo}</span>
            </span>
            {/* Bouton de déconnexion avec style distinctif */}
            <button 
              onClick={handleLogout} 
              className="ml-2 text-red-500 hover:underline"
              title="Se déconnecter du compte"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

