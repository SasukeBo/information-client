<template>
  <div class="server-config">
    <div class="page-title">服务器状态</div>

    <div style="display: flex;">
      <div style="flex: auto">
        <div>上传服务器</div>
        <div>
          <div>IP {{ tcpClient.host }}</div>
          <div>Port {{ tcpClient.port }}</div>
          <div>连接状态：{{ tcpClientStatus }}</div>
        </div>
      </div>

      <div style="flex: auto">
        <div>本地TCP服务器</div>
        <div>
          <div>Port {{ tcpServer.port }}</div>
          <div>连接状态：{{ tcpServerStatus }}</div>
        </div>
        <div>
          <div>Logs</div>
          <div v-for="(l, i) in tcpServerLogs" :key="i">{{ l }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tcpClient from '@/tcpClient';
import tcpServer from '@/tcpServer';

export default {
  name: 'server-config',
  data() {
    return {
      tcpClient,
      tcpSocket: tcpClient.socket,
      tcpServer,
      tcpServerLogs: tcpServer.logs
    };
  },
  computed: {
    tcpClientStatus() {
      if (this.tcpSocket.writable && this.tcpSocket.readable) {
        return '已连接';
      } else {
        return '未连接';
      }
    },
    tcpServerStatus() {
      if (this.tcpServer.server.listening) {
        return '已运行';
      } else {
        return '未运行';
      }
    }
  },

  created() {
    this.tcpServer.server.on('connection', sk => {
      tcpServer.logs.push(`new connection established from ${sk.remoteAddress}:${sk.remotePort}`)
      console.log(sk.address())
    })
  },

  methods: {
  }
};
</script>
<style lang="scss">
</style>
