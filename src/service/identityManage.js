import axios from './axios';

const config = require('../p.config');

function parseData(data, resolve, reject) {
  if (data.data.status === 'success') {
    data.data.data = JSON.parse(data.data.data);
    resolve(data.data);
  } else {
    reject(data.data);
  }
}
/*---------------------------标识委托-------------------*/
export function getIdentityEntrustList(params = {}) {
  if (params.predate) {
    params.predatefm = params.predate[0];
    params.predateto = params.predate[1];
  }
  delete params.predate;
  params.orderParam = {
    orders: [{ column: 'predate', direction: 'desc' }]
  };
  let { pageParam, predatefm, predateto, orderParam } = params;
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST010`, {
        pageParam,
        predatefm,
        predateto,
        orderParam
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
}

export function saveIdentityEntrust(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST012`, params)
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

export function getAttachList(code) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST014`, {
        innercode: code
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
}

export function getMoreSetting(params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST016`, params)
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}

export function getIdentityEntrustDetail(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST011`, params)
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

export function getGoodsByOrder(order, predate) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA119`, {
        orderParam: {
          orders: [
            {
              column: 'predate',
              direction: 'desc'
            }
          ]
        },
        predatefm: predate[0],
        predateto: predate[1],
        queryMode: 3,
        queryConditions: [
          {
            fldname: 'djordercode',
            fldvalue: order
          }
        ]
      })
      .then(data => {
        resolve({
          data: {
            cargoname: '名字1,,名字2,名字3',
            cargosrcicode: '111,,222,333',
            djecplatname: '平台1,,平台2,平台3',
            djordercode: '订单号1,,订单号2,订单号3'
          }
        });
        // parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}

export function getGoodsByName(name, predate, pageNo = 1) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA100`, {
        orderParam: {
          orders: [
            {
              column: 'predate',
              direction: 'desc'
            }
          ]
        },
        pageParam: {
          pageNo,
          rowsPerPage: 10
        },
        predatefm: predate[0],
        predateto: predate[1],
        queryMode: 3,
        queryConditions: [
          {
            fldname: 'cargoname',
            fldvalue: name
          }
        ]
      })
      .then(data => {
        if (data.data.data) {
          resolve(JSON.parse(data.data.data));
        } else {
          resolve({
            datas: [],
            pageNo: 1,
            pageSumCount: 0,
            rowsPerPage: 10,
            totalRows: 0
          });
        }
      })
      .catch(response => {
        reject(response);
      });
  });
}

export function getGoodsForDetail(icode, codes = []) {
  let params = {
    ogcodeentrusticode: icode,
    queryConditions: codes.split(',').map(item => {
      return {
        fldname: 'cargosrcicode',
        fldvalue: item
      };
    })
  };
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA141`, params)
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

export function getRecommendedGoods(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST013`, params)
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

export function exportIdentity(ogcodebatchno) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEENTRUST017`, { ogcodebatchno })
      .then(data => {
        resolve(data.data);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}
/*-----------------------赋码查询------------------------*/
export function getAssignCodeQueryList(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE126`, params)
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

/*-----------------------自有标识------------------------*/
export function getOwnIdentityList(params = {}) {
  if (params.predate) {
    params.predatefm = params.predate[0];
    params.predateto = params.predate[1];
  }
  delete params.predate;
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE122`, params)
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

export function saveOwnIdentity(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE120`, params)
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

export function getOwnIdentityDetail(params = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE123`, params)
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

export function exportOwnIdentityDetail(code) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE124`, {
        ogcodeapplyicodes: code
      })
      .then(data => {
        window.app.download(config.base_image_url + data.data.data);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}
/*模板下载*/
export function downloadOwnIdentityTemplate(code) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/FRONT-COMM/FRONTCOMMIMPORT020`, {
        xlscode: code
      })
      .then(data => {
        console.log(data);
        window.app.download(config.base_image_url + data.data.data);
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}

/*-----------------------我的标识库------------------------*/
export function getIdentityList(params = {}, showLoading = true) {
  if (params.senddate) {
    params.senddatefm = params.senddate[0];
    params.senddateto = params.senddate[1];
  }
  delete params.senddate;
  showLoading && window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTC-MGR/GTCMGROGCODE060`, params)
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

export function exportUnuseIdentity(code) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE103`, {
        ogcodeapplyicode: code
      })
      .then(data => {
        console.log(data);
        if (data.data.expfilepath) {
          window.app.download(config.base_image_url + data.data.expfilepath);
        } else {
          window.app.$message.warning(data.data.message);
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
