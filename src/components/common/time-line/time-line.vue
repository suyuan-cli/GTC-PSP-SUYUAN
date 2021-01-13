<template>
  <div class="time-line">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'time-line',
  components: {},
  props: {
    labelWidth: {
      type: String,
      default: null
    }
  },
  created() {},
  updated() {
    this.setLabelWidth();
  },
  mounted() {
    this.setLabelWidth();
  },
  data() {
    return {};
  },
  methods: {
    setLabelWidth() {
      if (this.labelWidth !== null) {
        this.$slots.default.forEach(item => {
          item.componentInstance.labelWidth = this.labelWidth;
        });
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.time-line .time-line-item:first-child >>> .time-line-top {
  border-width: 0;
}

.time-line .time-line-item:last-child >>> .time-line-bottom {
  border-width: 0;
}
</style>
