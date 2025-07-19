import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [pseudo, setPseudo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = localStorage.getItem('pseudoMembre');
      setPseudo(p || null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('pseudoMembre');
    setPseudo(null);
    router.push('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo Python officiel */}
          <img src="/python-logo.svg" alt="Logo Python" width="40" height="40" className="mr-2" />
          <h1 className="text-2xl font-bold text-blue-700 font-mono tracking-tight">Tutoriels Python</h1>
        </div>
        <nav>
          <Link href="/" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">Accueil</Link>
          <Link href="/tutoriels" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">Tutoriels</Link>
          <Link href="/contact" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">Contact</Link>
          <Link href="/login" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">Connexion</Link>
          <Link href="/admin" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">Admin</Link>
          <Link href="/about" className="text-blue-900 hover:text-yellow-400 mx-2 font-semibold transition-colors">À propos</Link>
        </nav>
        {pseudo && (
          <div className="ml-4 flex items-center gap-2 text-sm text-blue-900 bg-yellow-100 px-3 py-1 rounded shadow-sm">
            <span>Connecté : <span className="font-bold">{pseudo}</span></span>
            <button onClick={handleLogout} className="ml-2 text-red-500 hover:underline">Déconnexion</button>
          </div>
        )}
      </div>
    </header>
  );
}

