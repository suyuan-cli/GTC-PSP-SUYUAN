import axios from './axios';

function parseData(data, resolve, reject) {
  if (data.data.status === 'success') {
    data.data.data = JSON.parse(data.data.data);
    resolve(data.data);
  } else {
    reject(data.data);
  }
}

// 侵权处理列表
export function infringementlist(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGRTORTHANDLE010`, param);
}

// 添加侵权处理
export function infringementAdd(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPTORTHANDLE011`, param);
}

// 企业信息
export function firmInfoIF(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCBMINFO130`, param);
}

// 举报列表
export function reportlist(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE001`, param);
}

// 创建举报
export function reportAdd(param) {
  return axios.post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE003`, param);
}

// 删除举报
export function reportDelete(param) {
  return axios.post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE005`, param);
}

// 提交举报
export function reportSubmit(param) {
  return axios.post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE004`, param);
}

// 举报详情
export function reportDetail(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE002`, param);
}

// 举报附件下载
export function reportFileDownload(param = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE006`, param)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}

// 举报附件删除
export function reportFileDelete(params) {
  return axios.post('access/GTC-MGR/PSPREPORTINFOSERVICE008', params);
}

// 举报列表（监管）
export function reportDisposeList(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/PFREPORTINFOSERVICE001`, param);
}

// 举报详情（监管）
export function reportDisposeDetail(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/PFREPORTINFOSERVICE002`, param);
}

// 举报处理（监管）
export function reportDisposeOpt(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/PFREPORTINFOSERVICE003`, param);
}

// 举报处理结果附件下载
export function disFileDownload(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/PSPREPORTINFOSERVICE007`, param);
}

//省市区
export function placecode(params) {
  return axios.post('access/FRONT-COMM/FRONTCOMMCODE010', params);
}
// 需求发布列表-我的订单
export function demandOrderlist(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPMYORDER010`, param);
}
// 需求发布列表-企业
export function demandlistFirm(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGRDESIREDREG010`, param);
}

// 需求响应列表-服务商
export function demandlistService(param = {}) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPDESIREDREG011`, param);
}

// 创建需求
export function demandAdd(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPDESIREDREG014`, param);
}

// 提交需求
export function demandSubmit(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPDESIREDREG017`, param);
}

// 撤销需求
export function demandUndo(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPDESIREDREG016`, param);
}

// 需求复制
export function demandCopy(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPDESIREDREG018`, param);
}

// 需求详情
export function demandDetail(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGRDESIREDREG011`, param);
}

// 需求详情-我的订单
export function demandOrderDetail(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGRMYORDER010`, param);
}

// 需求详情附件-我的订单
export function demandOrderDetailFile(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGRMYORDER011`, param);
}

// 需求响应说明提交-服务商
export function demandExplainSubmit(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPMYORDER014`, param);
}

// 需求详情附件
export function demandFileDownload(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGRDESIREDREG012`, param);
}

// 需求附件删除
export function demandFileDelete(params) {
  return axios.post('access/GTC-MGR/GTCPSPDESIREDREG019', params);
}

// 需求响应提交-服务商
export function demandResponseSubmit(params) {
  return axios.post('access/ui/GTC-MGR/GTCPSPDESIREDREG022', params);
}
// 响应机构查询-服务商（仅查自己响应的内容）
export function demandServiceList(params) {
  return axios.post('access/ui/GTC-MGR/GTCMGRDESIREDREG013', params);
}
// 选择服务商-企业
export function demandChooseServiceIF(params) {
  return axios.post('access/ui/GTC-MGR/GTCPSPDESIREDREG021', params);
}

// 需求-评价提交-企业
export function demandEvaluationSubmit(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPMYORDER016`, param);
}
// 需求-评价详情
export function demandEvaluationDetail(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGREVALUATE013`, param);
}
// 需求-评价详情-附件
export function demandEvaluationDetailFile(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCMGREVALUATE012`, param);
}

// 评价提交
export function evaluationInfo(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPEVALUATE011`, param);
}

// 我要投诉咨询列表
export function complainAndAdvisoryListIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCOMPCONSULT001`, param);
}

// 我要投诉咨询列表-服务商
export function complainAndAdvisorydisposeListIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION001`, param);
}
// 我下发的标识
export function myDispthLogo(param) {
  return axios.post(`access/ui/GTC-MGR/GTCPSPOGCODE100`, param);
}
// 我要投诉咨询保存
export function complainAndAdvisorySaveIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCOMPCONSULT003`, param);
}

// 我要投诉咨询提交
export function complainAndAdvisorySubmitIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCOMPCONSULT004`, param);
}

// 我要投诉咨询详情
export function complainAndAdvisoryDetailIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCOMPCONSULT002`, param);
}

// 我要投诉咨询详情-服务商
export function complainAndAdvisoryDisDetailIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION002`, param);
}
// 我要投诉咨询详情-服务商
export function complainAndAdvisoryDisSave(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION003`, param);
}

// 我要投诉咨询删除
export function complainAndAdvisoryDeleteIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCOMPCONSULT005`, param);
}

// 我要投诉咨询评价
export function complainAndAdvisoryEvaluateIF(param) {
  return axios.post(`/access/ui/GTC-MGR/GTCPSPCOMPCONSULT006`, param);
}

// 我要投诉咨询附件查询
export function complainFileDownloadIF(param) {
  return axios.post(
    `/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION005`,
    param
  );
}

// 我要投诉咨询结果附件查询
export function complainResultFileDownloadIF(param) {
  return axios.post(
    `/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION004`,
    param
  );
}

// 企业用户信息查询
export function complainEnterpriseIF(param) {
  return axios.post(`/access/GTC-MGR/GTCPSPOGREGISTRATIIN025`, param)
}

// 我要投诉咨询附件删除
export function complainFileDeleteIF(param) {
  return axios.post(
    `/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION007`,
    param
  );
}

// 我要投诉咨询结果附件删除
export function complainResultFileDeleteIF(param) {
  return axios.post(
    `/access/ui/GTC-MGR/GTCPLATGTCPSPCONSULTATION006`,
    param
  );
}
