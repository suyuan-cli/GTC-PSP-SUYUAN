<template>
  <div class="video-group videoplaycon">
    <slot name="title">
      <div class="video-group-title" v-if="title">{{ title }}</div>
    </slot>
    <div class="video-group-body" v-loading="uploading">
      <div
        tabindex="0"
        class="el-upload el-upload--picture-card"
        v-show="!previewImage && editable"
      >
        <div class="icon-btn" id="browseButton">
          <i class="el-icon-plus"></i>
          <span class="icon-btn-label">{{ iconLabel }}</span>
        </div>
      </div>
      <div class="empty-show" v-show="!previewImage && !editable">暂无数据</div>
      <div class="picture-item" v-show="previewImage">
        <img class="picture-item-body" :src="previewImage" alt="点击播放" />
        <i
          class="el-icon-caret-right"
          v-show="!showVideo"
          @click.stop="playVideo"
        ></i>
        <i
          v-show="previewImage && editable"
          class="picture-item-close el-icon-circle-close"
          @click.stop="cancelUpload"
        ></i>
      </div>
    </div>

    <el-dialog
      title="上传进度"
      :visible.sync="uploading"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div>
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="percentage"
        ></el-progress>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stopUpload">取 消</el-button>
      </span>
    </el-dialog>

    <div
      v-if="showVideo"
      class="video-player-container"
      ref="videoPlayerContainer"
    >
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
      ></video-player>
      <span class="video-player-close" @click="videoPlayerClose">X</span>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player';
import '../../../../node_modules/video.js/dist/video-js.css';
import plupload from 'plupload/js/plupload.full.min.js';
import FileMd5 from '@/public-method/file-md5.js';
import config from '@/p.config.js';
//生成guid
let getGuid = function (len, radix) {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
};

