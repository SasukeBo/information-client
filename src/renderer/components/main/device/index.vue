<template>
  <div class="devices">
    <div class="page-title">设备列表</div>

    <div class="page-body">
      <div v-for="(device, id) in devices" :key="id" class="device-item">
        <div class="id">{{ device.id }}</div>
        <div class="name">{{ device.name }}</div>
        <div class="type-and-name">
          <div class="type">{{ device.type }}</div>
          <div class="status">状态</div>
        </div>

        <div class="token">
          <span>设备Token:</span>
          <span>{{ device.token }}</span>
        </div>

        <div class="description">{{ device.description }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'device',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      devices: state => state.Device.devices
    })
  }
};
</script>
<style lang="scss">
@import '@/assets/css/vars.scss';

.devices {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.devices .device-item {
  display: flex;
  border-radius: 4px;
  line-height: 45px;
  padding: 0.5rem 1rem;
  background: #333842;
  box-shadow: 0 2px 3px black;
  margin-bottom: 1rem;

  .id {
    font-size: 2rem;
    margin-right: 0;
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    flex: 1;

    &:before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 0.5rem;
    }
  }

  .name {
    font-size: 2rem;
    color: cornsilk;
    margin: 0 1rem;
    flex: 1;
  }

  .type-and-name {
    margin-right: 1rem;
    font-size: 0.8rem;
    color: #f2f6fc;
    font-weight: bold;
    line-height: 22.5px;
    flex: 1;
  }

  .token {
    margin-right: 1rem;
    flex: 2;
  }

  .description {
    flex: 2;
  }
}
</style>
