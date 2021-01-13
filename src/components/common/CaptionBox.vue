<template>
  <div
    class="caption-box"
    :class="[button == 'true' ? 'caption-button' : '', bottom == 'true' ? 'bottom' : '']"
  >
    <div class="caption-title" v-if="title">
      <h3>{{ title }}</h3>
      <span>{{showTitleDate}}</span>
    </div>

    <div class="caption-body" :class="header" :style="{paddingBottom: fill}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ""  // 标题
    },
    subtitle: {
      default: ''   // 右边的时间副标题
    },
    createDate: {
      default: ''
    },
    button: {
      type: String,   // 提交、保存、取消等按钮
      default: 'false'
    },
    header: {  // 是否包含头部面包屑
      type: String,
      default: 'false'
    },
    bottom: {     // button前一个caption-box设置，设置button的地方
      type: String,
      default: 'false'
    },
    fill: {
      default: ''
    }
  },
  computed: {
    showTitleDate () {
      return this.subtitle && this.createDate ? this.subtitle + '：' + this.createDate.replace(/\-/g, "/") : ''
    }
  }
}
</script>

<style scoped>
.caption-box {
  background: #fff;
  margin-bottom: 10px;
}
.caption-button {
  padding-bottom: 20px;
  text-align: right;
}

.caption-title {
  padding: 18px 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-border-bottom {
  border-bottom: 1px solid rgba(237, 237, 237, 1);
}
.caption-title {
  font-size: 12px;
  color: rgb(153, 153, 153);
}
.caption-title h3 {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: rgba(60, 60, 60, 1);
}

.caption-body {
  color: rgb(102, 104, 106);
  font-size: 14px;
}

.bottom {
  margin-bottom: 0;
  border-bottom: 2px solid #eee;
}
.true {
  padding: 0;
}
.false {
  padding: 18px 20px 0;
}
.form {
  padding: 10px 0 12px;
}
.listab {
  padding: 5px 20px 10px;
}
</style>