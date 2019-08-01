<template>
  <div class="server">
    <div class="page-title">网络状态</div>

    <div class="page-body flex-body">
      <div class="flex-auto" style="margin-right: 8px;">
        <div class="server-name">上传服务器</div>
        <div class="server-data">
          <div style="float: left">
            <div class="data-item">
              <span class="item-label">IP</span>
              {{ tcpClient.host }}
            </div>
            <div class="data-item">
              <span class="item-label">Port</span>
              {{ tcpClient.port }}
            </div>
            <div class="data-item">
              <span class="item-label">连接状态</span>
              <el-tag
                color="#21282e"
                size="small"
                :type="clientConnected ? 'success' : 'danger'"
              >{{ tcpClientStatus }}</el-tag>
            </div>
          </div>

          <el-button
            style="float: right"
            type="primary"
            @click="createClient()"
            :loading="tcpClient.socket && tcpClient.socket.connecting"
            :disabled="clientConnected"
          >连接服务器</el-button>
        </div>
        <div class="server-logs">
          <div class="log-item" v-for="(l, i) in tcpClientLogs" :key="i">
            <div class="log-time">{{ l.time }}</div>
            <div class="log-message">
              <span :class="l.status">[ {{ l.status }} ]</span>
              {{ l.message }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex-auto" style="margin-left: 8px;">
        <div class="server-name">本地TCP服务器</div>
        <div class="server-data">
          <div style="float: left">
            <div class="data-item">
              <span class="item-label">Port</span>
              {{ tcpServer.port }}
            </div>
            <div class="data-item">
              <span class="item-label">连接数</span>
              {{ tcpServer.count }}
            </div>
            <div class="data-item">
              <span class="item-label">运行状态</span>
              <el-tag
                color="#21282e"
                size="small"
                :type="serverListening ? 'success' : 'danger'"
              >{{ tcpServerStatus }}</el-tag>
            </div>
          </div>
          <el-button
            style="float: right"
            type="primary"
            @click="createServer()"
            :disabled="serverListening"
          >启动本地服务器</el-button>
        </div>
        <div class="server-logs">
          <div class="log-item" v-for="(l, i) in tcpServerLogs" :key="i">
            <div class="log-time">{{ l.time }}</div>
            <div class="log-message">
              <span :class="l.status">[ {{ l.status }} ]</span>
              {{ l.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tcpClient from '@/tcpClient';
import tcpServer from '@/tcpServer';

export default {
  name: 'server',
  data() {
    return {
      tcpClient,
      tcpServer,
      tcpServerLogs: tcpServer.logs,
      tcpClientLogs: tcpClient.logs
    };
  },
  computed: {
    clientConnected() {
      return (
        this.tcpClient.socket &&
        this.tcpClient.socket.writable &&
        this.tcpClient.socket.readable
      );
    },
    tcpClientStatus() {
      return this.clientConnected ? '已连接' : '未连接';
    },
    serverListening() {
      return this.tcpServer.server && this.tcpServer.server.listening;
    },
    tcpServerStatus() {
      return this.serverListening ? '已运行' : '未运行';
    }
  },

  methods: {
    createClient() {
      this.$emit('reconnect', 'connectToServer');
    },

    createServer() {
      this.$emit('reconnect', 'runTCPServer');
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/css/vars.scss';

.server {
  height: 100%;

  .flex-body {
    display: flex;
    height: calc(100% - 79px);
  }

  .flex-auto {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }

  .server-name {
    font-weight: bold;
    padding: 10px 0;
    color: #8e8e8e;
  }

  .server-data {
    font-size: 14px;
    color: #e0e0e0;
    line-height: 16px;
    margin-bottom: 16px;
    padding: 16px;
    height: 80px;
    background: lighten(#21282e, 10%);
    border-radius: 4px;

    .data-item {
      padding: 4px 0;
      color: $--warning-color;
    }

    .data-item .item-label {
      width: 100px;
      display: inline-block;
      color: $--brand-color;
    }

    .data-item .el-tag {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .server-logs {
    overflow: scroll;
    border-radius: 4px;
    height: calc(100% - 152px);
    scroll-behavior: smooth;
    background: lighten(#21282e, 5%);
    width: calc(100% + 17px);

    .log-item {
      color: #d0d0d0;
      font-size: 14px;
      line-height: 14px;
      padding: 4px 8px;

      &:last-child {
        margin-bottom: 17px;
      }
    }

    .log-time {
      padding-bottom: 4px;
    }

    .log-message {
      width: 400px;
    }
  }

  .success {
    color: $--success-color;
  }

  .warning {
    color: $--warning-color;
  }

  .error {
    color: $--danger-color;
  }
}
</style>
