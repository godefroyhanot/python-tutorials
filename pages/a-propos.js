export default function APropos() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">À propos</h1>
      <p className="mb-4">Ce site a pour objectif de regrouper et partager les tutoriels Python réalisés au premier semestre de la 2e année à la Normandie Web School.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Charte éditoriale</h2>
      <ul className="list-disc pl-6 mb-4 text-left">
        <li>Accessibilité et clarté des contenus pour tous les niveaux.</li>
        <li>Respect des droits d’auteur et des sources.</li>
        <li>Pas d’utilisation commerciale des contenus.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Justification graphique</h2>
      <p className="mb-4">Le site adopte une charte graphique moderne, épurée et cohérente avec l’univers Python, utilisant Tailwind CSS pour garantir la lisibilité et l’accessibilité sur tous supports.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Réseau social choisi</h2>
      <p className="mb-4">Instagram a été choisi pour sa popularité auprès de la cible étudiante et la facilité de partager des extraits de tutoriels en vidéo et images.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>Pour toute question, suggestion ou demande de collaboration, merci d’utiliser la page <a href="/contact" className="underline">Contact</a>.</p>
    </main>
  );
}
