"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  showUser: false
};
var getters = {
  isShow: function isShow(state) {
    return state.showUser;
  }
};
var mutations = {
  hide: function hide(state) {
    state.showUser = false;
  },
  show: function show(state) {
    state.showUser = true;
  }
};
var actions = {
  showDailog: function showDailog(_ref) {
    var commit = _ref.commit;
    commit('show');
  },
  hideDailog: function hideDailog(_ref2) {
    var commit = _ref2.commit;
    commit('hide');
  }
};
var _default = {
  namespaced: true,
  getters: getters,
  mutations: mutations,
  actions: actions,
  state: state
};
exports["default"] = _default;