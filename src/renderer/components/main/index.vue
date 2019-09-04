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
      <router-view @reconnect="handlerReconn"></router-view>
    </el-main>
  </el-container>
</template>
<script>
import tcpServer from '@/tcpServer';

export default {
  name: 'main-page',
  methods: {
    runTCPServer() {
      tcpServer.server = tcpServer.createServer();
    },

    handlerReconn(func) {
      this[func]();
    }
  },

  mounted() {
    // this.runTCPServer();
    // this.connectToServer();
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
