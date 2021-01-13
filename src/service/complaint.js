import axios from './axios';
//消费者模块接口
export default {
  // 消费者投诉咨询查询列表记录
  getComplaintConsultInfo(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTSPFCUMERCOMPCONSULT001',
      params
    );
  },
  // 新增投诉咨询
  createComplaintSuggest(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTSPFCUMERCOMPCONSULT002',
      params
    );
  },
  //  投诉咨询详情
  getComplaintSuggestInfo(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTSPFCUMERCOMPCONSULT003',
      params
    );
  },
  // 消费者投诉咨询详情保存评价
  createEvaluate(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTSPFCUMERCOMPCONSULT004',
      params
    );
  },
  //消费者信息登记
  consumerRegInfo(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPOGREGISTRATIIN010',
      params
    );
  },
  //消费者用户登记信息查询
  getUserRegInfo(params) {
    return axios.post(
      '/access/ui/GTCPSP-FRONT/GTCPSPOGREGISTRATIIN015',
      params
    );
  }
};
