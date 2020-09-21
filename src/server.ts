import app from './app';

const server = app.listen(process.env.PORT || 3333);

server.on('error', (err: Error) => {
  console.log('>>> uncaught error');
  console.log(err);
});

server.on('listening', () =>
  console.log('>> listening on port ' + process.env.PORT || 3333)
);
