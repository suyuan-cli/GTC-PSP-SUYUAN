import bus from '../components/common/bus'
export const routeChangeEvent = new CustomEvent('route-change');
export default {
  init: cb => {
    bus.$on(
      'route-change',
      e => {
        /*使路由跳转的时序在点击事件之后*/
        setTimeout(() => {
          cb({ isinpage: true });
        }, 0);
      },
      false
    );
  }
};
