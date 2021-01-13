<template>
  <div class="formBox">
    <h3>{{ title }}</h3>
    <div :class="[isActive ? 'content' : 'mContent']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "标题"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.formBox {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(237, 237, 237, 1);
  padding-top: 23px;
  padding-left: 19px;
}
.formBox h3 {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.formBox .content {
  background: none;
  padding-left: 50px;
  height: auto;
}

.formBox .mContent {
  color: rgb(102, 104, 106);
  margin: 15px 0 20px;
}
</style>