"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pathToRegexp = require("path-to-regexp");

var _menu2 = _interopRequireDefault(require("@/service/menu"));

var _filterMenu = require("@/public-method/filterMenu.js");

var _index = _interopRequireDefault(require("@/router/index.js"));

var _index2 = require("@/config/index.js");

var _pConfig = _interopRequireDefault(require("@/p.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getRealPath(menu) {
  var isNum = Number.parseInt(menu.index) == menu.index;
  var path = '/';

  if (isNum) {
    var sindex = menu.subs[0].index;

    if (menu.subs && Number.parseInt(sindex) != sindex) {
      path = '/' + sindex;
    } else {
      path = getRealPath(menu.subs[0]);
    }
  } else {
    path = '/' + menu.index;
  }

  return path;
}

function beforeResolve(routerListResult) {
  var routerFilter = routerListResult.map(function (item) {
    return item.path;
  });
  _index["default"].resolveHooks = [];

  _index["default"].beforeResolve(function (to, from, next) {
    if (to.path == '/noRight' || to.path == '/loginOther') {
      next();
      return;
    }

    if (to.path == '/') {
      var _menu = window.app.$store.state.menu.menuList[0];

      if (!_menu) {
        next('/404');
        return;
      }

      var path = getRealPath(_menu);
      window.app.$router.push(path);
      return;
    }

    var isHas = isHasPath(routerFilter, to.path);

    if (!isHas && to.path != '/404' && to.path != '/newLogin') {
      next('/404');
    } else {
      next();
    }
  });
}

function isHasPath(routerArr, path) {
  var isHas = false;
  routerArr.forEach(function (element) {
    if ((0, _pathToRegexp.pathToRegexp)(element).exec(path)) {
      isHas = true;
      return;
    }
  });
  return isHas;
}

var _default = {
  namespace: 'menu',
  state: {
    menuList: window.sessionStorage.menuList ? JSON.parse(window.sessionStorage.menuList) : []
  },
  mutations: {
    setMenuList: function setMenuList(state, list) {
      state.menuList = list;
    }
  },
  actions: {
    permission: function permission(_ref) {
      var commit, routerListFilter, menuListFilter, backendMenu, menuListResult, routerListResult;
      return regeneratorRuntime.async(function permission$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;

              if (!(_pConfig["default"].isFilterMenu == false)) {
                _context.next = 4;
                break;
              }

              commit('setMenuList', _index2.menuList);
              return _context.abrupt("return");

            case 4:
              if (!window.sessionStorage.menuList) {
                _context.next = 7;
                break;
              }

              if (!window.initRouterEvent) {
                beforeResolve(JSON.parse(window.sessionStorage.routerArr));
                window.initRouterEvent = true;
              }

              return _context.abrupt("return");

            case 7:
              routerListFilter = _index2.routerList;
              menuListFilter = (0, _index2.setKey)(_index2.menuList, routerListFilter); //加载菜单

              _context.next = 11;
              return regeneratorRuntime.awrap(_menu2["default"].loadMenu());

            case 11:
              backendMenu = _context.sent;
              //key==-1 菜单不过滤
              backendMenu.push({
                cmdid: -1
              });
              menuListResult = (0, _filterMenu.filterMenu)(JSON.parse(JSON.stringify(menuListFilter)), backendMenu, 'cmdid');
              commit('setMenuList', menuListResult); //动态添加路由

              routerListResult = (0, _filterMenu.filterRouter)({
                allMenus: routerListFilter || [],
                assetMenus: backendMenu,
                localEqField: 'path',
                urlEqField: 'cmdid',
                childField: 'children',
                compareFn: function compareFn(localItem, urlItem, localEqField, urlEqField) {
                  if (localItem.key == -1) {
                    return true;
                  }

                  return urlItem[urlEqField] == localItem[localEqField].substring(1);
                }
              });

              if (!window.sessionStorage.menuList) {
                window.sessionStorage.menuList = JSON.stringify(menuListResult);
                window.sessionStorage.routerArr = JSON.stringify(routerListResult);
              }

              try {
                beforeResolve(routerListResult);
              } catch (e) {}

            case 18:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;