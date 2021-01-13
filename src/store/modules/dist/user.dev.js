"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("@/service/user"));

var _vueCookies = _interopRequireDefault(require("vue-cookies"));

var _index = _interopRequireDefault(require("@/router/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('@/public-method/roleTypeMap.js'),
    getLoginRoleType = _require.getLoginRoleType;

function resetStatus(commit) {
  // 清缓存
  var win = window;
  win.localStorage.removeItem('isLogin');
  win.localStorage.removeItem('loginName');
  win.localStorage.removeItem('RSESSIONIDCOOKIE');
  win.sessionStorage.removeItem('menuList');
  win.sessionStorage.removeItem('routerArr');
  win.sessionStorage.removeItem('cookieID');
  win.localStorage.removeItem('menuList');
  win.localStorage.removeItem('routerArr');
  win.localStorage.removeItem('roleType');
  win.localStorage.removeItem('roleResult'); // 重置状态

  commit('setLoginState', false);
  commit('setMenuList', []);
  _index["default"].resolveHooks = [];
} //登录设置cookie和数据状态


function loginSetData(commit, loginData) {
  var status = loginData.data.status;

  if (status == 'success') {
    if (loginData && loginData.data && loginData.data.data && loginData.data.data.sessionValue) {
      var sessionValue = loginData.data.data.sessionValue;
      var loginName = loginData.data.data.loginName;

      if (sessionValue != 'undefined') {
        window.localStorage.RSESSIONIDCOOKIE = sessionValue;
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

var _default = {
  state: {
    isLogin: window.localStorage.RSESSIONIDCOOKIE ? true : false,
    loginName: window.localStorage.loginName ? window.localStorage.loginName : '',
    isFirstLogin: false
  },
  mutations: {
    setFirstLogin: function setFirstLogin(state, value) {
      state.isFirstLogin = value; // this.$store.commit('setFirstLogin',true);
    },
    setLoginName: function setLoginName(state, b) {
      state.loginName = b;
    },
    setLoginState: function setLoginState(state, b) {
      state.isLogin = b;
    }
  },
  actions: {
    loginByType: function loginByType(_ref, role) {
      var commit = _ref.commit;
      return _user["default"].switchRoleType({
        roletype: role.code
      }).then(function (loginData) {
        resetStatus(commit);
        var data = loginData.data;

        if (data.status == 'success') {
          var result = data.data;

          if (result.roletype || result.usertype) {
            if (!result.roletype && result.usertype) {
              result.roletype = '';
            }

            var roleResult = getLoginRoleType(result.roletype.split(',')[0] || '', result.roletypes || '', result.usertype || '');
            commit('setRoleType', roleResult.roleType);
            commit('setRoleResult', roleResult);
          } else {
            window.app.$router.push('/noRight');
          }

          return loginSetData(commit, loginData);
        }
      });
    },
    login: function login(_ref2, user) {
      var commit = _ref2.commit;
      // 登录请求
      return _user["default"].login(user).then(function (loginData) {
        return loginSetData(commit, loginData);
      });
    },
    logout: function logout(_ref3) {
      var commit = _ref3.commit;

      //退出登录
      _user["default"].logout().then(function (res) {
        resetStatus(commit);
      });
    }
  }
};
exports["default"] = _default;