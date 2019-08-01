import net from 'net'
import { cloudServer } from '@/config.json'

var logs = []
var socket

function createClient() {
  socket = new net.Socket()
  socket.connect({ port: cloudServer.port, host: cloudServer.host })

  socket.on('connect', () => {
    var now = new Date()
    logs.push({
      status: 'success',
      message: '成功连接到上传服务器',
      time: now.toLocaleString()
    })
  })

  socket.on('close', (e) => {
    if (e) return
    var now = new Date()
    logs.push({
      status: 'warning',
      message: '与上传服务器的连接已断开',
      time: now.toLocaleString()
    })
  })

  socket.on('end', () => {
    var now = new Date()
    logs.push({
      status: 'warning',
      message: '与上传服务器的连接已结束',
      time: now.toLocaleString()
    })
  })

  socket.on('error', (e) => {
    var now = new Date()
    logs.push({
      status: 'error',
      message: e.message,
      time: now.toLocaleString()
    })
  })

  return socket
}


export default {
  logs,
  socket,
  createClient,
  port: cloudServer.port,
  host: cloudServer.host
}
