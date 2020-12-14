
const os = require('os');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const hash = require('hash-sum');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.assetsPath = (_path) => {
  const assetsSubDirectory = 'static';
  return path.posix.join(assetsSubDirectory, _path);
};

// 获取本机ip
exports.getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return false;
};

// css loader
exports.styleLoader = (options) => {
  options = options || {};
  // 引入配置
  // options.sass = {
  //   data: '@import "~@/assets/sass/libs/base.scss"'
  // }
  const sourceMap = !!options.sourceMap;
  const cssLoader = (mod) => {
    let opt = {};
    if (mod) {
      opt = {
        modules: {
          localIdentName: '[name]_[hash:base64:5]'
        }
      };
    }
    return {
      loader: 'css-loader',
      options: Object.assign({
        importLoaders: 2,
        sourceMap
      }, opt)
    };
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap
    }
  };
  const generateLoaders = (ext, loaderOptions) => {
    const getUseLoader = (mod) => {
      const loaders = [cssLoader(mod), postcssLoader];
      if (ext) {
        const opt = options[ext] || {};
        loaders.push({
          loader: ext + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap
          }, opt)
        });
      }
      return {
        use: [options.extract ? {
          loader: MiniCssExtractPlugin.loader,
          options: {
            //
          }
        } : 'style-loader', ...loaders]
      };
    };
    return [
      // { resourceQuery: /module/, ...getUseLoader(true) },
      // { resourceQuery: /\?vue/, ...getUseLoader() },
      // { test: /\.module\.\w+$/, ...getUseLoader(true) },
      getUseLoader()
    ];
  };
  const loadersObj = {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
  const output = [];
  for (const extension in loadersObj) {
    const loader = loadersObj[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      oneOf: loader
    });
  }
  return output;
};

// progressPlugin
exports.progress = (opt) => {
  const webpack = require('webpack');
  const cliProgress = require('cli-progress');
  class Progress extends webpack.ProgressPlugin {
    constructor(opt) {
      super();
      this.handler = (percent, message, ...details) => {
        this.updateProgress(percent, message, details);
      };
      this.bar = new cliProgress.SingleBar({
        format: 'Progress: [{bar}] {details}',
        barCompleteChar: '\u2588',
        // barIncompleteChar: '☰',
        hideCursor: true,
        clearOnComplete: true,
        barsize: 18,
        fps: 20
      });
      this.start = false;
    }

    updateProgress(percent = 0, message = '', details = []) {
      const progress = Math.floor(percent * 100);
      const payload = {
        details: [progress + '%', message, ...details.slice(0, 2)].join(' ')
      };
      if (!this.start) {
        this.bar.start(100, 0, payload);
        this.start = true;
      } else {
        if (progress > 95) {
          this.bar.stop();
        } else {
          this.bar.update(progress, payload);
        }
      }
    }
  }
  return new Progress(opt);
};

// 获取文件hash值

exports.getFileHash = (dir) => {
  let txt = '';
  if (fs.existsSync(dir)) {
    txt = fs.readFileSync(dir, 'utf-8');
  }
  return hash(txt);
};
