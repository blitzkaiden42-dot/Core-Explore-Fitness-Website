const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --------------------- DATABASE ---------------------
const dbPath = path.resolve(__dirname, 'ngilo.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Database connection error:', err.message);
    else console.log('Connected to SQLite database at', dbPath);
});

// Create users table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        gender TEXT,
        age INTEGER
    )
`, (err) => {
    if (err) console.error('Error creating users table:', err.message);
    else console.log('Users table ready');
});

// --------------------- SIGNUP ---------------------
app.post('/signup', async (req, res) => {
    let { username, email, password, gender, age } = req.body;

    if (!username || !password || !email)
        return res.status(400).json({ message: "Username, email and password required" });

    username = username.toLowerCase();
    email = email.toLowerCase();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        db.run(
            `INSERT INTO users (id, username, email, password, gender, age) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, username, email, hashedPassword, gender, age],
            function(err) {
                if (err) {
                    if (err.message.includes("UNIQUE"))
                        return res.status(400).json({ message: "Username or email already exists" });
                    return res.status(500).json({ message: "Database error", error: err.message });
                }

                console.log(`User signed up: ${username} (ID: ${userId})`);
                res.json({ message: "Signup successful!", userId });
            }
        );

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// --------------------- LOGIN ---------------------
app.post('/login', (req, res) => {
    let { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password)
        return res.status(400).json({ message: "Username/email and password required" });

    usernameOrEmail = usernameOrEmail.toLowerCase();

    db.get(
        `SELECT * FROM users WHERE username = ? OR email = ?`,
        [usernameOrEmail, usernameOrEmail],
        async (err, user) => {
            if (err) return res.status(500).json({ message: "Database error" });

            console.log(`Login attempt for: ${usernameOrEmail}`);
            console.log("User found in DB:", user);

            if (!user)
                return res.status(400).json({ message: "Invalid username/email or password" });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ message: "Invalid username/email or password" });

            console.log(`User logged in: ${user.username}`);
            res.json({
                message: "Login successful!",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    gender: user.gender,
                    age: user.age
                }
            });
        }
    );
});

// --------------------- START SERVER ---------------------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
