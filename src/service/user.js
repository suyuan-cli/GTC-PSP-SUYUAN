import axios from './axios';
import axiosReal from 'axios';

import VueCookies from 'vue-cookies';
const config = require('@/p.config.js');

const { getLoginRoleType } = require('@/public-method/roleTypeMap.js');
let userUrl = '/access/GTCPSP-MGR/do';
if (config.apphead == '/front') {
  userUrl = '/do';
}

export default {
  logout(params) {
    return new Promise((resole, reject) => {
      axios.get(userUrl + '/GTCPSPLOGIN020').then(() => {

        window.localStorage.removeItem('RSESSIONIDCOOKIE');
        window.sessionStorage.removeItem('menuList');
        window.sessionStorage.removeItem('routerArr');
      });
      resole('退出成功');
    });
  },
  //获取用户登录信息
  getUserMessage() {
    return axios.get(userUrl + '/GTCPSPLOGIN040');
  },
  //切换用户角色
  switchRoleType(role) {
    return axios.post(userUrl + '/GTCPSPLOGIN050', role);
  },

  login(user) {
    return new Promise((resolve, reject) => {
      axiosReal({
        method: 'post',
        url: config.apphead + "/access/ui/GTCPSP-FRONT/do" + '/GTCPSPLOGIN012',
        data: user,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let result = res.data.data;
        if (!result) {
          reject(res.data)
          return

        }
        if (result.roletype || result.usertype) {
          if (!result.roletype && result.usertype) {
            result.roletype = '';
          }
          let roleResult = getLoginRoleType(
            result.roletype.split(',')[0] || '',
            result.roletypes || '',
            result.usertype || ''
          );

          let commit = window.app.$store.commit;
          commit('setRoleType', roleResult.roleType);
          commit('setRoleResult', roleResult);
        } else {
          window.app.$router.push('/noRight');
        }
        resolve(res);
      });
    });
  },
  getPublicKey() {
    return axiosReal({
      method: 'get',
      url: config.apphead + '/access/FRONT-COMM/FRONTCOMMCRYPT010',
      data: {}
    });
  }
};
