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
            4476
          </div>
          <div class="data-item">
            <span class="item-label">连接数</span>
            {{ count }}
          </div>
          <div class="data-item">
            <span class="item-label">运行状态</span>
            <el-tag color="#21282e" size="small" :type="'success'">{{ status }}</el-tag>
          </div>
        </div>
        <el-button
          style="float: right"
          type="primary"
          @click="serverRun"
          :disabled="['loading', 'listening'].includes(status)"
        >启动本地服务器</el-button>
      </div>
      <div class="server-logs">
        <div class="scroll-logs">
          <div class="log-item" v-for="(l, i) in logs" :key="i">
            <div class="log-message">
              <span :class="l.status">[{{ l.status.toUpperCase() }}] {{ timeFormatter(l.time) }}&nbsp;&nbsp;</span>
              <span>{{ l.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { timeFormatter } from '@/utils.js';

export default {
  name: 'server',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      logs: state => state.Server.logs,
      status: state => state.Server.status,
      count: state => state.Device.count
    })
  },
  methods: {
    serverRun() {
      this.$server.Run(() => {
        this.$store.dispatch('changeStatus', 'loading');
        this.$store.dispatch('log', {
          status: 'info',
          message: 'start server'
        });
      });
    },
    timeFormatter(time) {
      return timeFormatter(time, '%y/%m/%d %timestring');
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

    .log-message {
      margin-right: 17px;
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

  .info {
    color: $--info-color;
  }
}
</style>
