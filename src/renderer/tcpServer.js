import net from 'net';
import { localTCP } from '@/config.json'
import client from '@/tcpClient'

var connections = {}
var logs = []
const server = net.createServer(socketHandler)

function socketHandler(sk) {
  sk.on('end', () => {
    logs.push(`connection closed from ${sk.remoteAddress}:${sk.remotePort}`)
  })

  sk.on('data', (buf) => {
    var data = buf.toString('utf8');
    console.log(data);
    client.socket.write(data);
  })

  sk.on('error', (e) => {
    logs.push(`connection closed from ${sk.remoteAddress}:${sk.remotePort}`)
    if (e.code !== 'ECONNRESET')
      console.log(e)
  })

  sk.pipe(sk);
}

server.listen(localTCP.port, '0.0.0.0', () => {
  logs.push(`open server on ${server.address().address}:${server.address().port}`)
});

export default {
  logs,
  server,
  port: localTCP.port,
  connections
}
