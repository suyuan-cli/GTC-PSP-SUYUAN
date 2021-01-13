import axios from './axios';
// 企业档案模块接口
export default {
  // 企业红黑名单分页查询
  getRedBlackListQuery(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPWBLIST010', params);
  },
  // 企业红黑名单详情页查询
  redBlackListDetail(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPWBLIST011', params);
  },
  // 新增企业红黑名单信息
  createRedBlackList(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPWBLIST012', params);
  },
  // 企业诚信等级分页查询
  getCreditRatingListQuery(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPINTEGRITYLEVEL010',
      params
    );
  },
  // 企业诚信等级详情页查询
  creditRatingDetail(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPINTEGRITYLEVEL011',
      params
    );
  },
  // 新增企业诚信等级信息
  createCreditRatingList(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPINTEGRITYLEVEL012',
      params
    );
  },
  // Excel模板下载
  downloadExcelModel(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMIMPORT020', params);
  },
  // Excel导入
  uploadExcelData(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMIMPORT010', params);
  },
  // 企业商事分页查询
  getBusinessInfoList(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPENTMERCIALREG010', params);
  },
  // 企业商事详情页查询
  businessInfoDetail(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPENTMERCIALREG011', params);
  },
  // 新增企业商事信息
  createBusinessInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPENTMERCIALREG012', params);
  },
  // 撤销企业商事信息
  backoutBusinessInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPENTMERCIALREG013', params);
  },
  //共建方信息登记提交
  submitCbmRegInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPCBMINFO104', params);
  },
  //查询共建方登记信息
  queryCbmRegInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPCBMINFO102', params);
  },

  //查询共建方登记信息
  queryCbmRegUpdateInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCBMINFO101', params);
  },
  //共建方登记信息变更
  updateCbmRegInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPCBMINFO105', params);
  },
  //企业账号信息
  constructionaccount(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO122', params);
  },
};
