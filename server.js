const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hackaton'
});

// Simple test de connexion
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à WAMP MySQL:', err);
    process.exit(1); // Arrêter le serveur si pas de connexion
  }
  console.log('Connecté à WAMP MySQL');
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', 
      [email, hash],
      (err, result) => {
        if (err) {
          console.error('Erreur inscription:', err);
          return res.status(400).json({ error: 'Email déjà utilisé' });
        }
        res.json({ message: 'Inscription réussie' });
      }
    );
  } catch (err) {
    console.error('Erreur hash:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], 
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      if (!results.length) {
        return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
      }
      
      try {
        const match = await bcrypt.compare(password, results[0].password);
        if (!match) {
          return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }
        res.json({ message: 'Connexion réussie', userId: results[0].id });
      } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
      }
    }
  );
});

app.listen(3001, () => console.log('Serveur sur port 3001'));
