import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-blue-600">404</h1>
        <p className="text-xl mb-8">Oups, cette page n'existe pas !</p>
        <a href="/" className="text-blue-500 hover:underline">Retour à l'accueil</a>
      </main>
      <Footer />
    </>
  );
}
