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
      :file-list="showfilelist"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios';
const config = require('@/p.config.js');
import Emitter from '../common/mixins/emitter';

export default {
  name: 'AttachUpload',
  components: {},
  mixins: [Emitter],
  props: {
    attachtype: String,
    type: String,
    title: {
      type: String,
      default() {
        return '上传文件';
      }
    },
    filelist: {
      type: Array,
      /*{url:图片路径，必要，removed:是否删除了}*/
      default() {
        return [];
      }
    },
    limit: {
      type: Number,
      default: Infinity
    },
    multiple: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: config.apphead + '/access/form/FRONT-COMM/GTCCOMMATTACH10'
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  created() {},
  mounted() {
    //遍历 赋值
    this.filelist.forEach(item => {
      item.url = item.filepath;
      item.saveMode = '1';
    });
  },
  data() {
    return {
      loading: false,
      imgUrlPrefix: config.base_image_url,
      headers: { 'Content-Type': false }
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
        .then(response => {
          // console.log(response.data.data);
          response.data.data.forEach((val, index) => {
            this.filelist.push({
              url: config.base_image_url + val.tmpUrl,
              filepath: val.tmpid,
              type: this.type,
              uid: params.file.uid,
              filename: params.file.name,
              saveMode: '2',
              id: val.tmpid,
              name: params.file.name
            });
          });
          // this.$emit('updateAttachs', this.filelist);
        })
        .catch(() => {
          this.$message.error(`${params.file.name}文件上传失败。`);
        })
        .finally(() => {
          this.dispatch('ElFormItem', 'el.form.change', ['validate']);
          this.loading = false;
        });
    },
    remove(file, fileList) {
      if (file.cbmregicode) {
        file.saveMode = '4';
      } else {
        let index = this.filelist.findIndex(item => item.uid === file.uid);
        this.filelist.splice(index, 1);
      }
      this.dispatch('ElFormItem', 'el.form.change', ['validate']);
    }
  },
  computed: {
    showfilelist() {
      return this.filelist.filter(
        file => !file.saveMode || file.saveMode !== '4'
      );
    },
    showBtn() {
      return (
        this.filelist.filter(file => !file.saveMode || file.saveMode !== '4')
          .length < this.limit
      );
    }
  },
  watch: {
    filelist: {
      handler() {
        /*设置类型、url前缀（若已http开头则不添加前缀）*/
        this.filelist.forEach(item => {
          item.type = item.type || this.type;
          if (!item.url.startsWith(this.imgUrlPrefix)) {
            item.url = this.imgUrlPrefix + item.url;
          }
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped>
.upload-box {
  width: 100%;
}
.upload-box >>> .el-upload {
  border-radius: 0;
  height: 24px;
}
.hide-btn >>> .el-upload {
  display: none;
}
.upload-box >>> .el-upload-list__item:focus {
  outline: 0;
}
</style>
