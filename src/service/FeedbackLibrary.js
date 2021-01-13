import axios from './axios';
export default {
  // 消费者投诉咨询查询列表
  getComplaintConsultInfo(params) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCMGRCUMERCOMPCONSULTSERVICE001',
      params
    );
  },
  // 消费者投诉咨询查询详情
  getComplaintConsultDetail(params) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCMGRCUMERCOMPCONSULTSERVICE002',
      params
    );
  },
  // 企业投诉咨询查询列表
  getEnterpriseComplaintConsultList(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCOMPCONSULTSERVICE001', params);
  },
  // 企业投诉咨询查询详情
  getEnterpriseComplaintConsultDetail(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCOMPCONSULTSERVICE002', params);
  },
  // 企业举报查询列表
  getEnterpriseReportList(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRREPORTINFOSERVICE001', params);
  },
  // 企业举报查询详情
  getEnterpriseReportDetail(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRREPORTINFOSERVICE002', params);
  },
  // 企业信息
  firmInfoIF(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPCBMINFO130', params);
  },
  // 咨询及应答查询列表
  getResponseInquiryList(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRVALIDATION010', params);
  },
  // 咨询及应答查询详情
  getResponseInquiryDetail(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRVALIDATION011', params);
  },
  // 评价信息图片附件查询
  getValidatDetailImage(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGREVALUATE012', params);
  },
  // 商品数据详情查询
  getGoodsInfo(params) {
    return axios.post('/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA131', params);
  }
};