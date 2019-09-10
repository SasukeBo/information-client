const client = {
  ws: undefined,
  onmessage: undefined,
  onopen: undefined,
  onclose: undefined,
  url() {
    if (process.env.NODE_ENV === 'development') {
      return 'ws://localhost:9081/websocket'
    } else if (process.env.NODE_ENV === 'production') {
      return 'ws://info.protron.cn/websocket'
    }
  },
  init() {
    this.onopen = () => {
      this.ws.send(JSON.stringify({ type: 'connection_init' }))
    }
    this.onclose = () => {
      setTimeout(() => {
        this.createWS();
      }, 1000);
    }
    this.onmessage = ({ data }) => {
      console.log(data)
    }
    this.createWS()
  },
  createWS() {
    this.ws = new WebSocket(this.url());
    this.ws.onclose = this.onclose;
    this.ws.onmessage = this.onmessage;
    this.ws.onopen = this.onopen;
  },
  send(data) {
    this.ws.send(data);
  }
}

export default client
