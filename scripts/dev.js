require('./check-versions')(); // node版本检测

process.env.NODE_ENV = 'development'; // 设置开发环境

const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const open = require('open');

const { getIPAddress } = require('./utils');
const config = require('./config');
const webpackConfig = require('./webpack.dev');

const port = process.env.PORT || config.dev.port;

console.log(chalk.bgGreen.black(' INFO '), 'Starting development server...\n');
const compiler = webpack(webpackConfig);

portfinder.basePort = port;
portfinder.getPortPromise().then(port => {
  let tipsSign = true;
  const server = new WebpackDevServer(compiler, webpackConfig.devServer || {});
  const networkIP = getIPAddress();
  const url = `http://localhost:${port}/`;
  process.env.PORT = port;
  compiler.hooks.done.tap('dev-server', (stats) => {
    if (stats.hasErrors()) {
      return false;
    }
    if (tipsSign) { // 输出接口代理信息
      const proxyTable = config.dev.proxyTable;
      Object.keys(proxyTable).forEach(key => {
        console.log(`  [HPM] Proxy created: ${key}  -> ${proxyTable[key].target}`);
      });
      console.log('');
      if (config.dev.autoOpenBrowser) { // open browser
        open(url);
      }
      tipsSign = false;
    }
    console.log('  server running at:');
    console.log(`  - Local:   ${chalk.cyan(url)}`);
    if (networkIP) {
      console.log(`  - Network: ${chalk.cyan(`http://${networkIP}:${port}/`)}`);
    }
  });
  server.listen(port);
}).catch(err => {
  console.log('');
  console.log(chalk.bgRed.black(' ERROR '), chalk.red('start server with errors.\n'));
  process.exit(0);
});
