import { cloudServer } from '@/config.json'
const net = require('net')

var logs = []

function createClient() {
  var socket = net.createConnection({
    port: cloudServer.port,
    host: cloudServer.host
  })

  socket.on('connect', () => {
    var now = new Date()
    logs.unshift({
      status: 'success',
      message: '成功连接到上传服务器',
      time: now.toLocaleString()
    })
  })

  socket.on('close', (e) => {
    if (e) return
    var now = new Date()
    logs.unshift({
      status: 'warning',
      message: '与上传服务器的连接已断开',
      time: now.toLocaleString()
    })
  })

  socket.on('end', () => {
    var now = new Date()
    logs.unshift({
      status: 'warning',
      message: '与上传服务器的连接已结束',
      time: now.toLocaleString()
    })
  })

  socket.on('error', (e) => {
    var now = new Date()
    logs.unshift({
      status: 'error',
      message: e.message,
      time: now.toLocaleString()
    })
  })

  socket.pipe(socket)
  return socket
}


export default {
  logs,
  socket: null,
  createClient,
  port: cloudServer.port,
  host: cloudServer.host
}
