const WebSocket = require('ws');
console.log('start');
const wss = new WebSocket.Server({ port: 8989 });

const users = []

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', (ws) => {
  let index = 0;
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    //console.log(message);
    switch (data.type) {
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws)
        break
      default:
        break
    }
  })

  ws.on('close', () => {
    users.splice(index, 1)
    broadcast({
      users
    }, ws)
  })
})
