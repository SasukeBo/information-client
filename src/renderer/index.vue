<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'information-client',
    created() {
      this.$client.init();
    }
  }
</script>

<style lang="scss">
</style>
