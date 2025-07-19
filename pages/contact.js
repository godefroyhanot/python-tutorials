import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Contactez-moi</h2>
        <form className="bg-white rounded-lg shadow p-8 flex flex-col gap-4" action="mailto:VOTRE_EMAIL@exemple.com" method="POST" encType="text/plain">
          <label className="text-left font-medium">Nom
            <input type="text" name="nom" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="text-left font-medium">Email
            <input type="email" name="email" required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </label>
          <label className="text-left font-medium">Message
            <textarea name="message" required rows={5} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
          </label>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">Envoyer</button>
        </form>
        <p className="text-center text-gray-500 mt-8 text-sm">Remplacez l'adresse email dans le formulaire par la vôtre !</p>
      </main>
      <Footer />
    </>
  );
}
