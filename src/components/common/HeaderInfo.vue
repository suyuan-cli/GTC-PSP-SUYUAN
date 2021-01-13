<template>
  <!-- <div class="container-top"> -->
    <div class="detailBox listAdd">
        <div class="title">
          <h3>{{title}}</h3>
          <div class="title-right" v-if="titleTimeval">
            <span class="title-timelabel" v-if="titleTimelabel">{{titleTimelabel}}：</span>
            <span class="title-timeval">{{titleTimeval}}</span>
          </div>
        </div>
        <div class="basicInfoContent">
          <div class="basic-top">
            <div class="basic-top-left">
              <div class="basic-top-left1">
                <el-image :src="configurl.base_image_url+todata.ccodelogo">
                  <div slot="error" class="image-slot">
                    <img src="@/assets/img/nologo.png"/>
                  </div>
                </el-image>
              </div>
              <div class="basic-top-left2">
                <div class="companyname single-line-ellipsis">{{todata.editccodename}}</div>
                <template v-if="todata.providerregion">
                  <div class="mark" 
                    v-for="(item,index) in todata.providerregion.split(',')" :key="index">
                  <img src="@/assets/img/brand.png"/>
                  {{item}}
                </div>
                </template>
              </div>
            </div>
            <div class="basic-top-right">
              <commonForm
                ref="connect"
                class="connect"
                :editable="false"
                label-suffix="："
                :form-items="formItems_connect"
                :model="todata"
                label-position="right"
                label-width="110px"
              >
              </commonForm>
            </div>
          </div>
          <div class="basic-bottom">
            <div class="title">
              <h3>{{vicetitle}}</h3>
            </div>
            <div class="basic-bottom-form">
              <commonForm
                ref="detail"
                class="detail"
                :editable="false"
                label-suffix="："
                :form-items="formItems_detail"
                :model="todata"
                label-position="right"
                :label-width="labelWidth_detail"
              >
                <template slot="attachList">
                  <span v-if="todata.attachList && todata.attachList.length==0"></span>
                  <div class="fileList" v-else v-for="ele in todata.attachList">
                    <i class="el-icon-paperclip"></i>
                    <span class="fileName">{{ele.docname}}</span>
                    <a @click="download(configurl.base_image_url+ele.docpathview)">
                      <i class="el-icon-download"></i>
                    </a>
                  </div>
                </template>
                <template slot="fileList">
                  <span v-if="todata.fileList && todata.fileList.length==0"></span>
                  <div class="fileList" v-else v-for="ele in todata.fileList">
                    <i class="el-icon-paperclip"></i>
                    <span class="fileName">{{ele.docname}}</span>
                    <a @click="download(configurl.base_image_url+ele.docpathview)">
                      <i class="el-icon-download"></i>
                    </a>
                  </div>
                </template>
              </commonForm>
            </div>
          </div>
        </div>
    </div>
  <!-- </div> -->
</template>

<script>
import commonForm from '@/components/common/common-form/index.vue';
import configurl from '@/p.config.js';
export default {
  components:{
    commonForm,
  },
  props:{
    title:{
      type:String
    },
    vicetitle:{
      type:String
    },
    titleTimelabel:{
      type:String
    },
    titleTimeval:{
      type:[String,Number]
    },
    formItems_connect:{
      type:Array,
      default:()=>{
        return []
      }
    },
    formItems_detail:{
      type:Array,
      default:()=>{
        return []
      }
    },
    todata:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    labelWidth_detail:{
      type:String,
      default:"110px"
    }
  },
  data(){
    return{
      configurl,
    }
  },
  methods:{
  },
  watch:{
    todata:{
      handler:function(val){
        console.log(val)
      },
      deep:true,
      immediate: true
    }
  }
}
</script>

<style scoped>
.container-top{
  min-height: 0;
  position: relative;
}
.detailBox{
  padding: 20px;
  background: #fff;
}
.detailBox .title{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.detailBox .title h3{
  font-size:16px;
  font-weight:600;
  color:#333333;
  line-height:24px;
}
.detailBox .title .title-right{
  font-size:12px;
  line-height: 24px;
  color: #999999;
}
.basic-top{
  display: flex;
  margin-bottom: 30px;
}
.basicInfoContent .basic-top .basic-top-left{
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  width: 278px;
  border-right: 1px solid #D8D8D8;
}
.basicInfoContent .basic-top .basic-top-left1{
  width:47px;
  height:47px;
}
.basicInfoContent .basic-top .basic-top-left1 >>> .el-image{
  width: 100%;
  height: 100%;
}
.basicInfoContent .basic-top .basic-top-left1 >>> .el-image .image-slot{
  width: 100%;
  height: 100%;
}
.basicInfoContent .basic-top .basic-top-left1 img{
  width:100%;
  height:100%;
}
.basicInfoContent .basic-top .basic-top-left2{
  width: 215px;
}
.basicInfoContent .basic-top .basic-top-left2 .companyname{
  font-size:14px;
  color: #333333;
  line-height:20px;
  width: 200px;
  margin-bottom: 6px;
}
.basicInfoContent .basic-top .basic-top-left2 .mark{
  display: inline-block;
  height:20px;
  background:rgba(237,237,237,1);
  border-radius:10px;
  font-size: 12px;
  line-height: 20px;
  color: #666666;
  padding: 0 10px;
}
.basicInfoContent .basic-top-left2 .mark img{
  width: 11px;
  height: 11px;
  /* border: 1px dashed #333333; */
  vertical-align: middle;
  margin-right: 3px;
}
.basicInfoContent .basic-top-right{
  box-sizing: border-box;
  padding-right: 20px;
  flex-shrink: 0;
  width: 900px;
  display: flex;
  align-items: center;
}
.connect{
  width: 100%;
}
.connect >>> .el-form-item__label{
  color:#333333;
  line-height: 20px;
}
.connect >>> .el-form-item__content{
  color:#666666;
  line-height: 20px;
}
.detail >>> .el-form-item__label{
  color:#333333;
}
.detail >>> .el-form-item__content{
  color:#666666;
  line-height: 20px;
  margin-top: 6px;
}

.basic-bottom{
  padding: 20px;
  background:rgba(249,249,249,1);
  border-radius:4px;
}

.fileList{
  display: inline-block;
  margin-right: 50px;
}
.fileList .fileName{
  display: inline-block;
  width: 125px;
  color: rgba(0, 122, 255, 1);
  font-size:12px;
  margin-left: 2px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.fileList .el-icon-download{
  cursor: pointer;
  vertical-align: middle;
  color: rgba(0, 122, 255, 1);
}
</style>