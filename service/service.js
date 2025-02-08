const express = require('express');
const app = express();
const uuid = require('uuid');
const db = require('./database');

app.use(express.json());
app.use(express.static('public'));
app.use(setAuthUser);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Check for a token in the Authorization header and set the user on the request object.
async function setAuthUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [authType, token] = authHeader.split(' ');
    if (authType.toLowerCase() === 'bearer' && token) {
      try {
        req.user = await db.getUserByToken(token);
      } catch {
        req.user = null;
      }
    }
  }
  next();
}

// Middleware to check for a user on the request object. This will be present if the user is authenticated.
function authenticateToken(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ message: 'unauthorized' });
  }
  next();
}

// Register a new user.
apiRouter.post('/auth', async (req, res) => {
  assertParams(req.body, 'email', 'password');
  const user = await db.getUser(req.body.email);
  if (user) {
    res.status(409).send({ msg: 'existing user' });
  } else {
    const token = generateAuthToken();
    const user = { email: req.body.email, password: req.body.password, token, sounds: [] };
    await db.addUser(user);

    res.send({ email: user.email, sounds: user.sounds, token: user.token });
  }
});

// Login a user.
apiRouter.put('/auth', async (req, res) => {
  assertParams(req.body, 'email', 'password');
  const user = await db.getUser(req.body.email);
  if (!user || req.body.password !== user.password) {
    res.status(401).send({ msg: 'unauthorized' });
  } else {
    user.token = generateAuthToken();
    await db.updateUser(user);
    res.send(user);
  }
});

// Logout a user.
apiRouter.delete('/auth', async (req, res) => {
  if (req.user) {
    const user = await db.getUserByToken(req.user.token);
    if (user) {
      delete user.token;
      await db.updateUser(user);
    }
  }
  res.send({ msg: 'logged out' });
});

// Get the active user.
apiRouter.get('/user', authenticateToken, (req, res) => {
  const user = req.user;
  res.send({ email: user.email, sounds: user.sounds });
});

// Update the active user.
apiRouter.put('/user', authenticateToken, async (req, res) => {
  assertParams(req.body, 'email');
  const user = await db.getUser(req.body.email);
  if (user) {
    user.sounds = req.body.sounds;
    await db.updateUser(user);
    res.send(user);
  } else {
    res.status(404).send({ msg: 'not found' });
  }
});

// Get all of the possible sounds.
apiRouter.get('/events', (req, res) => {
  res.send({ sounds: ['rain', 'thunder', 'waves', 'bowl', 'static', 'wind', 'cs260'] });
});

// Not found handler.
app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Default error handler.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || 'Internal Server Error';
  res.status(status).send({ error: status, message: msg });
});

// Generate a random authorization token.
function generateAuthToken() {
  return uuid.v4().replace(/-/g, '');
}

// Check for required parameters in the request body.
function assertParams(body, ...params) {
  params.forEach((param) => {
    if (!body[param]) {
      const error = new Error(`missing parameter: ${param}`);
      error.status = 400;
      throw error;
    }
  });
}

module.exports = app;
