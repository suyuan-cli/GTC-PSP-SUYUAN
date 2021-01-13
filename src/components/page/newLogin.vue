<template>
  <div class="login-wrap">
    <div class="login-header">
      <img :src="logobg" alt class="logo-img" />
      <p class="logo-title">登录您的账号</p>
    </div>
    <div class="login-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="65px"
        label-position="left"
        class="from-content"
      >
        <el-form-item label="账号">
          <el-input
            v-model="ruleForm.loginname"
            placeholder="请输入您的账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
            type="password"
            placeholder="请输入您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      <p>
        Copyright © 2019 All Rights Reserved. 广州信天翁信息科技有限公司
        版权所有
      </p>
    </div>
  </div>
</template>

<script>
import comm from '@/service/common.js';
import logobg from '@/assets/img/logo-big.png';
export default {
  data: function () {
    return {
      loading: false,
      logobg: logobg,
      ruleForm: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  computed: {
    // loading() {
    //   return this.$store.state.showload;
    // },
    setDefaultUserPwd() {
      return process.env.VUE_APP_ISSHOWTAG;
    },
  },
  mounted() {
    this.$store.dispatch('logout');
    this.$store.dispatch('getEncryptkey');
    if (this.setDefaultUserPwd) {
      this.ruleForm = {
        authcode: '444',
        loginname: '中心管理用户01',
        logintype: 1,
        password: 'abc123456',
      };
    }
  },
  methods: {
    showLoadFn() {
      this.loading = true;
    },
    hideLoadFn() {
      this.loading = false;
    },
    submitForm(formName) {
      this.showLoadFn();
      setTimeout(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.password = comm.encrypt(this.ruleForm.password);
            //为了兼容后端的错误
            this.ruleForm.authcode = '444';
            this.ruleForm.logintype = 1;
            this.$store
              .dispatch('login', this.ruleForm)
              .then((code) => {
                if (code) {
                  const path = this.$route.query.redirect || '/';
                  this.$router.push(path);
                }
                this.hideLoadFn();
              })
              .catch((error) => {
                // 有错误发生或者登录失败
                this.$message(
                  error.message || error.response.data.message || '登录失败'
                );
                this.hideLoadFn();
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
  background: rgba(246, 247, 248, 1);
}
.login-header {
  position: absolute;
  width: 100%;
  height: 269px;
  background-image: url(../../assets/img/logo-headerbg.png);
  background-size: 100%;
}
.logo-img {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
}
.logo-title {
  position: absolute;
  top: 184px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
}
.login-box {
  position: absolute;
  top: 243px;
  left: 50%;
  transform: translateX(-50%);
  width: 507px;
  height: 361px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-shadow: 0px 0px 10px #c1c1c1;
}
.from-content {
  margin: auto;
  margin-top: 76px;
  width: 405px;
}
.login-btn {
  /* position: absolute;
  top: 243px;
  left: 50%;
  transform: translateX(-50%); */
  margin-top: 30px;
  width: 322px;
  height: 42px;
  background: rgba(68, 160, 225, 1);
  border-radius: 2px;
  text-align: center;
}
.login-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #999999;
  font-size: 14px;
}
.login-tips {
  font-size: 12px;
}
.login-box >>> .el-form-item__label {
  padding-right: 30px;
}
.login-box >>> .el-form-item {
  margin-bottom: 34px;
}
.login-box >>> .el-input__inner {
  width: 325px;
  height: 36px;
  background: rgba(246, 247, 248, 1);
  border: 1px solid rgba(235, 235, 235, 1);
  border-radius: 2px;
}
</style>