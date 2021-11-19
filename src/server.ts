import http from 'http';

import app from './app';
import socket from './socket';

const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port, () => console.log(`>> listen on port ${port}`));

socket.initialize(server);

process.on('uncaughtException', function (err) {
  console.log('uncaughtException');
  console.error(err.stack);
});
