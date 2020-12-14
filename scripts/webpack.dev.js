const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./config');
const { styleLoader } = require('./utils');
const webpackCommonConfig = require('./webpack.common');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  module: {
    rules: styleLoader({
      sourceMap: config.dev.cssSourceMap
    })
  },
  target: 'web',
  devtool: 'cheap-module-source-map', // faster for development
  devServer: { // 开发服务器选项
    contentBase: path.join(__dirname, '../public'),
    hot: true,
    noInfo: true,
    clientLogLevel: 'none',
    stats: 'none',
    disableHostCheck: true,
    historyApiFallback: { // 兼容vue-router history模式
      disableDotRule: true
    },
    // proxy: config.dev.proxyTable, // 代理路径
    before(app) {
      //
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
