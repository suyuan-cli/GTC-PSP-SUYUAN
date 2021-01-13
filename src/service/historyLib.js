import axios from './axios';

function parseData(data, resolve, reject) {
  if (data.data.status === 'success') {
    data.data.data = JSON.parse(data.data.data);
    resolve(data.data);
  } else {
    reject(data.data);
  }
}

export function getHistoryListData(param = {}) {
  if (param.reportdate) {
    param.reportdatefm = param.reportdate[0];
    param.reportdateto = param.reportdate[1];
  }
  delete param.reportdate;
  param.orderParam = {
    orders: [
      {
        column: 'reportdate',
        direction: 'desc'
      }
    ]
  };
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCPSPDECTRESULTHIS010`, param)
      .then(data => {
        window.app.hideLoading();
        parseData(data, resolve, reject);
      })
      .catch(response => {
        window.app.hideLoading();
        reject(response);
      });
  });
}

export function getHistoryDetail(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCPSPDECTRESULTHIS011`, param)
      .then(data => {
        window.app.hideLoading();
        parseData(data, resolve, reject);
      })
      .catch(response => {
        window.app.hideLoading();
        reject(response);
      });
  });
}
