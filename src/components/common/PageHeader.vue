<template>
  <div class="page-header">
    <div class="header-left">
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in navs">
          <template v-if="!/^[0-9]*$/.test(item.to)">
            <el-breadcrumb-item
              :class="{ hoverclass: item.to }"
              :to="{ path: '/' + item.to }"
              :key="index"
              >{{ item.name }}</el-breadcrumb-item
            >
          </template>
          <template v-if="/^[0-9]*$/.test(item.to)">
            <el-breadcrumb-item :key="index">{{
              item.name
            }}</el-breadcrumb-item>
          </template>
        </template>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageHeader',
  components: {},
  props: {
    render: {
      type: Function,
      default: function (current) {
        return current;
      },
    },
    paths: {
      type: Array,
      default () {
        return [];
      }
    },
    /*不需要跳转的，给个''*/
    tos: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created () { },
  mounted () { },
  data () {
    return {
      navs: [],
    };
  },
  methods: {},
  computed: {},
  mounted() {
    let current = this.$router.history.current;
    current = this.render(current);
    let navs = this.getFullNav(
      current.fullPath.substring(1),
      this.$store.state.menu.menuList,
      current
    );

    if (navs.length == 0) {
      this.navs = [
        { to: current.fullPath.substring(1), name: current.meta.title },
      ];
    } else {
      this.navs = navs;
    }
    console.log('nav', this.navs);
  },
};
</script>

<style scoped>
.hoverclass:hover >>> .is-link {
  color: rgba(0, 122, 255, 1) !important;
  text-decoration: underline;
}
.page-header {
  height: 40px;
  padding: 0 18px;
  background: #ffffff;
  display: flex;
  border-bottom: 1px solid rgba(237, 237, 237, 1);
  justify-content: space-between;
  /* width: calc(100% - 36px); */
  align-items: center;
}
.page-header >>> .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner {
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.page-header
  >>> .el-breadcrumb
  .el-breadcrumb__item:last-child
  .el-breadcrumb__inner {
  color: #333333;
  cursor: default;
}
</style>
