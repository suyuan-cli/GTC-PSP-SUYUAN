import axios from './axios';
import queryUtil from './identification';
import queryUtil2 from './common';

function parseData(data, resolve, reject) {
  if (data.data.status === 'success') {
    data.data.data = JSON.parse(data.data.data);
    resolve(data.data);
  } else {
    reject(data.data);
  }
}

export function getCargoInfoList(param) {
  // window.app.showLoading();
  return new Promise((resolve, reject) => {
    queryUtil
      .getCargoInfo(param)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        // window.app.hideLoading();
      });
  });
}

/*公证书列表分页查询*/
export function getNotarialList(params) {
  if (params.predate) {
    params.predatefrom = params.predate[0];
    params.predateto = params.predate[1];
  }
  delete params.predate;
  if (params.issuedate) {
    params.issuedate_fm = params.issuedate[0];
    params.issuedate_to = params.issuedate[1];
  }
  delete params.issuedate;
  params.orderParam = {
    orders: [
      {
        column: 'issuedate',
        direction: 'desc'
      }
    ]
  };
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCMGRNOTARIZATION010`, params)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}
/*公证信息详情查询*/
export function getNotarialDetail(param) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCMGRNOTARIZATION011`, param)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}

export function disable(notaryicode) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCMGRNOTARIZATION012`, { notaryicode })
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}

export function cancelLink(notaryicode) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCMGRNOTARIZATION013`, { notaryicode })
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}
