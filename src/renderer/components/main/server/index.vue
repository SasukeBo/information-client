<template>
  <div class="server">
    <div class="page-title">网络状态</div>

    <div class="page-body">
      <div class="server-name">
        <i class="iconfont icon-fuwuqi1"></i>
        <span>本地TCP服务器</span>
      </div>
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
        <div class="scroll-logs">
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
import tcpServer from '@/tcpServer';

export default {
  name: 'server',
  data() {
    return {
      tcpServer,
      tcpServerLogs: tcpServer.logs
    };
  },
  computed: {
    serverListening() {
      return this.tcpServer.server && this.tcpServer.server.listening;
    },
    tcpServerStatus() {
      return this.serverListening ? '已运行' : '未运行';
    }
  },

  methods: {
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
  padding: 20px;
  box-sizing: border-box;

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
    background: #45535f;
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
    border-radius: 4px;
    height: calc(100% - 170px);
    scroll-behavior: smooth;
    background: #1e2225;

    .scroll-logs {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100%;
      width: calc(100% + 17px);
    }

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
