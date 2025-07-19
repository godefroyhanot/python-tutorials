export default function CalendrierEditorial() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Calendrier éditorial</h1>
      <p className="mb-6">Voici un exemple de calendrier éditorial pour la publication des tutoriels sur le réseau social choisi (Instagram) :</p>
      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Titre</th>
            <th className="border px-4 py-2">Format</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">01/10/2025</td>
            <td className="border px-4 py-2">Découverte de Python</td>
            <td className="border px-4 py-2">Vidéo</td>
            <td className="border px-4 py-2">Introduction au langage Python pour débutants</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">08/10/2025</td>
            <td className="border px-4 py-2">Les bases des variables</td>
            <td className="border px-4 py-2">PDF</td>
            <td className="border px-4 py-2">Comprendre l’utilisation des variables en Python</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">15/10/2025</td>
            <td className="border px-4 py-2">Premiers scripts</td>
            <td className="border px-4 py-2">Vidéo</td>
            <td className="border px-4 py-2">Créer et exécuter un script Python simple</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">22/10/2025</td>
            <td className="border px-4 py-2">Gestion des erreurs</td>
            <td className="border px-4 py-2">PDF</td>
            <td className="border px-4 py-2">Apprendre à gérer les erreurs et exceptions</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm text-gray-500">Ce calendrier est un exemple : il peut être adapté selon la production réelle et les besoins de la cible.</p>
    </main>
  );
}
