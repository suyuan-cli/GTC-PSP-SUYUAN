import axios from './axios';

function parseData(data, resolve, reject) {
  if (data.data.status === 'success') {
    data.data.data = JSON.parse(data.data.data);
    resolve(data.data);
  } else {
    reject(data.data);
  }
}
export const ogSignIssue = {
  getPageList(params) {
    if (params.senddate) {
      params.senddatefm = params.senddate[0];
      params.senddateto = params.senddate[1];
    }
    delete params.senddate;
    window.app.showLoading();
    return new Promise((resolve, reject) => {
      axios
        .post(`/access/ui/GTC-MGR/GTCMGROGCODE010`, params)
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
};

export const ogSignAbnormal = {
  getPageList(params) {
    if (params.disabledate) {
      params.disabledatefm = params.disabledate[0];
      params.disabledateto = params.disabledate[1];
    }
    delete params.disabledate;
    window.app.showLoading();
    return new Promise((resolve, reject) => {
      axios
        .post(`/access/ui/GTC-MGR/GTCMGROGCODE030`, params)
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
  },
  getDetailData(code) {
    window.app.showLoading();
    return new Promise((resolve, reject) => {
      axios
        .post(`/access/ui/GTC-MGR/GTCMGROGCODE040`, {
          ogcodeexchandicode: code
        })
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
  },
  addNew(params) {
    window.app.showLoading();
    return new Promise((resolve, reject) => {
      axios
        .post(`/access/ui/GTC-MGR/GTCMGROGCODE050`, params)
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
};

export const ogSignQuery = {
  query(ogcode) {
    window.app.showLoading();
    return new Promise((resolve, reject) => {
      axios
        .post(`/access/ui/GTC-MGR/GTCMGROGCODE020`, { ogcode })
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
};
