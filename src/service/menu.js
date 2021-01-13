import axios from './axios';

export default {
  getMenu() {
    return new Promise((resolve, reject) => {
      if (window.sessionStorage.backendList) {
        resolve(JSON.parse(window.sessionStorage.backendList));
        return;
      }

      const { code, data } = { code: 1, data: [{ key: 1 }, { key: 2 }] };
      if (code) {
        window.sessionStorage.backendList = JSON.stringify(data);
        resolve(data);
      } else {
        resolve([]);
      }
    });
  },
  loadMenu() {
    return new Promise((resolve, reject) => {
      axios.post('/access/GTCPSP-FRONT/GTCPSPUSER080', {}).then(result => {
        if (result.data) {
          let tdata = JSON.parse(result.data.data || '[]');
          resolve(tdata.menuList || []);
        } else {
          reject([]);
        }
      });
    });
  }
};
