import { filterMenu } from './filterMenu.js';
import bus from '@/components/common/bus.js';
import moment from 'moment';
export default {
  install(Vue, options = {}) {
    //显示loading
    Vue.prototype.showLoading = function () {
      this.$store.commit('showLoading');
    };
    //隐藏loading
    Vue.prototype.hideLoading = function () {
      this.$store.commit('hideLoading');
    };
    //全局通用变量
    Vue.prototype.comconfig = {
      tableAlign: 'center', //表格的对齐方式
      rowstyle: {
        textAlign: 'center'
      },
      headerstyle: {
        textAlign: 'center'
      },
      //弹窗点击蒙层关闭
      closeOnClickModal: false
    };

    //关闭当前页面 fn:回调函数，不配置默认关闭当前页面跳转到上一页面，配置的话会执行回调函数
    /**
     * demo: this.closeCurrentPage(() => {
             //跳到你想跳的页面
        });
     */
    Vue.prototype.closeCurrentPage = function (fn) {
      bus.$emit('close_current_tags', fn);
    };

    Vue.prototype.getDownLoadFileName = function (url) {
      let arrUrl = url.split('/');
      let strPage = arrUrl[arrUrl.length - 1];
      strPage = strPage.split('?')[0];
      if (strPage.indexOf('/#/') != -1) {
        strPage = strPage.replace('/#/', '?');
        strPage = strPage.split('?')[0];
      }
      return strPage;
    };
    // 下载的公共方法
    Vue.prototype.download = function (url) {
      /*downloadmode=1时，图片、文本等类型的文件不会进行下载，改为2就可以了*/
      url = url.replace('downloadmode=1', 'downloadmode=2');
      function downloadinner(urli) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = urli;
        document.body.appendChild(iframe);
      }
      if (navigator.userAgent.indexOf('Firefox') > 0) {
        downloadinner(url);
      } else {
        let a = document.createElement('a');
        a.href = url;
        a.download = this.getDownLoadFileName(url);
        a.target = '_blank';
        a.style.position = "absolute";
        a.style.top = "-3000px"
        a.style.left = "-3000px"
        a.style.top = "-1"
        document.body.appendChild(a)
        a.click();
        a.parentNode.removeChild(a)
      }
    };

    // 深拷贝对象
    Vue.prototype.deepCopy = function (obj, parent = null) {
      // 创建一个新对象
      if (typeof obj !== 'object') return obj;
      let result = {};
      let keys = Object.keys(obj);
      let key = null;
      let temp = null;
      let _parent = parent;
      // 该字段有父级则需要追溯该字段的父级
      while (_parent) {
        // 如果该字段引用了它的父级则为循环引用
        if (_parent.originalParent === obj) {
          // 循环引用直接返回同级的新对象
          return _parent.currentParent;
        }
        _parent = _parent.parent;
      }
      for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        temp = obj[key];
        // 如果字段的值也是一个对象
        if (temp && typeof temp === 'object') {
          // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
          result[key] = this.deepCopy(temp, {
            originalParent: obj,
            currentParent: result,
            parent: parent
          });
        } else {
          result[key] = temp;
        }
      }
      if (Array.isArray(obj)) {
        result.length = keys.length;
        result = Array.from(result);
      }
      return result;
    };
    //时间戳转化格式
    //value是型如1572512489920的值
    Vue.prototype.formatDate = function (
      value,
      formatStr = 'YYYY-MM-DD HH:mm:ss'
    ) {
      return moment(Number.parseInt(value)).format(formatStr);
    };
    /*给对象设置默认值*/
    Vue.prototype.setDefValue = function (to, from, deep = false) {
      Object.keys(from).forEach(key => {
        if (!to.hasOwnProperty(key)) {
          if (
            Object.prototype.toString.call(from[key]) === '[object Object]' &&
            deep
          ) {
            this.setDefValue(to[key], from[key], deep);
          } else {
            to[key] = from[key];
          }
        }
      });
    };

    /*该方法可以将内部组件的方法绑定到当前组件中，以实现方法的传递。elementUI组件二次封装时有用*/
    Vue.prototype.bindMethods = function (ref) {
      let refObj = this.$refs[ref];
      for (let key in refObj) {
        if (!(key in this) && typeof refObj[key] === 'function') {
          this[key] = refObj[key].bind(refObj);
        }
      }
    };
    //控制首页滚动条
    Vue.prototype.rootScrollTo = function (to) {
      this.$nextTick(() => {
        this.$root.rootScroll.wrap.scrollTop = to;
      });
    };
    //判断对象多层属性是否存在，用法this.isExistence(vm,"name1.name2.name3")
    Vue.prototype.isExistence = function (vm, str) {
      let items = str.split('.');
      let returnValue = false;
      for (let i = 0, l = items.length; i < l; i++) {
        let item = vm[items[i]];
        if (vm[items[i]]) {
          items.shift();
          if (items.length == 0) {
            returnValue = item;
          } else {
            returnValue = this.isExistence(item, items.join('.'));
          }
          break;
        } else {
          returnValue = false;
          break;
        }
      }
      return returnValue;
    };
    //输入当前路由，等到面包屑
    Vue.prototype.getFullNav = function (currentPath, menuList, current) {
      let navs = [];
      menuList.forEach(item => {
        if (item.index == currentPath) {
          navs.push({ to: currentPath, name: item.title });
          return navs;
        } else {
          if (item.subs) {
            let navsR = this.getFullNav(currentPath, item.subs, current);
            if (navsR.length > 0) {
              navs.push({ to: item.index, name: item.title });
              navs = navs.concat(navsR);
              return navs;
            }
          }
        }
      });
      if (navs.length == 0 && current && current.meta && current.meta.parent) {
        let parent = current.meta.parent.replace('/', '');
        let pnavs = this.getFullNav(parent, menuList, {});
        if (pnavs.length > 0) {
          navs = pnavs.concat({ to: currentPath, name: current.meta.title });
        }
      }
      return navs;
    };

    //重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值得属性
    // Vue.prototype.$reset = function(formRef, ...excludeFields) {
    //   this.$refs[formRef].resetFields();
    //   let obj1 = this.$data;
    //   let obj2 = this.$options.data.call(this);
    //   if (!excludeFields || excludeFields.length === 0) {
    //     excludeFields = ['ruleValidate'];
    //   }
    //   for (let attrName in obj1) {
    //     if (excludeFields && excludeFields.includes(attrName)) {
    //       continue;
    //     }
    //     obj1[attrName] = obj2[attrName];
    //   }
    // };
  }
};
