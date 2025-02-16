const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Set your MySQL password
  database: 'userdb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Register Route
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.json({ success: false, message: 'All fields are required' });
  }

  // Check if email or username already exists
  const checkSql = 'SELECT * FROM users WHERE email = ? OR username = ?';
  db.query(checkSql, [email, username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    db.query(sql, [email, username, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: 'Registration failed' });
      }
      res.json({ success: true, message: 'User registered successfully' });
    });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: 'User not found' });
    }

    const user = results[0];
    console.log("DB User:", user); // Debugging

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordValid); // Debugging

    if (isPasswordValid) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Incorrect password' });
    }
  });
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
