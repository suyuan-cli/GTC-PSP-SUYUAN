// 用于拦截请求和响应
const axios = require('axios');

export default function (vm) {
  //设置默认带上cookie
  axios.defaults.withCredentials = true;
  // 设置请求拦截器
  axios.interceptors.request.use(config => {
    // 获取token
    // const token = localStorage.getItem("token");
    // if (token) {
    //   // 如果存在令牌这添加token请求头
    //   config.headers.Authorization = "Bearer " + token;
    // }
    try {
      setNullParams(config.data);
    } catch (e) { }

    return config;
  });

  // 响应拦截器
  // 参数1表示成功响应
  // 这里只关心失败响应
  axios.interceptors.response.use(
    res => {
      if (res.data && res.data.code == 'ACS119') {
        vm.$store.dispatch('logout');
        vm.$router.push('/newLogin');
      }
      if (res.data && (res.data.status === 500 || res.data.status == 'fail')) {
        if (res.data.message) {
          // vm.$message.info(
          //   res.data.message
          // );
          console.error(
            '接口 ' + res.config.url + ' 报错：' + res.data.message
          );
        } else {
          vm.$message.error('抱歉请稍后重试');
        }
        vm.hideLoading();
        return res;
      }
      return res;
    },
    err => {
      if (!err.response) {
        return Promise.reject(err);
      }
      if (err.response.status === 500 || err.response.status == 'fail') {
        console.log(err);
        if (err.response.data.message) {
          vm.$message.error(
            ` 抱歉请稍后重试,error message: ` + err.response.data.message || ''
          );
        } else {
          vm.$message.error('抱歉请稍后重试');
        }

        vm.hideLoading();
      }

      if (err.response.status === 401) {
        //TODO和后端联调返回码
        // 没有登录或者令牌过期
        // 清空vuex和localstorage
        vm.$store.dispatch('logout');
        // 跳转login
        vm.$router.push('/newLogin');
      }
      return Promise.reject(err);
    }
  );
}

function setNullParams(data) {
  let keys = Object.keys(data);
  keys.forEach(key => {
    /*对象则往下遍历*/
    if (Object.prototype.toString.call(data[key]) === '[object Object]') {
      setNullParams(data[key]);
    } else if (data[key] === '' || data[key] === null) {
      /*空字符串则改为null*/
      data[key] = undefined;
    }
  });
}
