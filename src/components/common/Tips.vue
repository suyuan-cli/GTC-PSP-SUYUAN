<template>
  <div class="page-tips-fixed">
    <i class="el-icon-warning"></i>
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  components: {},
  props: {
    text: String
  },
  created() {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.page-tips-fixed {
  /*width: 100%;*/
  font-size: 12px;
  background-color: #eef4fb;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
.el-icon-warning {
  font-size: 16px;
  margin-right: 12px;
  color: #467cfd;
}
</style>
