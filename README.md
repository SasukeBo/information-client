# information-client

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

#### tcp服务器消息格式文档

- 当设备连接tcp服务器，发送消息格式为`@connect:${device_token}`。`client`存储设备的tcp连接信息，发送设备连接状态`ws`消息到服务器。
- 当设备软件开始运行，发送消息格式为`@start`。
- 当设备发送数据到服务器时，消息格式为`@data:${param_sign}:${param_value}`。`client`格式化数据，发送`ws`消息到服务器。
- 当设备软件停止运行，发送消息格式为`@stop`。
