import Router from 'vue-router';
import router from '@/router/index.js';
import { routerList } from '@/config/index.js';
import { commonRouterList } from '@/config/common-router.js';

let noRight = {
  path: '/noRight',
  component: resolve => require(['../components/page/noRight.vue'], resolve),
  meta: { title: '没有权限', auth: true }
};

router.$addRoutes = params => {
  let newRouter = new Router({ routes: params });
  router.matcher = newRouter.matcher;
  // newRouter.parent = {};
  // newRouter.parent.$route = router;
  // router.addRoutes(params);
};
//动态添加路由
function addRouter() {
  let children = router.options.routes[0].children;
  children.length = 0;
  let hasNew = false;
  if (children) {
    if (children.length == 0) {
      children.push(noRight);
      commonRouterList.forEach(item => {
        children.push(item);
      });
    }
    routerList[window.localStorage.roleType].forEach(item => {
      let isInChildren = children.find(child => {
        if (child.path == item.path) {
          return true;
        }
      });
      if (!isInChildren) {
        hasNew = true;
        children.push(item);
      }
    });
    if (hasNew) {
      router.$addRoutes(router.options.routes);
    }
  }
}
function resetRouter() {
  router.options.routes[0].children = [];
  router.$addRoutes(router.options.routes);
}
export { addRouter, resetRouter };
