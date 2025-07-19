export default function MentionsLegales() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>
      <p className="mb-4"><b>Travail pédagogique sans objectifs commerciaux</b></p>
      <p className="mb-4">Ce site a été réalisé dans le cadre d’un projet étudiant à la Normandie Web School. Il n’a aucune vocation commerciale.</p>
      <p className="mb-4">Conformité RGPD : aucune donnée personnelle n’est collectée ni stockée côté serveur. Les seules informations éventuellement enregistrées localement (progression des tutoriels) le sont sur votre appareil et ne sont pas transmises.</p>
      <p className="mb-4">Responsable du site : Godefroy (étudiant NWS)</p>
      <p className="mb-4">Hébergeur : Vercel/Netlify (selon déploiement)</p>
      <p className="mt-8 text-sm text-gray-500">Pour toute question, contactez-moi via la page <a href="/contact" className="underline">Contact</a>.</p>
    </main>
  );
}
