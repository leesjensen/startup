const express = require('express');
const app = express();
const uuid = require('uuid');

const users = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));
app.use(setAuthUser);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Check for a token in the Authorization header and set the user on the request object.
function setAuthUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        req.user = Object.values(users).find((u) => u.token === token);
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
apiRouter.post('/auth', (req, res) => {
  assertParams(req.body, 'name', 'password');
  const user = users[req.body.name];
  if (user) {
    res.status(409).send({ msg: 'existing user' });
  } else {
    const token = uuid.v4().replace(/-/g, '');
    const user = { name: req.body.name, password: req.body.password, token, sounds: [] };
    users[user.name] = user;

    res.send({ name: user.name, sounds: [] });
  }
});

// Login a user.
apiRouter.put('/auth', (req, res) => {
  assertParams(req.body, 'name', 'password');
  const user = users[req.body.name];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'unauthorized' });
});

// Logout a user.
apiRouter.delete('/auth', authenticateToken, (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// Get the current user.
apiRouter.get('/user', authenticateToken, (req, res) => {
  const user = req.user;
  res.send({ name: user.name, sounds: user.sounds });
});

// Update the current user.
apiRouter.put('/user', authenticateToken, (req, res) => {
  assertParams(req.body, 'sounds');
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    res.send({ name: user.name, sounds: req.body.sounds });
    return;
  }
  res.status(404).send({ msg: 'not found' });
});

// Get all of the possible sounds.
apiRouter.get('/events', authenticateToken, (req, res) => {
  res.send({ sounds: ['rain', 'thunder', 'waves', 'bowl', 'static', 'wind'] });
});

// Not found handler.
app.use((req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

// Default error handler.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || 'Internal Server Error';
  res.status(status).send({ error: status, message: msg });
});

// Helper function to check for required parameters in the request body.
function assertParams(body, ...params) {
  params.forEach((param) => {
    if (!body[param]) {
      const error = new Error(`missing parameter: ${param}`);
      error.status = 400;
      throw error;
    }
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
