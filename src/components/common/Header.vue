<template>
  <div class="header">
    <div class="w1200">
      <!-- logo -->
      <div class="header-left">
        <div class="logo-img">
          <img style="height: 35px" src="../../assets/logo.png" alt />
        </div>
      </div>
      <div class="header-right">
        <!-- 头部功能区 -->
        <!-- 搜索 -->
        <div class="header-search" @click="showSearchInput = true">
          <div class="header-search-icon">
            <i class="iconfont iconsearch"></i>
          </div>
          <span class="header-search-text">搜索</span>
          <div
            class="header-search-input-con"
            :class="{ active: showSearchInput }"
          >
            <i
              class="iconfont icontopheaer input-search-icon"
              @click="refresh"
            ></i>
            <i
              class="iconfont iconicon_chacha"
              @click.stop="showSearchInput = false"
            ></i>
            <el-popover
              ref="popover"
              placement="bottom"
              trigger="manual"
              v-model="searchDropShow"
            >
              <allmenus
                @refresh="refresh('popover')"
                @close="close('popover')"
                :searchvalue="searchvalue"
              ></allmenus>
              <input
                slot="reference"
                class="header-search-input"
                placeholder="请输入您的搜索内容"
                v-model="searchvalue"
                @click="refresh"
              />
            </el-popover>
          </div>
        </div>
        <!-- 地图 -->
        <div class="header-map">
          <div class="header-map-icon">
            <i class="iconfont iconmap"></i>
          </div>
          <el-popover
            class="header-map-text"
            ref="popover2"
            placement="bottom"
            trigger="click"
          >
            <allmenus
              @refresh="refresh('popover2')"
              @close="close('popover2')"
            ></allmenus>
            <span slot="reference" class="header-map-text">全网地图</span>
          </el-popover>
        </div>
        <!-- 帮助 -->
        <!-- <div class="header-help">
          <div class="header-help-icon">
            <i class="iconfont iconhelp"></i>
          </div>
          <span class="header-help-text">帮助</span>
        </div> -->
        <div class="header-user">
          <!-- 用户头像 -->
          <div class="header-user-avator">
            <el-badge is-dot class="item">
              <img src="@/assets/img/img.jpg" />
            </el-badge>
          </div>
          <!-- <span class="header-user-name">您好, {{ username }}</span> -->
          <!-- 用户名下拉菜单 -->
          <el-dropdown
            class="header-user-name"
            trigger="click"
            @command="handleCommand"
          >
            <div class="el-dropdown-link" style="width: 130px">
              <el-tooltip
                class="item"
                effect="dark"
                :content="username"
                placement="left"
              >
                <div class="text-overflow">{{ username }}</div>
              </el-tooltip>
              <i class="el-icon-caret-bottom"></i>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 语言切换 -->
        <!-- <div class="header-language">
          <span class="header-language-text">中文</span>
        </div> -->

        <div class="header-user" v-if="roles.length > 1">
          <el-dropdown
            class="header-user-name"
            trigger="click"
            @command="roleChange"
          >
            <span class="el-dropdown-link">切换角色</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item"
                v-for="item in roles"
                :key="item.code"
              >
                {{ item.name }}
                <span v-show="role.code == item.code">：已登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 用户中心 -->
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import us from '@/service/user.js';
import { resetRouter } from '@/public-method/addRouter.js';
import allmenus from '@/components/common/AllMenus.vue';
import configurl from '../../p.config.js';
export default {
  components: {
    allmenus,
  },
  data() {
    return {
      searchDropShow: false,
      searchvalue: '',
      active: 'active',
      searchWidth: 0,
      showSearchInput: false,
      collapse: false,
      fullscreen: false,
      name: 'linxin',
      message: 2,
    };
  },
  watch: {
    searchvalue(nv) {
      console.log('nv', nv);
      if (nv) {
      } else {
        this.searchDropShow = false;
      }
    },
    showSearchInput(nv, ov) {
      if (nv) {
        this.searchWidth = 344;
      } else {
        this.searchWidth = 0;
        this.$refs.popover.doClose();
      }
    },
  },
  computed: {
    role() {
      return this.$store.state.roleResult.role;
    },
    roles() {
      return this.$store.state.roleResult.roles || [];
    },
    username() {
      return this.$store.state.user.loginName;
    },
    ...mapGetters('dailog', {
      isShow: 'isShow',
    }),
  },
  methods: {
    refresh(name) {
      console.log('refresh');
      console.log('this.searchvalue', this.searchvalue);
      if (this.searchvalue) {
        this.searchDropShow = false;
        this.$nextTick(() => {
          this.searchDropShow = true;
        });
      }
    },
    close(name) {
      this.$refs[name].doClose();
    },
    // 用户名下拉菜单选择事件

    //切换角色
    roleChange(role) {
      this.$store.dispatch('loginByType', role).then((res) => {
        if (res == false) {
          this.$message.error('抱歉切换失败，请稍后重试');
          return;
        }
        let url = window.location.protocol + '//' + window.location.host;
        window.location.href = url;
      });
    },
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/newLogin');
        });
      }
    },
    ...mapActions('dailog', ['hideDailog', 'showDailog']),
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件

    showDailog1() {
      alert(12);
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
};
</script>
<style scoped>
.header {
  background-color: rgba(1, 62, 149, 1) !important;
  position: relative;
  /* box-sizing: border-box; */
  width: 100%;
  height: 71px;
  font-size: 22px;
  color: #fff;
}
.w1200 {
  display: flex;
  position: relative;
  z-index: 2;
  /* background-color: rgba(1, 62, 149, 1) !important; */
}

