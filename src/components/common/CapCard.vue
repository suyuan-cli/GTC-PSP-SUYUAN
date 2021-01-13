<template>
  <div class="cap-card">
    <div v-if="title" class="cap-title">
      <div class="title">{{title}}</div>
      <div class="subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
    <div :class="[editable ? 'cap-body' :'cap-body-diabled', content]">
      <slot></slot>
    </div>
    <div v-if="showFooter" class="cap-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'capCard',
  // 组件参数 接收来自父组件的数据
  props: {
    title: {
      type: String,
      default: '',
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: ''
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  created () { },
  mounted () { },
};
</script>
<style scoped>
.cap-card {
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}
.cap-title {
  width: calc(100% - 40px);
  padding: 18px 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.cap-body {
  padding: 18px 20px 3px;
}
.cap-footer {
  border-top: 1px solid #ededed;
}
.cap-body-diabled {
  padding: 12px 20px 13px;
}

.normal {
  padding: 18px 20px 22px;
}

.title {
  font-size: 18px;
  color: #333;
}
.subtitle {
  font-size: 13px;
  color: #999;
}
</style>
