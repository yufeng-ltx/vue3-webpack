// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

module.exports = {
  build: {
    outputRoot: path.resolve(__dirname, '../dist/'),
    publicRoot: path.resolve(__dirname, '../public/'),
    productionSourceMap: false,
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    port: 7444,
    autoOpenBrowser: true,
    proxyTable: {
      // '/API/v1/': {
      //   target: '', // 代理域名
      //   cookieDomainRewrite: { '*': '' },
      //   changeOrigin: true,
      //   secure: false
      // }
    },
    cssSourceMap: false
  }
};
