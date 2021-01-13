import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/theme-blue/index.css'; // 浅绿色主题
import './assets/iconfont/iconfont.css'; // iconfont
import './assets/iconfont/iconfont.js'; // iconfont.js
import './assets/css/icon.css';
import './assets/css/main.css';

import './components/common/directives';
import 'babel-polyfill';
import store from './store';
import Contextmenu from 'vue-contextmenujs';
import interceptor from './interceptor';
import i18n from './vueI18n6/index.js';
import publicMethod from './public-method/index.js';

import config from '@/p.config.js';
import VueCookies from 'vue-cookies';
import { initPerformanceMonitor } from './performanceMonitor';
import { routeChangeEvent } from './performanceMonitor/routeChange';
import { errorHandler } from './performanceMonitor/errorCatch';
import bus from './components/common/bus';
initPerformanceMonitor();
Vue.use(VueCookies);
Vue.use(Contextmenu);

Vue.use(publicMethod);

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: 'small'
});

Vue.prototype.$axios = axios;

Vue.config.errorHandler = errorHandler;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  //需要登录授权
  if (to.meta.auth) {
    //如果配置了需要登录授权，则需要验证
    //let isLogin = window.localStorage.RSESSIONIDCOOKIE;
    let isLogin = true; //测试

    if (isLogin) {
      //但是前端本来就没有绝对安全的策略，只能通过后端减少token的生效时间来预防
      //初始化菜单
      if (store.state.menu.menuList.length == 0) {
        store
          .dispatch('permission')
          .then(() => {
            next();
          })
          .catch(e => { });
      } else {
        next();
      }
    } else {
      if (config.isFilterMenu == false) {
        store
          .dispatch('permission')
          .then(() => {
            next();
          })
          .catch(e => { });
        return;
      } else {
        next({
          path: '/newLogin',
          query: { redirect: to.path }
        });
      }
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  bus.$emit('route-change');
});
(async function () {
  window.app = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
  interceptor(window.app);
})();
