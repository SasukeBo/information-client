import net from 'net';
import { localTCP } from '@/config.json'
import client from '@/tcpClient'

var connections = {}
var logs = []
var server

const tcpServer = {
  connections,
  logs,
  count: 0,
  server,
  createServer,
  port: localTCP.port
}


function socketHandler(sk) {
  sk.on('end', () => {
    var time = new Date();
    logs.push({
      status: 'warning',
      message: `来自 ${sk.remoteAddress} : ${sk.remotePort} 的连接已断开`,
      time: time.toLocaleString()
    })

    tcpServer.count--
  })

  sk.on('data', (buf) => {
    var data = buf.toString('utf8');
    console.log(data);
    client.socket.write(data);
  })

  sk.on('error', (e) => {
    var status, message
    if (e.code !== 'ECONNRESET') {
      status = 'error'
      message = e.message
      console.log(e)
    } else {
      status = 'warning'
      message = `来自 ${sk.remoteAddress} : ${sk.remotePort} 的连接已断开`
    }

    var time = new Date();
    logs.push({
      status,
      message,
      time: time.toLocaleString()
    })

    tcpServer.count--
  })

  sk.pipe(sk);
}

function createServer() {
  server = net.createServer(socketHandler)

  server.listen(localTCP.port, '0.0.0.0', () => {
    var time = new Date();
    logs.push({
      status: 'success',
      message: `TCP服务器正在监听 ${server.address().address} : ${server.address().port}`,
      time: time.toLocaleString()
    })
  })

  server.on('connection', sk => {
    tcpServer.count++
    var time = new Date();
    logs.push({
      status: 'success',
      message: `来自 ${sk.remoteAddress} : ${sk.remotePort} 的连接已建立`,
      time: time.toLocaleString()
    });
    tcpServer.connections[`${sk.remoteAddress} : ${sk.remotePort}`] = sk
  })

  return server
}

export default tcpServer
