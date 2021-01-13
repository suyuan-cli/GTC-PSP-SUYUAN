/*---------------通用查询-企业-----------------*/
import axios from './axios';
import queryUtil from './common';
function parseData(data, resolve, reject) {
  if (data.data.status === 'success') {
    data.data.data = JSON.parse(data.data.data);
    resolve(data.data);
  } else {
    reject(data.data);
  }
}
//分页查询
export function getList(params = {}) {
  //todo 改为 GTCPSPOGCODEDATA100 queryMode:3  ，参考溯源商品查询界面
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA100`, params)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}
//详情查询
export function getTabDetail(params = {}) {
  //GTCPSPOGCODEDATA131,
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA101`, params)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}

function getBaseInfoColumns() {}

//查询条件枚举
export function getQueryTypeList() {
  return new Promise((resolve, reject) => {
    queryUtil
      .getDictionaryList({
        dictDefId: 'GTC-MGRTPO.queryconditiontype'
      })
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}

export function getCategInfo(categid = null) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA140`, { categid })
      .then(data => {
        data = JSON.parse(data.data.data);
        if (categid !== null) {
          data.forEach(item => {
            item.label = item.title;
            item.prop = item.name;
          });
        }
        resolve(data);
      })
      .catch(response => {
        reject(response);
      });
  });
}

export function getTabData(url, params) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/` + url, params)
      .then(data => {
        data = JSON.parse(data.data.data);
        let { datas = [] } = data;
        resolve(datas);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}

/*---------------通用查询-消费者-----------------*/
//分页查询
export function getConsumerList(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA130`, params)
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
//详情查询
export function getConsumerTabDetail(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA131`, params)
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

export function getIp() {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/FRONTCOMMWEBUTIL010`, {})
      .then(data => {
        resolve(data.data.data);
      })
      .catch(response => {
        reject(response);
      });
  });
}

/*----------------------*/
//详情查询
export function getQueryHistory(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPHISTORYQUERY010`, params)
      .then(data => {
        if (data.data.status === 'success') {
          let { datas = [] } = JSON.parse(data.data.data);
          resolve(datas);
        } else {
          reject(data.data);
        }
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}
