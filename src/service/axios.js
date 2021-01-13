import axios from 'axios';
const config = require('@/p.config.js');
export default {
  get(url, param = {}, headers = {}) {
    if (url.substring(0, 1) != '/') {
      url = '/' + url;
    }
    return axios.get(config.apphead + url, { param, headers });
  },
  post(url, data, headers = {}) {
    if (url.substring(0, 1) != '/') {
      url = '/' + url;
    }
    return axios.post(config.apphead + url, { ...data }, { headers });
  }
};
