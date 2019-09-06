var url = ''

if (process.env.NODE_ENV === 'development') {
  url = 'ws://localhost:9081/websocket'
} else if (process.env.NODE_ENV === 'production') {
  url = 'ws://39.108.194.93/websocket'
}

const ws = new WebSocket(url)

ws.onmessage = ({ data }) => {
  console.log(data)
}

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'connection_init' }))
}

export default ws
