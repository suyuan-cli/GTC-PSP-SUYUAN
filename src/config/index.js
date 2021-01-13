/**
 * 配置菜单路由的方法：
 *
 *1.在routerList中配置，path和对应的组件，meta参数中的auth代表是否需要登录，字段key代表唯一标识，
 *如果key值在后端返回的keys数值里面，代表有权限可以显示
 *2.配置对应的菜单结构，菜单中的index对应路由的path字段（前面的/要去掉）
 *3. 路由中 key：-1 代表不过滤权限，开发中可以先写-1，开发完成后要告知后端同事菜单名字和path ，key不取值或者-1以外的值
 *
 *
 * */

const routerList = [
  {
    path: '/fristPage',
    component: resolve => require(['../components/page/todo.vue'], resolve),
    meta: { title: '首页', auth: true },
    key: -1
  },

];

//父级菜单没有连接的话，给index赋值为一个少于100的数字
const menuList = [
  {
    icon: 'iconfont iconad1',
    index: 'fristPage',
    title: '可视化中心'
  }
];

//复制key值到对应的菜单中，准备权限过滤菜单
function setKey(mens, routerListTemp) {
  mens.forEach(mitem => {
    let fitem = routerListTemp.find(ritem => {
      if (ritem.path.substring(1) == mitem.index) {
        return true;
      }
    });
    if (fitem) {
      if (fitem.key == -1) {
        mitem.key = fitem.key;
      } else {
        mitem.key = fitem.path.substring(1);
      }
      if (mitem.subs && mitem.subs.length > 0) {
        setKey(mitem.subs, routerListTemp);
      }
    } else if (mitem.index <= 100 && mitem.subs) {
      //key==-1 标识父级目录，不经过权限过滤
      mitem.key = -1;
      setKey(mitem.subs, routerListTemp);
    }
  });
  return mens;
}
//setKey(menuList);

export { menuList, routerList, setKey };
