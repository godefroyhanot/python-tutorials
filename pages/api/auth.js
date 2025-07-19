// Simple authentication API route for Next.js (demo purpose only)
// In real-world, use a DB and hashed passwords!

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const { email, password } = req.body;

  // Demo: hardcoded user
  const DEMO_USER = { email: 'test@demo.com', password: 'python123' };

  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // Générer un token simple (à remplacer par JWT en prod)
    return res.status(200).json({ success: true, token: 'demo-token', user: { email } });
  } else {
    return res.status(401).json({ success: false, error: 'Identifiants invalides' });
  }
}
