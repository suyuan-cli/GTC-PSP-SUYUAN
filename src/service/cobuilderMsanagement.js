import axios from './axios';
// 共建方模块
export default {
  // 共建方定义查询
  getCobuilderDefine(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCBMDEF010', params);
  },
  // 共建方权限查询
  getCobuilderPower(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCBMINFO120', params);
  },
  // 共建方警示分页查询列表
  getWarningMsanagementList(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCOMBMARNINGSERVICE001', params);
  },
  //共建方准入定义查询
  admittanceinquire(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCBMACCESS020', params);
  },
 
};