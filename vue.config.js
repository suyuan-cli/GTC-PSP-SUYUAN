(async () => {
  const config = require('./src/p.config.js');
  const proxy_url = config.proxy_url;
  const base_image_url = config.base_image_url;
  const download_url = config.download_url;
  const apphead = config.apphead;
  // let portCreate = require('./mock/gePort');
  // let port = await portCreate(3001);
  // port--;

  let port = 3001;
  let backendProxyUrl = apphead + '/access';
  module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:' + port,
          changOrigin: true
        },

        [backendProxyUrl]: {
          target: proxy_url,
          changOrigin: true,
          cookieDomainRewrite: 'localhost'
        },
        '/do': {
          target: proxy_url,
          changOrigin: true,
          cookieDomainRewrite: 'localhost'
        },

        [base_image_url]: {
          pathRewrite: {
            ['^' + base_image_url]: '' //一般不会重写
          },
          target: proxy_url + apphead + '/',
          changOrigin: true,
          cookieDomainRewrite: 'localhost'
        },
        [download_url]: {
          pathRewrite: {
            ['^' + download_url]: '' //一般不会重写
          },
          target: proxy_url + '/mgr/',
          changOrigin: true,
          cookieDomainRewrite: 'localhost'
        }
      }
    },
    pwa: {
      iconPaths: {
        favicon32: './public/favicon.png',
        favicon16: './public/favicon.png',
        appleTouchIcon: './public/favicon.png',
        maskIcon: './public/favicon.png',
        msTileImage: './public/favicon.png',
      }
    }
  };
})();
