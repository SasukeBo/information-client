<template>
  <el-container class="main-page">
    <el-aside width="60px" class="menu">
      <img src="@/assets/images/fake-avatar.jpg" class="avatar" />
      <i
        class="iconfont icon-net menu-item"
        :class="[$route.name === 'server-page' ? 'is-active' : '']"
        @click="$router.push({path: 'server'})"
      ></i>
      <i
        class="iconfont icon-shebeiguanli menu-item"
        :class="[$route.name === 'device-page' ? 'is-active' : '']"
        @click="$router.push({path: 'devices'})"
      ></i>
      <i
        :class="[$route.name === 'config-page' ? 'is-active' : '']"
        class="el-icon-s-tools menu-item"
        @click="$router.push({path: 'config'})"
      ></i>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import deviceQuery from './gql/query.device-token-get.gql';
import { parseGQLError } from '@/utils.js';

export default {
  name: 'main-page',
  mounted() {
    this.registerTCPServer();
    this.registerSocketCallbacks();
  },

  methods: {
    registerTCPServer() {
      this.$server.errorCallback = e => {
        this.$store.dispatch('changeStatus', 'error');
        this.$store.dispatch('log', {
          status: 'error',
          message: `server error: ${e}`
        });
      };

      this.$server.closeCallback = () => {
        this.$store.dispatch('changeStatus', 'close');
        this.$store.dispatch('log', {
          status: 'warning',
          message: 'server close'
        });
      };

      this.$server.listenCallback = port => {
        this.$store.dispatch('changeStatus', 'listening');
        this.$store.dispatch('log', {
          status: 'success',
          message: `server listen on ${port}`
        });
      };
    },
    registerSocketCallbacks() {
      this.$server.onconnect = (token, socket) => {
        this.$apollo
          .query({
            query: deviceQuery,
            variables: { token }
          })
          .then(({ data: { device } }) => {
            this.$store.dispatch('setDevice', device);
            socket.deviceID = device.id;
            this.$store.dispatch('log', {
              status: 'success',
              message: `device:[${device.name}] uuid:[${device.uuid}] connected`
            });
          })
          .catch(e => {
            var err = parseGQLError(e);
            this.$store.dispatch('log', {
              status: 'error',
              message: `${err.message} with token ${token}`
            });
          });
      };

      this.$server.ondisconnect = (_, sk) => {
        var device = this.$store.getters.getDevice(sk.deviceID);
        this.$store.dispatch('deleteDevice', sk.deviceID);
        this.$store.dispatch('log', {
          status: 'info',
          message: `device:[${device.name}] uuid:[${device.uuid}] disconnected`
        });
      };

      this.$server.ondata = ({ sign, value }, sk) => {
        var paramID = this.$store.getters.getParamID(sk.deviceID, sign);
        if (!paramID) return;
        this.$websocket.send(
          JSON.stringify({
            type: 'data',
            payload: {
              variables: { topic: `device_param_value:${paramID}` },
              paramID: `${paramID}`,
              value
            }
          })
        );
      };

      this.$server.onstart = sk => {
        this.$websocket.send(
          JSON.stringify({
            type: 'data',
            payload: {
              variables: { topic: `device_status_log:${sk.deviceID}` },
              deviceID: sk.deviceID,
              value: 'start'
            }
          })
        );
      };

      this.$server.onstop = sk => {
        this.$websocket.send(
          JSON.stringify({
            type: 'data',
            payload: {
              variables: { topic: `device_status_log:${sk.deviceID}` },
              deviceID: sk.deviceID,
              value: 'stop'
            }
          })
        );
      };
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/css/vars.scss';

.main-page {
  background: $--background-color;
  height: 100%;
  color: #fff;

  .el-main {
    padding: 0;
  }

  .menu {
    background: $--background-color;
    // box-shadow: 2px 0 16px rgba(0, 0, 0, 0.7);
  }

  .avatar {
    border-radius: 50%;
    width: 40px;
    cursor: pointer;
    margin: 20px 10px;
  }

  .menu-item {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    color: #9e9e9e;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #fff;
    }
  }

  .menu-item.is-active {
    color: #fff;
  }

  .page-title {
    font-size: 20px;
    padding-bottom: 8px;
    font-weight: 600;
    border-bottom: 1px solid;
    line-height: 30px;
  }

  .page-body {
    height: calc(100% - 79px);
    margin: 20px 0;
  }

  .flex-body {
    display: flex;
  }
}
</style>
