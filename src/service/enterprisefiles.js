import axios from './axios';
// 企业档案模块接口
export default {
  // 企业红黑名单分页查询
  getRedBlackListQuery(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPWBLIST010', params);
  },
  // 企业红黑名单详情页查询
  redBlackListDetail(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPWBLIST011', params);
  },
  // 新增企业红黑名单信息
  createRedBlackList(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPWBLIST012', params);
  },
  // 企业诚信等级分页查询
  getCreditRatingListQuery(params) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCMGRINTEGRITYLEVEL010',
      params
    );
  },
  // 企业诚信等级详情页查询
  creditRatingDetail(params) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCPSPINTEGRITYLEVEL011',
      params
    );
  },
  // 新增企业诚信等级信息
  createCreditRatingList(params) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCPSPINTEGRITYLEVEL012',
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
    return axios.post('/access/ui/GTC-MGR/GTCMGRENTMERCIALREG010', params);
  },
  // 企业商事详情页查询
  businessInfoDetail(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPENTMERCIALREG011', params);
  },
  // 新增企业商事信息
  createBusinessInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPENTMERCIALREG012', params);
  },
  // 撤销企业商事信息
  backoutBusinessInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPENTMERCIALREG013', params);
  }
};