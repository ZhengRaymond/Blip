// const io = require('socket.io')();
//
// const port = 8000;
//
// io.on('connection', (client) => {
//   console.log('Connected to: ' + JSON.stringify(client));
//
//   client.on('subscribeToBlips', (interval) => {
//     console.log('client is subscribing to blips with interval ', interval);
//     setInterval(() => {
//       client.emit('blips', )
//     })
//   })
// });
//
// io.listen(port);
// console.log('Socket.io listening on port ', port);
