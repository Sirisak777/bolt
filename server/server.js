import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersFile = './users.json';

function loadUsers() {
  return JSON.parse(fs.readFileSync(usersFile));
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.post('/register', (req, res) => {
  const { email, password, shopName, name } = req.body;
  const users = loadUsers();

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    shopName,
    name,
  };

  users.push(newUser);
  saveUsers(users);

  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ message: 'User registered successfully', user: userWithoutPassword });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
