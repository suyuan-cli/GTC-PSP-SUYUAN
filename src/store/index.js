import Vue from 'vue';
import Vuex from 'vuex';
import dailog from './modules/dailog';
import user from './modules/user';
import menu from './modules/menu';
import common from '@/service/common';
import { Message } from 'element-ui';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //登录的角色类
    roleType: window.localStorage.roleType || '',
    roleResult: JSON.parse(window.sessionStorage.roleResult || '{}'),
    lang: window.localStorage.lang || 'zh',
    showload: false
  },
  mutations: {
    setLang: (state, lang) => {
      state.lang = lang;
      window.app.$i18n.locale = lang;
      window.localStorage.lang = lang;
    },
    showLoading(state) {
      state.showload = true;
    },
    hideLoading(state) {
      state.showload = false;
    },
    setRoleType(state, value) {
      window.localStorage.roleType = value;
      state.roleType = value;
    },
    setRoleResult(state, value) {
      window.sessionStorage.roleResult = JSON.stringify(value);
      state.roleResult = value;
    },
    setEncryptkey(state, value) {
      window.localStorage.encryptkey = value;
      state.encryptkey = value;
    }
  },
  actions: {
    getEncryptkey({ commit }) {
      common.getEncryptKey({ workspc: '' }).then(response => {
        try {
          if (response.data.status === 'success') {
            let temp = JSON.parse(response.data.data);
          if(!temp||!temp.publickey){
              throw '获取公钥异常！'
          }
            commit('setEncryptkey', temp.publickey);
          } else {
            Message.error('获取公钥异常！');
            return;
          }           
        } catch (error) {
          console.log(error)
          Message({
            type:'error',
            message:'获取公钥异常！'
          })
        }
      });
    }
  },
  modules: {
    dailog,
    user,
    menu
  }
});
export default store;