export default {
  name: 'Plupload',
  components: {
    videoPlayer,
  },
  props: {
    reqsyscode: {
      type: String,
      default: '',
    },
    callbackurl: {
      type: String,
      default: '',
    },
    //封面
    coverurl: {
      type: String,
      default: '',
    },
    //播放地址
    playaddress: {
      type: String,
      default: '',
    },
    //文件类型
    type: {
      type: String,
      default: 'video/mp4',
    },
    iconLabel: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    acceptFiles: {
      // 文件上传类型限制
      type: String,
      default: '.png,.jpg,.bmp,.doc,.docx,.xls,.xlsx,.pdf,.rar,.zip,.mp4,.txt',
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    limit: {
      //上传文件个数限制
      type: Number,
      default: 5,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showVideo: false,
      percentage: 0,
      uploadSuccess: false,
      previewList: [],
      basicForm: {},
      fileRawList: [],
      uploading: false,
      uploader: {},
      responseData: {},
      uploadedFile: {
        type: 'video/mp4', // 类型
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: '', // url地址
          },
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          volumeControl: true, // 声音控制键
          playToggle: true, // 暂停和播放键
          progressControl: true, // 进度条
          fullscreenToggle: false, // 全屏按钮
        },
      },
    };
  },
  watch: {},
  mounted() {
    this.pluploadInit();
    if (this.coverurl && this.playaddress) {
      this.previewList.push(config.videoUploadUrl + this.coverurl);
      this.uploadedFile.type = this.type;
      this.responseData = {
        coverurl: this.coverurl,
        playaddress: this.playaddress,
      };
    }
  },
  computed: {
    previewImage() {
      return this.previewList[0] || '';
    },
  },
  methods: {
    playerReadied(player) {
      // let _this = this;
      // var hls = player.tech({ IWillNotUseThisInPlugins: true });
      // console.log('hls', hls);
      // player.tech_.hls.xhr.beforeRequest = function (options) {
      //   options.headers = {
      //     'Accept-Ranges': 'bytes',
      //   };
      //   return options;
      // };
    },
    videoPlayerClose() {
      this.showVideo = false;
    },
    onPlayerPlay() {},
    playVideo() {
      this.showVideo = true;
      this.$nextTick(() => {
        this.playerOptions.sources[0].type = this.uploadedFile.type;
        this.playerOptions.sources[0].src =
          config.videoUploadUrl + this.responseData.playaddress;
        this.playerOptions.poster =
          config.videoUploadUrl + this.responseData.coverurl;
        this.playerOptions.autoplay = true;
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        this.$refs.videoPlayerContainer.style.height = height + 'px';
        this.$refs.videoPlayerContainer.style.width = width + 'px';
        this.$refs.videoPlayer.player.enterFullWindow();
        this.$refs.videoPlayer.player.play();
      });
    },
    cancelUpload() {
      this.percentage = 0;
      this.fileRawList = [];
      this.previewList = [];
      this.$emit('cancelUpload');
    },
    stopUpload() {
      this.uploading = false;
      this.uploader.stop();
    },
    pluploadInit() {
      var vm = this;
      var uploader = new plupload.Uploader({
        browse_button: 'browseButton',
        url: config.videoUploadUrl + 'fileup',
        chunk_size: '2MB',
        multipart: true, // 为true时将以multipart/form-data
        max_retries: 1, // 当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试
        multi_selection: false, // 是否可以在文件浏览对话框中选择多个文件
        filters: {
          mime_types: [{ extensions: vm.acceptFiles.replace(/\./g, '') }],
          prevent_duplicates: false, // 不允许选取重复文件
          max_file_size: '10240mb', // 最大只能上传400kb的文件
        },
        headers: {
          Accept: 'application/json',
        },

        init: {
          BeforeUpload(up, file, arg) {
            // 上传时的附加参数，以键/值对的形式传入
            vm.uploading = true;
            up.setOption('multipart_params', {
              type: file.type,
              guid: getGuid(16, 16),
              id: getGuid(8, 16),
              lastModifiedDate: file.lastModifiedDate,
              md5value: file.md5,
              size: file.size,
              reqsyscode: this.reqsyscode,
              callbackurl: this.callbackurl,
            });
            vm.uploading = true;
          },
          QueueChanged() {
            console.log('QueueChanged');
            setTimeout(() => {
              uploader.start();
            }, 100);
          },
          UploadProgress(uploader, file) {
            console.log('UploadProgress', uploader, file);
            vm.percentage = file.percent;
          },
          FileFiltered(up, files) {
            console.log('FileFiltered');
          },
          FilesAdded(up, files) {
            vm.fileRawList.push(...files);
            if (vm.fileRawList.length > vm.limit) {
              vm.deleteFile(vm.fileRawList[0]);
            }
            files.forEach((f) => {
              f.status = -1;
              FileMd5(f.getNative(), (e, md5) => {
                f['md5'] = md5;
                f.status = 1;
                uploader.start();
              });
            });
          },
          FilesRemoved(upp, files) {
            vm.uploading = false;
          },
          FileUploaded(up, file, info) {
            console.log('FileUploaded', up, file, info);
            vm.uploadedFile = file;
            if (info.status === 200) {
              let response = JSON.parse(info.response || '{}');
              if (response.status == 'success') {
                vm.responseData = response.data;
                console.log('vm.responseData', vm.responseData);
                vm.$emit('unloaded', {
                  res: vm.responseData,
                });
                if (vm.responseData.coverurl) {
                  vm.previewList.push(
                    config.videoUploadUrl + vm.responseData.coverurl
                  );
                }
              }
            }
          },
          UploadComplete(up, files) {
            console.log('UploadProgress', up, files);
            vm.uploading = false;
          },
          Error(up, args) {
            vm.uploading = false;
          },
        },
      });
      uploader.init();
      this.uploader = uploader;
    },
    deleteFile(row) {
      this.fileRawList.splice(this.fileRawList.indexOf(row), 1);
      row.url &&
        this.$emit(
          'onChange',
          this.fileRawList.filter((item) => {
            return item.url;
          })
        );
    },
  },
};
</script>
<style scoped>
.videoplaycon >>> .video-js .vjs-control-bar {
  bottom: 120px !important;
}
.videoplaycon >>> .el-icon-caret-right {
  font-size: 40px;
  color: white;
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 9999999999999;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -20px;
}
.video-player-close {
  font-size: 36px;
  color: white;
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 99999999;
  cursor: pointer;
}
.videoplaycon >>> .vjs-paused .vjs-big-play-button {
  display: block !important;
}
.video-player-container {
  position: fixed;
  z-index: 99999;
  left: 0px;
  top: 0px;
}
.video-player {
  position: absolute;
  z-index: 99999;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
.picture-item >>> .el-icon-circle-close {
  color: #ffffff;
}
.video-group >>> .el-upload--picture-card {
  width: 108px;
  height: 108px;
  line-height: 114px;
}
.video-group {
  box-sizing: border-box;
  /*height: 180px;*/
  background: rgba(250, 250, 250, 1);
  width: fit-content;
  padding: 16px 20px;
  margin-right: 20px;
}

.video-group .video-group-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(79, 79, 79, 1);
  height: 20px;
  line-height: 20px;
}

.video-group .video-group-body {
  display: flex;
}

.video-group .picture-item {
  width: 108px;
  height: 108px;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
}

.video-group .picture-item:last-child {
  margin-right: 0px;
}

.picture-item .picture-item-body {
  width: 100%;
  height: 100%;
  border-radius: 8px;
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
  color: #9a9a9a;
}
.empty-show {
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
  box-sizing: border-box;
  border: dashed 1px rgb(192, 204, 218);
  border-radius: 8px;
  font-size: 14px;
  color: #666666;
}
.el-icon-plus {
  font-size: 56px;
  color: #d8d8d8;
}
</style>
