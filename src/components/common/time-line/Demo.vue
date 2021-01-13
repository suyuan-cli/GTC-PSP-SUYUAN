<template>
  <!--labelWidth默认为60px-->
  <time-line style="background-color: white;" label-width="100px">
    <time-line-item> </time-line-item>
    <time-line-item label="办理中" activity>
      <div style="height: 100px;"></div>
    </time-line-item>
  </time-line>
</template>

<script>
import timeLine from './time-line';
import timeLineItem from './time-line-item';
export default {
  name: 'Demo',
  components: { timeLineItem, timeLine },
  props: {},
  created() {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped></style>
