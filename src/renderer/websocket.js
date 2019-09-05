var url = ''

if (process.env.NODE_ENV === 'development') {
  url = 'ws://localhost/websocket'
} else if (process.env.NODE_ENV === 'production') {
  url = 'ws://info.sasuke.cn/websocket'
}

const ws = new WebSocket(url)

ws.onmessage = ({ data }) => {
  console.log(data)
}

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'connection_init' }))
}

export default ws
