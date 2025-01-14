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

function authenticateToken(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ message: 'unauthorized' });
  }
  next();
}

apiRouter.post('/auth', (req, res) => {
  assertParams(req.body, 'name', 'password');
  const user = users[req.body.name];
  if (user) {
    res.status(409).send({ msg: 'existing user' });
  } else {
    const token = uuid.v4().replace(/-/g, '');
    const user = { name: req.body.name, password: req.body.password, token };
    users[user.name] = user;

    res.send({ token: user.token });
  }
});

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

apiRouter.delete('/auth', authenticateToken, (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

apiRouter.get('/user', authenticateToken, (req, res) => {
  const user = req.user;
  res.send({ name: user.name, sounds: user.sounds || [] });
});

apiRouter.put('/user', authenticateToken, (req, res) => {
  res.send({ msg: 'upsert user' });
});

apiRouter.get('/events', authenticateToken, (req, res) => {
  res.send({ msg: 'get past events' });
});

app.use((req, res) => {
  res.status(404).send({ msg: 'Not Found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || 'Internal Server Error';
  res.status(status).send({ error: status, message: msg });
});

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
