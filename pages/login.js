import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'register' ? { email, password, pseudo } : { email, password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        if (mode === 'register' && data.user && data.user.pseudo) {
          localStorage.setItem('pseudoMembre', data.user.pseudo);
        }
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          // Redirection après connexion réussie
          if (mode === 'login') {
            setTimeout(() => router.push('/espace-membre'), 1000);
          }
        }
      } else {
        setError(data.error || (mode === 'login' ? 'Identifiants invalides' : "Impossible de créer le compte"));
      }
    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">{mode === 'login' ? 'Connexion' : 'Inscription'}</h2>
        <div className="flex justify-center mb-6">
          <button onClick={() => setMode('login')} className={`px-4 py-2 rounded-l-lg border ${mode==='login' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Se connecter</button>
          <button onClick={() => setMode('register')} className={`px-4 py-2 rounded-r-lg border -ml-px ${mode==='register' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>Créer un compte</button>
        </div>
        <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="text-left font-medium">Pseudo
              <input type="text" name="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </label>
          )}
          <label className="text-left font-medium">Email
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="text-left font-medium">Mot de passe
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition" disabled={loading}>
            {loading ? (mode === 'login' ? 'Connexion...' : 'Création...') : (mode === 'login' ? 'Se connecter' : 'Créer un compte')}
          </button>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{mode === 'login' ? 'Connexion réussie !' : 'Compte créé ! Vous pouvez vous connecter.'}</div>}
        </form>
      </main>
      <Footer />
    </>
  );
}


