<template>
  <div class="level-container" v-if="level && level > 0">
    <span
      :class="className"
      :style="putStyle"
      v-for="item in level"
      v-bind="$attrs"
    ></span>
  </div>
</template>
<script>
export default {
  props: ['level', 'className', 'putStyle']
};
</script>
<style scoped>
.level-container {
  display: inline-block;
}
</style>
