<template>
  <div class="picture-group">
    <slot name="title">
      <div class="picture-group-title" v-if="title">{{ title }}</div>
    </slot>
    <div class="picture-group-body">
      <template v-for="(img, index) in showImages">
        <div class="picture-item">
          <el-image
            class="picture-item-body"
            :src="img.url"
            :preview-src-list="previewList"
            alt="点击预览"
            title="点击预览"
          ></el-image>
          <!--<img-->
          <!--@click="imgPreview(img)"-->
          <!--:src="img.url"-->
          <!--class="picture-item-body"-->
          <!--alt="点击预览"-->
          <!--title="点击预览"-->
          <!--/>-->
          <i
            v-show="editable"
            class="picture-item-close el-icon-circle-close"
            @click="imgRemove(img, index)"
          ></i>
        </div>
      </template>
      <el-upload
        v-loading="loading"
        ref="imgUpload"
        :headers="headers"
        v-if="editable && showImages.length < limit"
        :action="action"
        list-type="picture-card"
        :show-file-list="false"
        :http-request="httpRequest"
      >
        <div class="icon-btn">
          <i class="el-icon-plus"></i>
          <slot name="iconLabel">
            <span v-if="iconLabel">{{ iconLabel }}</span>
          </slot>
        </div>
      </el-upload>
      <div class="empty-show" v-if="!editable && this.images.length === 0">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const config = require('@/p.config.js');

export default {
  name: 'ImgUpload',
  components: {},
  props: {
    title: String,
    iconLabel: String,
    type: String,
    images: {
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
    action: {
      type: String,
      default: config.uploader,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  created() {},
  mounted() {},
  data() {
    return {
      loading: false,
      imgUrlPrefix: config.base_image_url,
      headers: { 'Content-Type': false },
    };
  },
  methods: {
    imgRemove(img, index) {
      index = this.images.findIndex((item) => item.id === img.id);
      this.$set(this.images[index], 'removed', true);
    },
    httpRequest(params) {
      let { headers } = params;
      let formData = new FormData();
      formData.append('fileName', params.file.name);
      formData.append('attachData', params.file);
      this.loading = true;
      axios
        .post(params.action, formData, headers)
        .then((response) => {
          console.info(this.images);
          // this.images = response.data.data;

          response.data.data.forEach((val, index) => {
            this.images.push({
              url: config.base_image_url + val.tmpUrl,
              id: val.tmpid,
              type: this.type,
              fileName: params.file.name,
            });
            // val.tmpUrl = 'http://10.10.104.3/fbacs/' + val.tmpUrl;
          });
          console.info(this.images);
          this.$emit('on-result-change', this.images);
          // if(response.data.status=='success'){
          //     let temp = response.data.data;
          //     temp.array.forEach(element => {
          //       console.info(element)
          //     });
          // this.images.tmpUrl = 'http://10.10.104.3/fbacs/' + this.images.tmpUrl ;
          // }else{
          //  this.$message({
          //   message: '上传失败',
          //   type: 'success',
          //   // offset: 180
          // });
          // }
        })
        .catch(() => {
          this.$message.error(`${params.file.name}文件上传失败。`);
        })
        .finally(() => {
          this.loading = false;
          this.$refs.imgUpload && this.$refs.imgUpload.clearFiles();
        });
    },
  },
  computed: {
    previewList() {
      return this.showImages.map((item) => item.url);
    },
    showImages() {
      return this.images.filter((item) => !item.removed);
    },
  },
  watch: {
    images: {
      handler() {
        /*设置类型、url前缀（若已http开头则不添加前缀）*/
        this.images.forEach((item) => {
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
.picture-item >>> .el-icon-circle-close {
  color: #ffffff;
}
.picture-group >>> .el-upload--picture-card {
  width: 108px;
  height: 108px;
  line-height: 114px;
}
.picture-group {
  box-sizing: border-box;
  /*height: 180px;*/
  background: rgba(250, 250, 250, 1);
  width: fit-content;
  padding: 16px 20px;
  margin-right: 20px;
}

.picture-group .picture-group-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(79, 79, 79, 1);
  height: 20px;
  line-height: 20px;
}

.picture-group .picture-group-body {
  display: flex;
  margin-top: 20px;
}

.picture-group .picture-item {
  width: 108px;
  height: 108px;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
}

.picture-group .picture-item:last-child {
  margin-right: 0px;
}

.picture-item .picture-item-body {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}
.picture-item .picture-item-body >>> img {
  object-fit: cover;
}

.picture-item .picture-item-close {
  position: absolute;
  font-size: 22px;
  color: #c0c0c0;
  right: -10px;
  top: -10px;
  background: #ffffff;
  border-radius: 11px;
  cursor: pointer;
}
.icon-btn {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon-btn span {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: gray;
}
.empty-show {
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
  box-sizing: border-box;
  border: dashed 1px rgb(192, 204, 218);
  border-radius: 8px;
}
</style>
