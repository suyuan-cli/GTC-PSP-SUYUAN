import { pathToRegexp } from 'path-to-regexp';
import menu from '@/service/menu';

import { filterMenu, filterRouter } from '@/public-method/filterMenu.js';
import router from '@/router/index.js';
import { menuList, routerList, setKey } from '@/config/index.js';
import config from '@/p.config.js';
function getRealPath(menu) {
  let isNum = Number.parseInt(menu.index) == menu.index;
  let path = '/';
  if (isNum) {
    let sindex = menu.subs[0].index;
    if (menu.subs && Number.parseInt(sindex) != sindex) {
      path = '/' + sindex;
    } else {
      path = getRealPath(menu.subs[0])
    }
  } else {
    path = '/' + menu.index;
  }
  return path
}
function beforeResolve(routerListResult) {
  let routerFilter = routerListResult.map(item => {
    return item.path;
  });
  router.resolveHooks = [];
  router.beforeResolve((to, from, next) => {
    if (to.path == '/noRight' || to.path == '/loginOther') {
      next();
      return;
    }
    if (to.path == '/') {
      let menu = window.app.$store.state.menu.menuList[0];
      if (!menu) {
        next('/404');
        return;
      }
      let path = getRealPath(menu)
      window.app.$router.push(path);
      return;
    }
    let isHas = isHasPath(routerFilter, to.path);
    if (!isHas && to.path != '/404' && to.path != '/newLogin') {
      next('/404');
    } else {
      next();
    }
  });
}
function isHasPath(routerArr, path) {
  let isHas = false;
  routerArr.forEach(element => {
    if (pathToRegexp(element).exec(path)) {
      isHas = true;
      return;
    }
  });
  return isHas;
}
export default {
  namespace: 'menu',
  state: {
    menuList: window.sessionStorage.menuList
      ? JSON.parse(window.sessionStorage.menuList)
      : []
  },
  mutations: {
    setMenuList(state, list) {
      state.menuList = list;
    }
  },
  actions: {
    permission: async ({ commit }) => {
      if (config.isFilterMenu == false) {
        commit('setMenuList', menuList);
        return;
      }

      //刷新页面进来的
      if (window.sessionStorage.menuList) {
        if (!window.initRouterEvent) {
          beforeResolve(JSON.parse(window.sessionStorage.routerArr));
          window.initRouterEvent = true;
        }
        return;
      }
      let routerListFilter = routerList;

      let menuListFilter = setKey(menuList, routerListFilter);

      //加载菜单
      let backendMenu = await menu.loadMenu();
      //key==-1 菜单不过滤
      backendMenu.push({ cmdid: -1 });
      let menuListResult = filterMenu(
        JSON.parse(JSON.stringify(menuListFilter)),
        backendMenu,
        'cmdid'
      );

      commit('setMenuList', menuListResult);

      //动态添加路由
      let routerListResult = filterRouter({
        allMenus: routerListFilter || [],
        assetMenus: backendMenu,
        localEqField: 'path',
        urlEqField: 'cmdid',
        childField: 'children',
        compareFn: (localItem, urlItem, localEqField, urlEqField) => {
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
      } catch (e) { }
    }
  }
};
