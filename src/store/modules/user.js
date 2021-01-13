import us from '@/service/user';
import VueCookies from 'vue-cookies';
import router from '@/router/index.js';
const { getLoginRoleType } = require('@/public-method/roleTypeMap.js');

function resetStatus(commit) {
  // 清缓存
  let win = window;
  win.localStorage.removeItem('isLogin');
  win.localStorage.removeItem('loginName');
  win.localStorage.removeItem('RSESSIONIDCOOKIE')
  win.sessionStorage.removeItem('menuList');
  win.sessionStorage.removeItem('routerArr');
  win.sessionStorage.removeItem('cookieID');
  win.localStorage.removeItem('menuList');
  win.localStorage.removeItem('routerArr');
  win.localStorage.removeItem('roleType');
  win.localStorage.removeItem('roleResult');

  // 重置状态
  commit('setLoginState', false);
  commit('setMenuList', []);
  router.resolveHooks = [];
}

//登录设置cookie和数据状态
function loginSetData(commit, loginData) {
  let { status } = loginData.data;
  if (status == 'success') {
    if (
      loginData &&
      loginData.data &&
      loginData.data.data &&
      loginData.data.data.sessionValue
    ) {
      let sessionValue = loginData.data.data.sessionValue;
      let loginName = loginData.data.data.loginName;

      if (sessionValue != 'undefined') {
        window.localStorage.RSESSIONIDCOOKIE = sessionValue
        commit('setLoginState', true);
        window.localStorage.loginName = loginName;
        window.sessionStorage.lastSession = sessionValue;
        window.localStorage.userInfo = JSON.stringify(loginData.data.data);
        commit('setLoginName', loginName);
      }
    } else {
      return false;
    }
    return true;
  } else {
    throw new Error(loginData.data.message || '抱歉请稍后再试');
  }
}

export default {
  state: {
    isLogin: window.localStorage.RSESSIONIDCOOKIE ? true : false,
    loginName: window.localStorage.loginName
      ? window.localStorage.loginName
      : '',
    isFirstLogin: false
  },
  mutations: {
    setFirstLogin(state, value) {
      state.isFirstLogin = value;
      // this.$store.commit('setFirstLogin',true);
    },
    setLoginName(state, b) {
      state.loginName = b;
    },
    setLoginState(state, b) {
      state.isLogin = b;
    }
  },
  actions: {
    loginByType({ commit }, role) {
      return us.switchRoleType({ roletype: role.code }).then(loginData => {
        resetStatus(commit);
        let data = loginData.data;
        if (data.status == 'success') {
          let result = data.data;
          if (result.roletype || result.usertype) {
            if (!result.roletype && result.usertype) {
              result.roletype = '';
            }
            let roleResult = getLoginRoleType(
              result.roletype.split(',')[0] || '',
              result.roletypes || '',
              result.usertype || ''
            );
            commit('setRoleType', roleResult.roleType);
            commit('setRoleResult', roleResult);
          } else {
            window.app.$router.push('/noRight');
          }
          return loginSetData(commit, loginData);
        }
      });
    },
    login({ commit }, user) {
      // 登录请求
      return us.login(user).then(loginData => {
        return loginSetData(commit, loginData);
      });
    },
    logout({ commit }) {
      //退出登录
      us.logout().then(res => {
        resetStatus(commit);
      });
    }
  }
};
