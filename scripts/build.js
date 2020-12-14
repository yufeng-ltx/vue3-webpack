process.env.NODE_ENV = 'production';

const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const execSync = require('child_process').execSync;
const { injectManifest } = require('workbox-build');

const config = require('./config');

const webpackConfig = require('./webpack.prod');

const gitCommit = (msg) => {
  if (!process.env.npm_config_publish) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (!msg) msg = 'update';
    console.log('');
    console.log(chalk.bgGreen.black(' INFO '), 'Ready to submit to git repository...\n');
    try {
      // git操作
      execSync(`git pull -p&& git add -A --&& git commit -m "${msg}"&& git push`, { stdio: 'inherit' });
      console.log('');
      console.log(chalk.bgGreen.black(' INFO '), 'Git code submission is complete! \n');
      resolve();
    } catch (err) {
      reject();
    }
  });
};

async function build() {
  console.log(chalk.bgGreen.black(' INFO '), 'Starting build file...\n');
  rm(config.build.outputRoot, err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
      if (err) throw err;
      if (stats.hasErrors()) {
        console.log(chalk.bgRed.black(' ERROR '), chalk.red('Build failed with errors.\n'));
        process.exit(0);
      }
      async function run() {
        await injectManifest({ // 生成service worker
          swSrc: './public/service-worker.js',
          swDest: './dist/service-worker.js',
          globDirectory: './dist/',
          globPatterns: ['**\/*.{js,css}', '**\/img\/*.{jpg,png}', 'index.html'],
          globIgnores: ['service-worker.js']
        });
        const pubTxt = process.env.npm_config_publish;
        await gitCommit(pubTxt);
        console.log('');
        console.log(chalk.bgGreen.black(' INFO '), 'Build is complete! \n');
      }
      run();
    });
  });
}

build();
