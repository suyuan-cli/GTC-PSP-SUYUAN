<template>
  <div class="upload-box" :class="{ 'hide-btn': !showBtn }">
    <el-upload
      class="upload-demo"
      v-loading="loading"
      ref="fileUpload"
      :headers="headers"
      :action="action"
      :http-request="httpRequest"
      :on-remove="remove"
      :limit="limit"
      :multiple="multiple"
      :file-list="filelist"
      :on-preview="handlePreview"
    >
      <el-button size="small" v-show="showBtn">
        <span class="iconfont icon8_icon_weishiyong"></span>
        {{ title }}
      </el-button>
      <!-- <template slot='tip'></template> -->
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios';
const config = require('@/p.config.js');

export default {
  name: 'AttachUpload',
  components: {},
  props: {
    type: String,
    title: {
      type: String,
      default() {
        return '上传文件';
      },
    },
    filelist: {
      type: Array,
      /*{url:图片路径，必要，removed:是否删除了}*/
      default() {
        return [];
      },
    },
    limit: {
      type: Number,
      default: Infinity,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: config.uploader,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    upWidth: {
      type: String,
      default: '100px',
    },
  },
  created() {},
  mounted() {
    this.bindMethods('fileUpload');
  },
  data() {
    return {
      loading: false,
      imgUrlPrefix: config.base_image_url,
      headers: { 'Content-Type': false },
    };
  },
  methods: {
    httpRequest(params) {
      let { headers } = params;
      let formData = new FormData();
      formData.append('fileName', params.file.name);
      formData.append('attachData', params.file);
      this.loading = true;
      axios
        .post(params.action, formData, headers)
        .then((response) => {
          // console.log(response.data.data);
          console.info(this.filelist);
          response.data.data.forEach((val, index) => {
            this.filelist.push({
              url: config.base_image_url + val.tmpUrl,
              tmpUrl: val.tmpUrl,
              id: val.tmpid,
              type: this.type,
              uid: params.file.uid,
              name: params.file.name,
            });
          });
          this.$emit('ggg', this.filelist);
        })
        .catch((error) => {
          params.onError();
          this.$message.error(`${params.file.name}文件上传失败。`);
        })
        .finally(() => {
          // console.log(this);
          this.loading = false;
          // this.$nextTick(() => {
          //   this.$refs.fileUpload.clearFiles();
          // })
        });
    },
    remove(file, fileList) {
      let index = this.filelist.findIndex((item) => item.uid === file.uid);
      this.$set(this.filelist[index], 'removed', true);
      this.$emit('ggg', this.filelist);
    },
    handlePreview(file) {
      this.download(file.url);
    },
  },
  computed: {
    showBtn() {
      return this.filelist.filter((file) => !file.removed).length < this.limit;
    },
  },
  watch: {
    filelist: {
      handler() {
        /*设置类型、url前缀（若已http开头则不添加前缀）*/
        this.filelist.forEach((item) => {
          item.type = item.type || this.type;
          if (!item.url.startsWith(this.imgUrlPrefix)) {
            item.url = this.imgUrlPrefix + item.url;
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.upload-box {
  line-height: 14px;
}

.upload-box >>> .el-upload {
  height: 28px;
}
.upload-box >>> .el-upload--text {
  /*width: 100%;*/
  /*border-radius: 2px;*/
  /*font-size: 0;*/
}
.hide-btn >>> .el-upload {
  display: none;
}
.upload-box >>> .el-upload-list__item:focus {
  outline: 0;
}
.upload-demo {
  font-size: 12px;
}
.upload-demo .el-button {
  width: 100px;
  height: 28px;
  border-radius: 2px;
  padding: 0;
  background: #e3eeff;
  border: 1px solid #e3eeff;
  color: #4c8ff7;
}
.upload-demo .el-button:hover {
  background: #c4dcfd;
  border: 1px solid #c4dcfd;
}
.upload-demo .el-button .iconfont {
  font-size: 14px;
}
.upload-box >>> .el-icon-close-tip {
  display: none;
}
</style>
