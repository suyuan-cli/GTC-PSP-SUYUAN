<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div
      class="content-box"
      v-loading="loading"
      :class="{ 'content-collapse': collapse }"
    >
      <el-scrollbar class="page-component__scroll" ref="rootScroll">
        <div class="w1200">
          <v-tags v-show="isShowTag"></v-tags>
          <div class="content">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
          <div style="height:100px"></div>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog
      title="密码修改"
      :visible.sync="isShow"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            show-password
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDailog">取 消</el-button>
        <el-button type="primary" @click="hideDailog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 第一次登录 -->
    <el-dialog
      :visible.sync="isFirstLogin"
      v-dialogDrag
      :before-close="firstLoginClose"
      width="500px"
      :show-close="false"
    >
      <div class="userinfo-title">
        个人信息补充
        <p class="p-next" @click="isFirstLogin = false">跳过</p>
      </div>
      <el-form :model="userinfo">
        <el-form-item label="姓名" :label-width="userWidth">
          <el-input v-model="userinfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="userWidth">
          <el-input v-model="userinfo.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="userWidth">
          <el-input v-model="userinfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="国籍" :label-width="userWidth">
          <el-input
            v-model="userinfo.nationality"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="userWidth">
          <el-input v-model="userinfo.certtype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="证据号码" :label-width="userWidth">
          <el-input v-model="form.certnum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submintUserInfo">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import us from '@/service/user';

export default {
  data() {
    return {
      userWidth: '80px',
      isFirstLogin: false,
      tagsList: [],
      collapse: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      userinfo: {
        name: null,
        nickname: null,
        sex: null,
        nationality: null,
        certtype: null,
        certnum: null
      },
      formLabelWidth: '120px'
    };
  },
  computed: {
    ...mapGetters('dailog', {
      isShow: 'isShow'
    }),
    loading() {
      return this.$store.state.showload;
    },
    isShowTag() {
      return process.env.VUE_APP_ISSHOWTAG;
    }
  },
  methods: {
    ...mapActions('dailog', ['hideDailog', 'showDailog']),
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.hideDailog();
          //this.$store.dispatch('dailog/hideDailog')
        })
        .bind(this)
        .catch(_ => {});
    },
    submintUserInfo() {
      alert('提交');
    },
    firstLoginClose() {
      alert('关闭');
      this.isFirstLogin = false;
    }
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  watch: {
    $route(to, from) {
      this.$refs.rootScroll.wrap.scrollTop = 0;
    }
  },
  mounted() {
    this.$root.rootScroll = this.$refs.rootScroll;
    //TODO 初始化isFirstLogin的值
    //TODO 判断是否为企业或者其他组织第一次登录

    // setTimeout(() => {
    //   this.rootScrollTo(100);
    // }, 4000);
  },
  created() {
    //let userMsg = await us.getUserMessage();

    bus.$on('collapse', msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>
<style scoped>
.content-box {
  width: 100%;
  position: absolute;
  left: 0;
  top: 114px;
  background: #f5f5f5;
}
.content {
  padding-bottom: 200px;
}
.wrapper >>> .el-table-column--selection {
  text-overflow: inherit !important;
}

.wrapper >>> .el-table-column--selection .cell {
  text-overflow: inherit !important;
}

.wrapper >>> .common-submit-btn {
  border-color: rgb(133, 193, 83);
  background-color: #85c153;
  width: 90px;
  color: white;
}
.wrapper >>> .common-save-btn {
  border-color: #007aff;
  background-color: #007aff;
  width: 90px;
  color: white;
}
.wrapper >>> .common-cancel-btn {
  border-color: #e9e9e9;
  background-color: #e9e9e9;
  color: rgb(96, 98, 102);
  width: 90px;
}
.wrapper >>> .dialog-footer {
  text-align: right;
}
.userinfo-title {
  font-size: 16px;
  margin-top: -40px;
  font-weight: 600;
  margin-bottom: 30px;
}
.p-next {
  font-size: 13px;
  float: right;
  cursor: pointer;
  font-weight: 100;
  color: blue;
}
</style>
