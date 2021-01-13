<template>
  <el-scrollbar class="page-component__scroll" ref="rootScroll">
    <div class="allmenus" :style="{ width: searchvalue ? '400px' : 'auto' }">
      <div
        :class="item.search ? 'menus-search-item' : 'menus-item'"
        v-for="(item, index) in menus"
        :key="index"
      >
        <div
          :class="item.search ? 'menus-search' : 'menus-title'"
          @click="goPage(item.index)"
        >
          {{ item.title }}
        </div>
        <template v-if="item.subs && !item.search">
          <div class="menus-sub first" v-for="(sub, k) in item.subs" :key="k">
            <div class="menus-sub-title">
              <template v-if="sub.index == Number.parseInt(sub.index)">
                {{ sub.title }}</template
              >
              <template v-else>
                <span class="menu-link fontbig" @click="goPage(sub.index)">
                  {{ sub.title }}</span
                >
              </template>
            </div>
            <template v-if="sub.subs">
              <div
                class="menus-sub-menu"
                v-for="(menu, n) in sub.subs"
                :key="n"
              >
                <div class="menu-link" @click="goPage(menu.index)">
                  {{ menu.title }}
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="!item.subs && !item.search">
          <div class="menus-sub-title">
            <div class="menu-link" @click="goPage(item.index)">
              {{ item.title }}
            </div>
          </div>
        </template>
      </div>
      <div
        class="bottomh"
        :style="{ height: noData ? '35px' : '20px' }"
        v-text="noData ? '抱歉，没有找到对应菜单' : ''"
      ></div>
    </div>
  </el-scrollbar>
</template>
<script>
export default {
  props: {
    searchvalue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menus: [],
    };
  },
  computed: {
    noData() {
      return this.searchvalue && this.menus.length == 0;
    },
  },
  methods: {
    filterMenu(menu, name) {
      let arr = [];
      menu.forEach((element) => {
        if (
          element.title.indexOf(name) != -1 &&
          Number.parseInt(element.index) != element.index
        ) {
          arr.push({ ...element, search: true });
        }
        if (element.subs) {
          arr = arr.concat(this.filterMenu(element.subs, name));
        }
      });

      return arr;
    },
    goPage(path) {
      if (path) {
        this.$router.push('/' + path);
        this.$emit('close');
      }
    },
  },
  mounted() {
    this.menus = [...this.$store.state.menu.menuList];
    this.cacheMenus = [...this.menus];
  },
  watch: {
    searchvalue(nv, ov) {
      if (nv) {
        this.menus = this.filterMenu(this.cacheMenus, nv);
      } else {
        // this.menus = this.cacheMenus;
      }
      this.$emit('refresh');
    },
  },
};
</script>
<style scoped>
.menus-search-item {
  display: inline-block;
}
.menus-search-item .menus-search {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
}
.bottomh {
  height: 20px;
}
.allmenus {
  text-align: left;
  padding: 0px 20px;
  max-height: 600px;
}
.menus-item:first-child {
  margin-top: 20px;
}
.menus-item + .menus-item {
  margin-top: 40px;
}
.menus-title {
  border-left: 4px solid #007aff;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  padding-left: 12px;
}
.menus-sub {
  display: inline-block;
  padding-right: 60px;
  vertical-align: top;
}
.menus-sub.first {
  margin-left: 0px;
}

.menus-sub-title,
.menus-search {
  padding: 13px 0px;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
}

.menu-link {
  font-size: 12px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 8px;
  cursor: pointer;
}
.menu-link.fontbig {
  font-size: 14px;
  font-weight: 500;
  color: #666666;
}
.menu-link:hover,
.menus-search:hover {
  color: rgba(0, 122, 255, 1);
  text-decoration: underline;
}
</style>