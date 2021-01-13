import axios from './axios';
const { systemName } = require('../p.config');
const serviceMap = {
  perf: 'GTCMGRMONITORSERVICE001',
  resources: 'GTCMGRMONITORSERVICE002',
  errorCatch: 'GTCMGRMONITORSERVICE003',
  xhrHook: 'GTCMGRMONITORSERVICE004',
  behavior: 'GTCMGRMONITORSERVICE005',
  batchSave: 'GTCMGRMONITORSERVICE011'
};
export const noLogService = Object.values(serviceMap);
function setDefValue(params) {
  params.systemname = systemName;
  params.pageurl = window.app.$route.fullPath;
  params.usercode = JSON.parse(localStorage.userInfo).userCode;
}
function handleParams(data, isBatch = false) {
  if (isBatch) {
    Object.keys(data).forEach(key => {
      data[key].forEach(item => {
        setDefValue(item);
      });
    });
  } else if (Array.isArray(data)) {
    data.forEach(item => {
      setDefValue(item);
    });
  } else {
    setDefValue(data);
  }
}
export async function monitorMsgBatchSave(params) {
  handleParams(params, true);
  return await axios.post(
    '/access/ui/GTCPSP-FRONT/' + serviceMap.batchSave,
    params
  );
}

export async function monitorMsgSave(name, params) {
  handleParams(params);
  return await axios.post(
    '/access/ui/GTCPSP-FRONT/' + serviceMap[name],
    params
  );
}
