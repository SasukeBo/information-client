const ws = new WebSocket(`ws://${document.location.host}/websocket`)

ws.onmessage = ({ data }) => {
  console.log(data)
}

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'connection_init' }))
}

export default ws
