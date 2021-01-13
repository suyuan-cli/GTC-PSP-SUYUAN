<template>
  <div class="topbar">
    <el-menu
      :default-active="onRoutes"
      background-color="#FFFFFF"
      text-color="rgba(51,51,51,1)"
      active-text-color="rgba(39,125,218,1)"
      unique-opened
      mode="horizontal"
      @select="menuSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.subs">
          <el-submenu
            :class="[item.activeClass]"
            :index="item.index || ''"
            :key="item.index"
          >
            <template slot="title">
              <span
                :class="item.icon"
                style="font-size:16px; margin-right: 12px"
              ></span>
              <span @click="parentMenuClick(item)">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">
                  <span @click="parentMenuClick(subItem)">{{
                    subItem.title
                  }}</span>
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
            @click="menuItemClick(item, $event)"
          >
            <i
              :class="item.icon"
              style="font-size:16px; margin-right: 12px"
            ></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';

export default {
  data() {
    return {
      collapse: false,
      activeClass: '',
      actionItems: []
    };
  },
  methods: {
    resetAction() {
      this.actionItems.forEach(item => {
        item.activeClass = '';
      });
    },
    addItemActive(item) {
      this.resetAction();
      this.$set(item, 'activeClass');
      if (!this.actionItems.includes(item)) {
        this.actionItems.push(item);
      }
      item.activeClass = 'is-active-title';
    },
    menuSelect(e) {
      this.resetAction();
      this.hideLoading();
      this.$router.push('/' + e);
    },
    menuItemClick(item, e) {
      if (item.noPermission) {
        this.$message.warning('暂无该菜单权限');
      }
    },
    parentMenuClick(item) {
      if (this.$route.path.substring(1) == item.index) {
        return;
      }
      if (item.index == parseInt(item.index)) {
        //如果是数值不处理
      } else {
        this.addItemActive(item);
        this.$router.push('/' + item.index);
      }
    }
  },

  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    },
    menuList() {
      return this.$store.state.menu.menuList;
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    });
    this.menuList.forEach(item => {
      if (item.index == this.$route.path.substring(1)) {
        this.addItemActive(item);
      }
    });
  }
};
</script>

<style scoped>
.topbar >>> .is-active-title .el-submenu__title {
  color: rgb(39, 125, 218) !important;
  border-bottom-color: rgb(39, 125, 218) !important;
  background-color: rgb(255, 255, 255) !important;
}
.topbar {
  display: block;
  /* position: absolute; */

  /* top: 70px; */
  height: 43px;
  width: 100%;
}
.topbar::-webkit-scrollbar {
  width: 0;
}
.topbar-el-menu:not(.el-menu--collapse) {
  width: 100%;
}
.topbar > ul {
  height: 43px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar > ul > li {
  height: 43px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 43px;
  align-self: center;
}
</style>
