module.exports = {
  //代理url
  // proxy_url: 'http://14.23.157.98:8090', //外网ip

  proxy_url: 'http:' + '//10.10.' + '104.3:82', //内网ip
  apphead: '/fbacs',
  // proxy_url: 'http://http://10.10.104.3:82',
  //谭文轩
  // proxy_url: 'http://192.168.30.2:4070',
  // apphead: '/front',

  // 王永俊
  // proxy_url: 'http://172.30.207.79:4070',
  // apphead: '/front',

  //文件上传路径
  uploader: '/fbacs/access/form/FRONT-COMM/GTCCOMMATTACH10',
  //视频上传地址
  videoUploadUrl: 'http:' + '//10.10.' + '104.3/' + 'gtcommtool/do/commtoolvideo/',
  //图片前缀地址
  base_image_url: '/fbacs/',
  //国旗访问地址
  national_flag_url: 'http:' + '//14.23.157' + '.98:8090' + '/downloadfromfront/flags/',
  // download_url: '/download_url/',
  //本地测试是否开启菜单权限过滤
  isFilterMenu: true,
  systemName: '模板项目'
};
