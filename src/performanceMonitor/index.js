import perf from './perf.js';
import resources from './resources.js';
import errorCatch from './errorCatch.js';
import xhrHook from './xhr.js';
import behavior from './behavior.js';
import routeChange from './routeChange.js';
import {
  monitorMsgBatchSave,
  monitorMsgSave,
  noLogService
} from '../service/monitors';

const monitors = [
  {
    name: 'perf',
    dataKey: 'gtcMgrPageMonitorDTOS',
    inst: perf,
    dataList: [],
    dataHandler(data) {
      return data;
    },
    passRate: 1
  },
  {
    name: 'resources',
    dataKey: 'gtcMgrStaticResourcesMonitorDTOS',
    inst: resources,
    dataList: [],
    dataHandler(data) {
      /*过滤ajax请求*/
      data = data.filter(item => item.initiatorType !== 'xmlhttprequest');
      return data.length === 0 ? null : data;
    },
    /*批量保存*/
    saveMode: 'batch',
    passRate: 1
  },
  {
    name: 'errorCatch',
    dataKey: 'gtcMgrErrorInfoMonitorDTOS',
    inst: errorCatch,
    dataList: [],
    dataHandler(data) {
      data.filecode = data.content;
      data.content = null;
      return data;
    },
    passRate: 1
  },
  {
    name: 'xhrHook',
    dataKey: 'gtcMgrApiReqMonitorDTOS',
    inst: xhrHook,
    dataList: [],
    dataHandler(data) {
      /*过滤*/
      if (
        noLogService.some(item => {
          return data.url.endsWith(item);
        })
      ) {
        return null;
      }
      let { response } = data;
      response = JSON.parse(response);
      if (response.status === 'fail') {
        data.errormsg = response.message;
      }
      return data;
    },
    passRate: 1
  },
  {
    name: 'behavior',
    dataKey: 'gtcMgrUserBehaviorMonitorDTOS',
    inst: behavior,
    dataList: [],
    dataHandler(data) {
      return data;
    },
    passRate: 1
  },
  {
    name: 'behavior',
    dataKey: 'gtcMgrUserBehaviorMonitorDTOS',
    inst: routeChange,
    dataList: [],
    dataHandler(data) {
      return data;
    },
    passRate: 1
  }
];
function isPass(passRate = 1) {
  return passRate >= 1 || Math.random() < passRate;
}

/*perf,resources,errorCatch,xhrHook,behavior*/
export function initPerformanceMonitor() {
  monitors.forEach(monitor => {
    monitor.inst.init(data => {
      /*没有登录就不做记录*/
      if (!localStorage.RSESSIONIDCOOKIE) return;
      data = monitor.dataHandler(data);
      if (data === null) return;
      console.log(monitor.name, data);
      if (monitor.saveMode === 'batch') {
        data = data.filter(item => isPass(monitor.passRate));
        let params = { [monitor.dataKey]: data };
        monitorMsgBatchSave(params).then();
      } else {
        if (isPass(monitor.passRate)) {
          monitorMsgSave(monitor.name, data).then();
        }
      }
    });
  });
}
