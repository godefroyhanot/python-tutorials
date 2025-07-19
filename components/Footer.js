export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm">&copy; {new Date().getFullYear()} Python Tutorials - Tous droits réservés.</span>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0 items-center text-xs">
          <span className="mb-1 md:mb-0">Travail pédagogique sans objectifs commerciaux</span>
          <a href="/mentions-legales" className="hover:underline mb-1 md:mb-0 md:ml-2">Mentions légales</a>
          <span className="mb-1 md:mb-0 md:ml-2">Conforme à la législation RGPD</span>
          <a href="/a-propos" className="hover:underline md:ml-2">À propos</a>
          <a href="/contact" className="hover:underline md:ml-2">Contact</a>
        </div>
      </div>
    </footer>
  );
}
