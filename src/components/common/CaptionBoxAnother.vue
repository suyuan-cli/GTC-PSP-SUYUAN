<template>
  <div
    class="caption-box"
    :class="[button == 'true' ? 'caption-button' : '', bottom == 'true' ? 'bottom' : '']"
  >
    <div class="caption-title" v-if="title">
      <h3>{{ title }}</h3>
      <span v-if="subtitle && createDate">{{subtitle}}：{{createDate}}</span>
    </div>

    <div
      class="caption-body"
      :class="[header == 'true' ? '' : 'padding']"
      :style="{paddingBottom: fill}"
    >
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
  }
}
</script>

<style scoped>
.caption-box {
  margin-bottom: 10px;
  background: #fff;
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
}
.padding {
  padding: 18px 20px 0;
}
.bottom {
  margin-bottom: 0;
  border-bottom: 2px solid #eee;
}
</style>