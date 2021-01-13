import axios from './axios';
import { modulename } from './config.js';
import { JSEncrypt } from 'jsencrypt';

export default {
  //上传附件数据
  upload(formData) {
    // let formData=new FormData();
    // formData.append('file',this.$refs.file.files[0])
    axios.post(`/access/${modulename}//GTCCOMMATTACH10`, formData, {
      'Content-Type': 'multipart/form-data'
    });
  },
  //登录
  loginFormat(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMLOGIN010`, params);
  },
  //登出
  logoutFormat(params) {
    return axios.get(`/access/${modulename}/FRONTCOMMLOGIN020`, params);
  },
  //是否登陆
  isLogout(params) {
    return axios.get(`/access/${modulename}/FRONTCOMMLOGIN030`, params);
  },
  //用户权限菜单查询
  getUserMenus(params) {
    return axios.get(`/access/${modulename}/FRONTCOMMMENU010`, params);
  },
  //获取登陆用户信息
  getUserInfo(params) {
    return axios.get(`/access/${modulename}/FRONTCOMMUSER010`, params);
  },
  //修改密码
  modifyPwd(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMUSER020`, params);
  },
  //找回密码
  getBackPwd(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMUSER030`, params);
  },
  //发送手机验证码
  sendPhoneCode(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMAUTHCODE020`, params);
  },
  //发送邮箱验证码
  sendEmail(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMAUTHCODE030`, params);
  },
  //验证码校验
  checkCode(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMAUTHCODE040`, params);
  },
  //生成验证码
  generateCode(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMCAPTHA010`, params);
  },
  //频道列表查询
  channelList(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMCMS010`, params);
  },
  //栏目列表查询
  columnList(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMCMS020`, params);
  },
  //生成验证码
  generateCode2(params) {
    return axios.post(`/access/${modulename}/FRONTCOMMAUTHCODE010`, params);
  },

  getIdentificationList() {
    return axios.post(`/access/${modulename}/FRONTCOMMAUTHCODE010`, params);
  },

  // 码表查询
  getCodeList(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMCODE010', params);
  },

  // 字典查询
  getDictionaryList(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMDICT010', params);
  },

  // 下载进度
  dowloadFileProgress(params) {
    return axios.post('/access/progress/FRONT-COMM/FRONTDEMO010 ', params);
  },

  //获取公钥
  getEncryptKey(params) {
    return axios.post('/access/ui/SN-COMM-FRONT/FRONTCOMMCRYPT010', params);
  },
  //加密
  encrypt(val) {
    let key = localStorage.getItem('encryptkey');
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(key);
    return encrypt.encrypt(val);
  },
  //获取用户信息
  getUserInfos(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/do/GTCPSPUSER015', params);
  },
  //获取企业登记信息
  getEntRegInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCMGRCBMINFO121', params);
  }
};
