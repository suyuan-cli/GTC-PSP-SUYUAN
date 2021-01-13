import axios from './axios';
export default {
  // 风险信息上传
  riskReportList(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKREPORTINFO010', params);
  },
  riskReportDetail(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKREPORTINFO011', params);
  },
  riskReportSave(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKREPORTINFO012', params);
  },
  // 新增提交、删除
  riskReportSubmit(params = {}) {
    console.log(params, '接口数据');
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKREPORTINFO013', params);
  },

  // 风险预警发布
  riskReleaseList(params = {}) {
    return axios.post(
      'access/ui/GTC-MGR/GTCMGRRISKWARNINGINFOSERVICE005',
      params
    );
  },
  //   新增风险发布
  riskReleaseSingle(params = {}) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCMGRRISKWARNINGINFOSERVICE004',
      params
    );
  },
  riskReleaseDetail(params = {}) {
    return axios.post(
      'access/ui/GTC-MGR/GTCMGRRISKWARNINGINFOSERVICE002',
      params
    );
  },
  // 新增提交、删除
  riskReleaseSubmit(params = {}) {
    return axios.post(
      'access/ui/GTC-MGR/GTCMGRRISKWARNINGINFOSERVICE003',
      params
    );
  },

  // 风险预警
  riskWarningList(params = {}) {
    return axios.post(
      'access/ui/GTC-MGR/GTCMGRRISKWARNINGINFOSERVICE001',
      params
    );
  },
  riskWarningDetail(params = {}) {
    return axios.post(
      'access/ui/GTC-MGR/GTCMGRRISKWARNINGINFOSERVICE002',
      params
    );
  },

  // 风险规则
  riskRulesList(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKRULE010', params);
  },
  // 新增
  riskRulesSubmit(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKRULE030', params);
  },
  riskRulesEnabled(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKRULE050', params);
  },
  riskRulesDisabled(params = {}) {
    return axios.post('access/ui/GTC-MGR/GTCMGRRISKRULE060', params);
  },
  riskRulesDetail(params) {
    return axios.post('/access/ui/GTC-MGR/GTCMGRRISKRULE070', params);
  }
};
