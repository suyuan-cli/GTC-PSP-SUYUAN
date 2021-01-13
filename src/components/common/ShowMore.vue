<template>
  <div>
    <div @click="showMore()" class="showmore-box">
      <span>
        {{ !showmore ? topTitle : bottomTitle }}
        <i
          :class="!showmore ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
        ></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default() {
        return `'${id}'`;
      }
    },
    heights: {
      type: String,
      default() {
        return `'${heights}'`;
      }
    },
    topTitle: {
      type: String,
      default: '收起'
    },
    bottomTitle: {
      type: String,
      default: '查看更多信息'
    }
  },
  mounted() {
    this.showMore();
  },
  data() {
    return {
      showmore: false
    };
  },
  methods: {
    showMore(flag = this.showmore) {
      if (flag) {
        document.getElementById(this.id).style.height = 'auto';
      } else {
        document.getElementById(this.id).style.height = this.heights;
      }
      this.showmore = !this.showmore;
    }
  }
};
</script>

<style scoped>
.showmore-box {
  width: 100%;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  margin-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
}
.showmore-box span {
  width: 100px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
}
</style>
