import net from 'net'

export default {
  // 监听端口
  port: '4476',
  status: 'close',
  // tcp连接
  connections: {},
  /* 回调函数，处理socket的状态 */
  onclose: undefined,
  onerror: undefined,
  /* 处理server状态的回调函数 */
  errorCallback: undefined,
  closeCallback: undefined,
  listenCallback: undefined,
  /* socket的消息处理回调函数 */
  onconnect: undefined,
  ondisconnect: undefined,
  ondata: undefined,
  onstart: undefined,
  onstop: undefined,

  // 服务器启动方法
  Run() {
    var handler = this.createHandler();
    var server = this.genServer(handler);
    server.listen(this.port, '0.0.0.0');
  },

  // 创建socket handler
  createHandler() {
    return socket => {
      socket.on('ready', () => {
        // 预留
        console.log('socket ready')
      });

      socket.on('close', isError => {
        if (isError) return
        if (this.onclose) this.onclose(socket);
        if (this.ondisconnect) this.ondisconnect(socket);
      });

      socket.on('error', e => {
        if (this.onerror) this.onerror(socket, e);
        if (this.ondisconnect) this.ondisconnect(socket);
      });

      socket.on('data', buf => {
        var data = buf.toString('utf8')
        data.split('@').filter(msg => msg).forEach(msg => {
          var matches
          // 连接信息
          if (matches = msg.match(/^connect:(\w+)$/)) {
            if (matches.length > 1) {
              if (this.onconnect) this.onconnect(matches[1], socket);
            }
            return;
          }

          // // 断连
          // if (matches = msg.match(/^disconn:(\w+)$/)) {
            // if (matches.length > 1) {
              // if (this.ondisconnect) this.ondisconnect(matches[1], socket);
            // }
            // return;
          // }

          // 开始
          if (msg.match(/^start$/)) {
            if (this.onstart) this.onstart(socket);
            return;
          }

          // 停止
          if (msg.match(/^stop$/)) {
            if (this.onstop) this.onstop(socket);
            return
          }
          // 数据接收
          // 数据匹配 浮点数，整数，布尔，字符串类型
          if (matches = msg.match(/^data:(\w+):([\w\.]+)$/)) {
            if (matches.length > 2) {
              if (this.ondata) this.ondata({
                sign: matches[1],
                value: matches[2]
              }, socket);
            }
            return
          }
        })
      });

      socket.pipe(socket);
    }
  },

  // 创建服务器
  genServer(handler) {
    var server = net.createServer(handler);

    server.on('close', () => {
      this.status = 'close';
      if (this.closeCallback) this.closeCallback();
    });

    server.on('error', e => {
      this.status = 'error';
      console.log(e);
      if (this.errorCallback) this.errorCallback(e);
    });

    server.on('listening', () => {
      this.status = 'listening';
      if (this.listenCallback) this.listenCallback(this.port);
    });

    return server
  }
}
