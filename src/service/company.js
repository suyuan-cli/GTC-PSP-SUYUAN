import axios from './axios';
//企业模块接口
export default {
  //  消费者投诉咨询企业办理
  complaintSuggestCompanyHandle(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPGTSENTTRANSRUL001',
      params
    );
  },
  //消费者投诉咨询查询详情记录
  getConsumerComSugDetail(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPGTSENTTRANSRUL002',
      params
    );
  },
  //  消费者投诉咨询企业办理接口
  consumerComSugCompanyHandle(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPGTSENTTRANSRUL003',
      params
    );
  },
  // 消费者投诉咨询附件下载
  consumerComSugAttachUpload(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPGTSENTTRANSRUL004',
      params
    );
  },

  // 消费者投诉咨询企业办理信息评价与企业办理信息附件下载
  consumerComSugCompanyHandleAttachUpload(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTSPFCUMERCOMPCONSULT005',
      params
    );
  }
};
