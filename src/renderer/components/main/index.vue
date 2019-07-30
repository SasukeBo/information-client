<template>
  <el-container class="main-page">
    <el-aside width="50px" class="menu">
      <img src="@/assets/images/256x256.png" class="avatar" />
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
export default {
  name: 'main-page'
};
</script>
<style lang="scss">
.main-page {
  background: lighten(#161b1f, 5%);
  height: 100%;
  color: #fff;
  .menu {
    background: #161b1f;
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.7);
  }

  .avatar {
    width: 40px;
    padding: 20px 0;
    cursor: pointer;
    border-bottom: 2px solid #8e8e8e;
    margin: 0 5px;
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
    font-weight: 600;
    border-bottom: 1px solid;
    line-height: 30px;
  }
}
</style>
