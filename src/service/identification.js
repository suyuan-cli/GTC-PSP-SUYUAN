import axios from './axios';
//标识模块接口
export default {
  //获取标识列表
  getIdentification(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE110', params);
  },
  //获取溯源标识台账分页信息
  getOgsignStandingBookInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE105', params);
  },
  //获取累计的溯源标识数据量
  getOgsignTotalCountInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE106', params);
  },
  //商品登记分页信息
  getCargoInfo(params) {
    return axios.post('access/GTC-MGR/GTCPSPCARGOREG010', params);
  },
  //标识申请分页信息查询
  getIdentificationApply(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE100', params);
  },
  //商品登记详情页
  getCargoDetailInfo(params) {
    return axios.post('access/GTC-MGR/GTCPSPCARGOREG011', params);
  },
  // 标识处置分页信息查询
  getIdentificationDisable(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE115', params);
  },
  // 标识停用详情信息查询
  getIdentificationStopInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE116', params);
  },
  // 溯源标识申请详情查询
  getIdentificationInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE101', params);
  },

  // 溯源商品准备分页信息查询
  getDataPrepare(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPCARGOMAINT100', params);
  },
  //商品登记保存
  saveCargoRegInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPCARGOREG012', params);
  },
  //溯源标识使用详情页
  getOgSignUsedDetailInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE111', params);
  },
  //溯源标识使用新增页
  saveOgSignUsedInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE112', params);
  },
  //商品登记提交
  submitCargoRegInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPCARGOREG016', params);
  },
  //溯源标识使用提交
  submitOgSignUsedInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE113', params);
  },
  //新增溯源标识申请信息
  createIdentificationApply(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE102', params);
  },
  // 溯源商品登记详情页图片查询接口
  getOgCargoRegDetailImgInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPCARGOREG014', params);
  },
  // Excel模板下载
  downloadExcelModel(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMIMPORT020', params);
  },
  // Excel导入
  uploadExcelData(params) {
    return axios.post('/access/ui/FRONT-COMM/FRONTCOMMIMPORT010', params);
  },
  //删除商品登记附件
  deleteCargoRegAttach(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPCARGOREG017', params);
  },
  // 查询溯源标识绑码详细信息
  queryOgBindCodeDetilInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE118', params);
  },
  // 删除溯源绑码标识信息
  deleteOgBindCodeInfo(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE119', params);
  },
  // 消费者投诉咨询列表查询
  getConsumerComplaintConsultList(params) {
    return axios.post(
      '/access/ui/GTC-MGR/GTCPSPGTSENTTRANSRUL001',
      params
    );
  },
  // 新增标识停用信息
  createIdentificationStop(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE117', params);
  },
  // 未使用标识查询
  getIdentificationUnused(params) {
    return axios.post('/access/ui/GTC-MGR/GTCPSPOGCODE104', params);
  }
};
