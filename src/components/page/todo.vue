<template>
  <div class="container">
    <div class="container-top" style="text-align: center;padding-top: 43px;">{{title}}功能待上线</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: ''
    };
  },
  mounted() {
    this.title = this.$router.history.current.meta.title;
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.title = to.meta.title;
    }
  }
};
</script>