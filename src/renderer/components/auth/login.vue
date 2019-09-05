<template>
  <div class="main-page" id="wrapper">
    <div class="index-title">
      <img src="@/assets/images/256x256.png" />
      <div class="name">普创智控设备云平台客户端</div>
    </div>

    <div class="index-main">
      <div class="app-info">
        <img src="@/assets/images/index-example.jpg" style="padding-bottom: 20px; width: 100%;" />
        <div>版权所有（C）2019 普创智控</div>
        <div>Build using electron-vue</div>
      </div>

      <div class="index-entry">
        <el-form :model="loginForm" :rules="rules" class="login-form" ref="loginForm">
          <el-form-item prop="phone">
            <el-input
              placeholder="请输入手机号"
              v-model="loginForm.phone"
              @keyup.native.enter="submit"
              prefix-icon="iconfont icon-shouji"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              @keyup.native.enter="submit"
              type="password"
              show-password
              prefix-icon="iconfont icon-mima"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" style="width: 100%" type="primary" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import loginByPassword from './mutation.login-by-password.gql';

export default {
  name: 'landing-page',
  data() {
    var reg = new RegExp(
      '^(?:\\+?86)?1(?:3\\d{3}|5[^4\\D]\\d{2}|8\\d{3}|7(?:[35678]\\d{2}|4(?:0\\d|1[0-2]|9\\d))|9[189]\\d{2}|66\\d{2})\\d{6}$'
    );
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号!'));
      } else if (!reg.test(value)) {
        callback(new Error('手机号不合法!'));
      } else {
        callback();
      }
    };
    var validatePasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号!'));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      loginForm: {
        phone: '13242931765',
        password: 'wb1994@'
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        password: [{ validator: validatePasswd, trigger: 'blur' }]
      }
    };
  },

  methods: {
    submit() {
      this.loading = true;
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$apollo
            .mutate({
              mutation: loginByPassword,
              variables: this.loginForm
            })
            .then(() => {
              this.loading = false
              this.$message({
                type: 'success',
                message: '恭喜！登录成功。'
              });
              this.$router.push({ name: 'main-page' });
            })
            .catch(e => {
              this.loading = false
              this.$message({
                type: 'error',
                showClose: true,
                message: e.message
              });
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.main-page {
  .index-title {
    display: flex;
    margin-bottom: 60px;

    img {
      width: 50px;
      height: 50px;
      padding: 25px;
    }

    .name {
      flex: auto;
      line-height: 100px;
      font-size: 30px;
      font-family: sans-serif;
    }
  }

  .index-main {
    display: flex;

    .app-info {
      flex: 1;
      color: #666;
      font-size: 12px;
      padding-bottom: 4px;
      padding-left: 30px;
    }

    .app-info .description {
      color: #333;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 16px;
    }

    .index-entry {
      flex: 1;
      text-align: center;
    }

    .index-entry .login-form {
      width: 300px;
      margin: auto;
      padding: 15px;
    }
  }
}
</style>
