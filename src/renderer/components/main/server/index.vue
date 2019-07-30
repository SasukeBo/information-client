<template>
  <div class="server-config">
    <div class="page-title">服务器配置</div>

    <div>
      <div>
        <div>上传服务器</div>
        <div>
          <div>IP 127.0.0.1</div>
          <div>Port 12290</div>
          <div>连接状态：</div>
          <el-button type="primary" @click="$router.push({path: '\\'})">Back</el-button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'server-config',
  data() {
    return {
      buttonText: '连接'
    };
  }
};
</script>
<style lang="scss">
.server-config {
}
</style>
