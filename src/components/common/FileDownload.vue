<template>
  <span class="file-download-link">
    <i class="el-icon-paperclip" v-if="!textOnly"></i>
    <el-tooltip content="点击下载" placement="top">
      <span class="file-download-label" @click="downloadFn">
        <slot></slot>
      </span>
    </el-tooltip>
    <i class="el-icon-download" v-if="!textOnly" @click="downloadFn"></i>
  </span>
</template>

<script>
const config = require('../../p.config');
export default {
  name: 'FileDownload',
  components: {},
  props: {
    url: String,
    textOnly: {
      type: Boolean,
      default: false
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  created() {},
  mounted() {},
  data() {
    return {
      labelStyle: {}
    };
  },
  methods: {
    downloadFn() {
      if (!this.url) {
        return this.$message.warning('文件下载地址为空！');
      }
      if (!this.url.startsWith(config.base_image_url)) {
        this.download(config.base_image_url + this.url);
      } else {
        this.download(this.url);
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.file-download-link {
  color: #666666;
  font-size: 14px;
  width: fit-content;
  cursor: pointer;
}
.el-icon-paperclip {
  color: #333333;
  margin-right: 10px;
}
.el-icon-download {
  margin-left: 20px;
}
.file-download-label:hover {
  text-decoration: underline;
  color: #007aff;
}
.el-icon-download {
  color: #007aff;
}
</style>
