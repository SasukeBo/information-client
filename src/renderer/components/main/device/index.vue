<template>
  <div class="devices">
    <div class="device-page flex-body">
      <div class="device-menu">
        <div class="menu-title">
          <span>设备列表</span>
          <el-button class="device-add-btn" type="primary" size="mini">添加设备</el-button>
        </div>
        <ul class="menu-content">
          <li
            v-for="(d, i) in fakeDeviceList"
            :key="'device_'+i"
            @click="currentDevice = d.id"
            :class="['device-menu-item', currentDevice === d.id ? 'is-active' : '']"
          >{{ d.name }}</li>
        </ul>
        <div class="menu-footer"></div>
      </div>
      <div class="device-info"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'device',
  data() {
    return {
      currentDevice: 0,
      fakeDeviceList: [
        { id: 1, name: '1637自动化焊接设备' },
        { id: 2, name: '60181/60182/60030自动化镭雕机' },
        { id: 3, name: '1757自动焊接治具' },
        { id: 4, name: '1654自动焊接-前后段' },
        { id: 5, name: '1637自动化焊接设备' },
        { id: 6, name: '1637自动化焊接设备' },
        { id: 7, name: '1637自动化焊接设备' },
        { id: 8, name: '1637自动化焊接设备' },
        { id: 9, name: '1637自动化焊接设备' },
        { id: 10, name: '1637自动化焊接设备' },
        { id: 11, name: '1637自动化焊接设备' },
        { id: 12, name: '1637自动化焊接设备' },
        { id: 13, name: '1637自动化焊接设备' },
        { id: 14, name: '1637自动化焊接设备' },
        { id: 15, name: '1637自动化焊接设备' },
        { id: 16, name: '1637自动化焊接设备' },
        { id: 17, name: '1637自动化焊接设备' },
        { id: 18, name: '1637自动化焊接设备' },
        { id: 19, name: '1637自动化焊接设备' },
        { id: 20, name: '1637自动化焊接设备' }
      ]
    };
  }
};
</script>
<style lang="scss">
@import '@/assets/css/vars.scss';

.devices {
  height: 100%;

  .device-page {
    height: 100%;
  }

  .device-menu {
    flex: 1;
    background: darken($--background-color, 5%);
    overflow: hidden;

    .menu-title {
      font-size: 16px;
      padding-left: 16px;
      background: $--background-color;
      box-sizing: border-box;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.7);
      border: 1px solid darken($--background-color, 2%);
      line-height: 38px;
    }

    .device-add-btn {
      float: right;
      margin: 5px 0;
    }

    .menu-footer {
      height: 20px;
      background: $--background-color;
      border: 1px solid darken($--background-color, 2%);
    }

    .menu-content {
      padding: 0;
      margin: 0;
      list-style: none;
      color: #afafaf;
      font-size: 14px;
      line-height: 14px;
      height: calc(100% - 62px);
      box-sizing: border-box;
      overflow: scroll;
      width: calc(100% + 17px);
    }

    .device-menu-item {
      padding: 8px 0;
      padding-left: 16px;
      cursor: pointer;

      &:hover,
      &.is-active {
        background: $--background-color;
      }
    }
  }

  .device-info {
    flex: 3;
  }
}
</style>
