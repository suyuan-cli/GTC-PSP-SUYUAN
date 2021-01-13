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

export function getDetailsData(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPCARGOMAINT101`, param)
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

/*溯源商品新增第一步添加商品数据*/
export function saveGoodsInfo(param = {}, nextReq) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPCARGOMAINT200`, param)
      .then(data => {
        parseData(data, resolve, reject);
        return nextReq;
      })
      .catch(response => {
        reject(response);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}

export function getLinkTypeList() {
  return new Promise((resolve, reject) => {
    queryUtil
      .getDictionaryList({
        dictDefId: 'DT_GTC-MGRTB.LinkInfoDataType'
      })
      .then(data => {
        parseData(data, resolve, reject);
      })
      .catch(response => {
        reject(response);
      });
  });
}

/*获取环节信息*/
export function getLinkInfoList(param) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPLINKINFO010`, param)
      .then(data => {
        data.data.data = data.data.data || '{}';
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

/*溯源商品新增第二步添加环节数据*/
export function saveLinkInfo(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPLINKINFO020`, param)
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

/*溯源商品新增第三步，添加绑码数据-调用新增接口*/
export function saveSignBinding(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE112`, param)
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

/*溯源商品列表，添加绑码数据-调用提交接口*/
export function submitSignBinding(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE113`, param)
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

/*提交*/
export function submit(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPCARGOMAINT202`, param)
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

/*新增页面取消时，选择不保存则删除*/
export function deleteRow(param = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPCARGOMAINT203`, param)
      .then(({ data }) => {
        data.data = data.status === 'success';
        resolve(data);
      })
      .catch(response => {
        reject(response);
      });
  });
}

/*附件删除*/
export function deleteImages(param = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPCARGOMAINT204`, param)
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch(response => {
        reject(response);
      });
  });
}

/*标识信息查询*/
export function getSignBindInfo(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE110`, param)
      .then(({ data }) => {
        if (data.status === 'success') {
          let obj = JSON.parse(data.data);
          if (obj.datas) {
            let ogcodebindicode = obj.datas[0].ogcodebindicode;
            axios
              .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE118`, {
                ogcodebindicode
              })
              .then(data => {
                if (data.data.status === 'success') {
                  data.data.data = JSON.parse(data.data.data);
                  data.data.data.ogcodebindicode = ogcodebindicode;
                  resolve(data.data);
                } else {
                  reject(data.data);
                }
              });
          } else {
            resolve({
              data: { ogcodeBindInfoList: [], ogcodebindicode: null }
            });
          }
        } else {
          reject(data);
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

/*标识信息详情查询*/
export function getSignBindDetailInfo(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE110`, param)
      .then(({ data }) => {
        if (data.status === 'success') {
          let obj = JSON.parse(data.data);
          let req = (obj.datas || []).map(item => {
            return new Promise((resolve1, reject1) => {
              axios
                .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODE118`, {
                  ogcodebindicode: item.ogcodebindicode
                })
                .then(data => {
                  if (data.data.status === 'success') {
                    item.data = JSON.parse(data.data.data).ogcodeBindInfoList;
                    resolve1(item);
                  } else {
                    reject1(data.data);
                  }
                });
            });
          });
          Promise.all(req)
            .then(data => {
              resolve(data);
            })
            .catch(response => {
              reject(response);
            });
        } else {
          reject(data);
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

export function getLinkInfoColumns(code) {
  window.app.showLoading();
  let codes = code.split(',');
  let req = codes.map(c => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/access/ui/GTCPSP-FRONT/GTCPSPOGCODEDATA140`, { categid: c })
        .then(({ data }) => {
          if (data.status === 'success') {
            resolve({ code: c, value: JSON.parse(data.data) });
          } else {
            reject(data);
          }
        })
        .catch(response => {
          reject(response);
        });
    });
  });
  return new Promise((resolve, reject) => {
    Promise.all(req)
      .then(data => {
        resolve(
          data.sort((a, b) => {
            return codes.findIndex(i => i === a.code) >
              codes.findIndex(i => i === b.code)
              ? 1
              : -1;
          })
        );
      })
      .catch(response => {
        window.app.$message.error(response.message);
      })
      .finally(() => {
        window.app.hideLoading();
      });
  });
}

/*列表页导出*/
export function exportList(param = {}) {
  window.app.showLoading();
  return new Promise((resolve, reject) => {
    axios
      .post(`/access/ui/GTCPSP-FRONT/GTCPSPCARGOMAINT205`, param)
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
