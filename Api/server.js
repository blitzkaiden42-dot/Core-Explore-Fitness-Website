const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./ngilo.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the Ngilo database.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT
  )
`, (err) => {
  if (err) console.error('Error creating users table:', err.message);
});


app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    db.run(
      `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
      [userId, name, email, hashedPassword],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(400).json({ message: 'Email already exists' });
        }
        res.json({ message: 'User registered successfully', userId });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (!row) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const match = await bcrypt.compare(password, row.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      res.json({ message: `Welcome ${row.name}`, userId: row.id, name: row.name });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
