import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Tutoriels Python</h1>
        <nav>
          <Link href="/" className="text-gray-700 hover:text-blue-500 mx-2">Accueil</Link>
          <Link href="/tutoriels" className="text-gray-700 hover:text-blue-500 mx-2">Tutoriels</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500 mx-2">Contact</Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-500 mx-2">Connexion</Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-500 mx-2">Admin</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 mx-2">À propos</Link>
        </nav>
      </div>
    </header>
  );
}
