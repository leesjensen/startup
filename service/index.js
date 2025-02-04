const app = require('./service');
const peerProxy = require('./peerProxy');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(server, () => {
  console.log(`Websocket communication enabled`);
});