.header-left {
  width: 577px;
  height: 71px;
  position: relative;
}

.logo-img {
  float: left;
  /* width: 60px; */
  height: 100%;
  /* background: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 110px;
  display: inline-block;
  vertical-align: middle;
}
.logo-img img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
}
.header .logo-zh {
  float: left;
  /* width: 123px; */
  height: 23px;
  font-size: 17px;
  font-family: inpin-culangti;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  line-height: 23px;
  letter-spacing: 1px;
  margin-left: 4px;
  margin-top: 19px;
}

.header-left .logo-en {
  position: fixed;
  top: 41px;
  left: 212px;
  width: 163px;
  height: 9px;
  font-size: 9px;
  font-family: DINCondensed-Bold;
  font-weight: bold;
  color: rgba(169, 169, 169, 1);
  line-height: 11px;
  display: block;
  transform: scale(0.75, 0.75);
}
.header-right {
  min-width: 400px;
  height: 71px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  right: 0px;
  z-index: 3;
}

.header-right > div {
  align-self: center;
}

.header-search {
  width: 51px;
  height: 17px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  border: 0px;
}
.header-search-input-con {
  width: 0px;
  height: 32px;
  position: absolute;
  right: 0px;
  top: -7px;
  transition: all 0.3s;
  overflow: hidden;
}
.header-search-input-con.active {
  width: 344px;
}
.header-search-input {
  width: 100%;
  height: 32px;
  background: #043172;
  border-radius: 2px;
  color: white;
  padding-left: 30px;
  padding-right: 30px;
  outline-color: transparent;
  outline-width: 0px !important;
  border: 0px;
  box-sizing: border-box;
}
.header-search-input::-webkit-input-placeholder {
  color: #4879bd;
}
.header-search-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #4879bd;
}
.header-search-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #4879bd;
}
.header-search-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #4879bd;
}
.input-search-icon {
  position: absolute;
  left: 10px;
  top: 10px;
}
.iconicon_chacha {
  position: absolute;
  right: 10px;
  top: 10px;
}
.header-search-icon {
  width: 14px;
  height: 14px;
  font-size: 12px;
  color: rgba(191, 194, 207, 1);
  align-self: center;
}

.header-search-text {
  display: inline-block;
  width: 24px;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  align-self: center;
}

.header-map {
  width: 72px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}

.header-map-icon {
  width: 14px;
  height: 12px;
  font-size: 12px;
  /* color: rgba(191,194,207,1); */
  align-self: center;
}

.header-map-text {
  display: inline-block;
  width: 48px;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  align-self: center;
  position: relative;
  top: 0px;
}

.header-help {
  width: 49px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}

.header-help-icon {
  width: 14px;
  height: 14px;
  font-size: 12px;
  /* color: rgba(191,194,207,1); */
  align-self: center;
}

.header-help-text {
  display: inline-block;
  width: 24px;
  height: 17px;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
  align-self: center;
}

.header-user {
  width: 120px;
  height: 20px;
  display: flex;
  /* justify-items: center; */
  justify-content: space-between;
  align-items: flex-start;
}

.header-user-avator {
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: 10px;
}

.header-user .header-user-name {
  width: 90px;
  height: 20px;
  display: block;
  align-self: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(155, 160, 180, 1);
  line-height: 20px;
}

.header-user-avator .item {
  width: 20px;
  height: 20px;
  margin-top: -4px;
  margin-right: 40px;
}

.header-user-avator img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.header-language {
  width: 79px;
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(213, 213, 213, 1);
  border-radius: 2px;
}

.header-language-text {
  width: 24px;
  display: block;
  height: 17px;
  align-self: center;
  margin: 0 auto;
}

.iconfont {
  font-size: 12px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
