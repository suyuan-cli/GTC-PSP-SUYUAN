<template>
  <div class="login-wrap">
    <div class="ms-login" v-loading="loading">
      <div class="ms-title">溯源项目登录中心(测试用)</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="loginname">
          <el-input v-model="ruleForm.loginname" placeholder="loginname">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>

        <p class="login-tips">Tips :中心管理用户01/abc123456</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import comm from '@/service/common.js';
export default {
  data: function () {
    return {
      ruleForm: {
        authcode: '444',
        loginname: '中心管理用户01',
        logintype: 1,
        password: 'abc123456',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.showload;
    },
  },
  mounted() {
    this.$store.dispatch('logout');
    this.$store.dispatch('getEncryptkey');
  },
  methods: {
    submitForm(formName) {
      this.showLoading();
      setTimeout(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.password = comm.encrypt(this.ruleForm.password),
            this.$store
              .dispatch('login', this.ruleForm)
              .then((code) => {
                if (code) {
                  const path = this.$route.query.redirect || '/';
                  this.$router.push(path);
                }
                this.hideLoading();
              })
              .catch((error) => {
                // 有错误发生或者登录失败
                this.$message(
                  error.message || error.response.data.message || '登录失败'
                );
                this.hideLoading();
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }, 500);
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
}
</style>