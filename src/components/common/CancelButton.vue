<!--使用样例-->
<!-- <cancel-button :yes-fn="yes"></cancel-button>-->
<template>
  <el-button class="common-cancel-btn" type="info" @click="click">
    取消
  </el-button>
</template>

<script>
export default {
  name: 'cancelButton',
  components: {},
  props: {
    yesFn: {
      type: Function,
      default() {}
    },
    noFn: {
      type: Function,
      default() {}
    },
    closeFn: {
      type: Function,
      default() {}
    }
  },
  created() {},
  mounted() {},
  data() {
    return {};
  },
  methods: {
    click() {
      this.$confirm('是否保存当前页面数据？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        distinguishCancelAndClose: true,
        isBindSave: false,
        callback: action => {
          switch (action) {
            case 'confirm': {
              this.yesFn();
              break;
            }
            case 'cancel': {
              this.noFn();
              break;
            }
            case 'close': {
              this.closeFn();
              break;
            }
          }
        }
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss"></style>
