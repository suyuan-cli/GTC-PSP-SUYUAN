<template>
  <el-avatar v-bind="$props" :src="avatarSrc" :error="errorHandler" :key="key">
  </el-avatar>
</template>

<script>
import { Avatar } from 'element-ui';
const config = require('@/p.config.js');
export default {
  name: 'CountryIcon',
  components: {},
  props: {
    ...Avatar.props,
    size: {
      type: [String, Number],
      default: 48
    },
    code: {
      type: String,
      default: '0'
    }
  },
  created() {},
  mounted() {},
  data() {
    return {
      err: false,
      defSrc: `${config.national_flag_url}0.png`,
      key: 1
    };
  },
  methods: {
    errorHandler() {
      this.err = true;
      this.key += 1;
      return true;
    }
  },
  computed: {
    avatarSrc() {
      return this.err
        ? this.defSrc
        : `${config.national_flag_url + (this.code || '0')}.png`;
    }
  },
  watch: {
    code(nv) {
      this.err = false;
      this.key += 1;
    }
  }
};
</script>

<style scoped></style>
