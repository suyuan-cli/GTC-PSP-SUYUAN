import axios from './axios';
export default {
  // 我的评价-企业
  enterpriseComments(params) { 
    return axios.post('/access/ui/GTC-MGR/GTCMGREVALUATE010', params);
  },
  // 我的评价-服务商（暂用企业的）
  serviceComments(params) { 
    return axios.post('/access/ui/GTC-MGR/GTCMGREVALUATE011', params);
  },
  // 我的评价-附件查询
  commentsFile(params) { 
    return axios.post('/access/ui/GTC-MGR/GTCMGREVALUATE012', params);
  },
}