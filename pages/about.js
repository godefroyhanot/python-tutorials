import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <h2 className="text-2xl font-bold mb-8 text-center">À propos / Mentions légales</h2>
        <div className="bg-white rounded-lg shadow p-8 text-left">
          <p className="mb-4"><b>Travail pédagogique sans objectifs commerciaux.</b></p>
          <p className="mb-4">Ce site a été réalisé dans le cadre d’un projet étudiant à la Normandie Web School. Il regroupe des tutoriels Python sous différents formats (vidéo, PDF, etc.).</p>
          <p className="mb-4">Conformité RGPD : aucune donnée personnelle n’est collectée ni stockée sur ce site.</p>
          <p className="mb-4">Contact : <a href="mailto:VOTRE_EMAIL@exemple.com" className="text-blue-500 underline">VOTRE_EMAIL@exemple.com</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
