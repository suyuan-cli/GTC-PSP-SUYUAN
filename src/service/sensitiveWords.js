import axios from './axios';
export default {
  // 敏感词类型列表
  sensitiveList(params) { 
    return axios.post('access/ui/GTC-MGR/SENSITIVEWORDTYPESERVICE001', params);
  },
  //类型下敏感词列表
  sensitiveWordList(params) { 
    return axios.post('access/ui/GTC-MGR/GTCMGRSENSITIVEWORDSERVICE001', params);
  },
  //敏感词类型新增修改
  addSensitiveType(params) { 
    return axios.post('access/ui/GTC-MGR/SENSITIVEWORDTYPESERVICE003', params);
  },
  //类型下敏感词新增修改
  addSensitiveWord(params) { 
    return axios.post('access/ui/GTC-MGR/GTCMGRSENSITIVEWORDSERVICE002', params);
  },
  //模板下载地址
  download(params){
    return axios.post('access/ui/GTC-MGR/FRONTCOMMIMPORT020', params);
  },
  // Excel导入
  uploadExcelData(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMIMPORT010', params);
  },
}