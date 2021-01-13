import axios from './axios';
export default {
  // 共建方类型查询
  constructionType(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMDEF010', params);
  },
  //获取共建方信息
  constructionList(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO100', params);
  },
  //获取消费者目录
  consumerList(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO102', params);
  },
  //共建方详情信息
  constructiondetails(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO101', params);
  },
  //企业账号信息
  constructionaccount(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO122', params);
  },
  //共建方推荐、评分
  constructiongrade(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO103', params);
  },
  //共建方警示
  constructioncaution(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBMARNINGSERVICE002', params);
  },
  //取消警示
  constructioncancelcaution(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBMARNINGSERVICE003', params);
  },
  //清退
  constructionsweep(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBCLEAROUTSERVICE002', params);
  },
  //取消清退
  constructionnosweep(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBCLEAROUTSERVICE003', params);
  },
  //共建方警示目录
  cautioncatalog(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBMARNINGSERVICE001', params);
  },
  //共建方清退目录
  sweepcatalog(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBCLEAROUTSERVICE001', params);
  },
  //共建方定义查询
  constructioninquire(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCBMINFO100', params);
  },
  //   共建方账号管理
  accountinformation(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRUSER020', params);
  },
  //   共建方账号管理详情
  accountinformationdetail(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRUSER030', params);
  },
  //   共建方账号管理封号
  accountinformationtitles(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRUSER040', params);
  },
  //   共建方账号管理取消封号
  accountinformationtitlescancel(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRUSER050', params);
  },
  //共建方反馈分页查询
  constructionfeedback(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBFEEDBACK010', params);
  },
  //高频次用户分页查询
  frequencyuserlist(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE001', params);
  },
  //高频次用户标记记录分页查询
  frequencsignlist(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE003', params);
  },
  //高频次用户规则保存
  frequencsignsave(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE005', params);
  },
  //高频次用户规则启用
  frequencsignstart(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE006', params);
  },
  //高频次用户详情
  frequencydetails(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE002', params);
  },
  //高频次用户取消标记
  frequencycancelsign(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE007', params);
  },
  //高频次用户规则分页查询
  frequencyinquire(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE004', params);
  },
  //查询投诉咨询内码
  inquireisn(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRHIGHFREQUSERSERVICE008', params);
  },
  //共建方反馈分页查询
  feedbackpage(params) {
    return axios.post('access/ui/GTC-MGR/GTCMGRCOMBFEEDBACK010', params);
  },
  //共建方反馈详情页查询
  feedbackdetails(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCOMBFEEDBACK011', params);
  },
  //共建方反馈标签查询
  getDictionaryList(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMDICT010', params);
  },
  //共建方反馈标签查询
  feedbackreply(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRCOMBFEEDBACK013', params);
  },
}
