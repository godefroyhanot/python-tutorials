/**
 * FICHIER _APP.JS - Point d'entrée principal de l'application Next.js
 * 
 * Ce fichier est automatiquement utilisé par Next.js pour wrapper toutes les pages.
 * Il permet de:
 * - Importer les styles globaux (CSS)
 * - Ajouter des providers globaux (Context, Redux, etc.)
 * - Persister l'état entre les changements de page
 * - Ajouter des composants communs (Layout, Analytics, etc.)
 * 
 * Documentation: https://nextjs.org/docs/advanced-features/custom-app
 */

// Import des styles CSS globaux - appliqués à toute l'application
import '../styles/globals.css';

/**
 * Composant App personnalisé - Wrapper de toutes les pages
 * 
 * @param {Object} props - Props automatiquement injectées par Next.js
 * @param {React.Component} props.Component - Le composant de page à rendre
 * @param {Object} props.pageProps - Les props spécifiques à la page
 * @returns {JSX.Element} La page wrappée avec les configurations globales
 */
export default function App({ Component, pageProps }) {
  // Rendu simple - retourne directement le composant de page
  // Ici on pourrait ajouter:
  // - Un Layout global avec Navbar/Footer
  // - Des providers de contexte
  // - Des composants d'analytics
  // - Une gestion d'erreurs globale
  
  return <Component {...pageProps} />;
}
