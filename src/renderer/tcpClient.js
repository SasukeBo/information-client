import net from 'net';
import { cloudServer } from '@/config.json'


const socket = new net.Socket()

socket.connect({port: cloudServer.port, host: cloudServer.host})

export default {
  socket,
  port: cloudServer.port,
  host: cloudServer.host
}
