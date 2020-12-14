const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');
const { styleLoader, assetsPath } = require('./utils');
const baseWebpackConfig = require('./webpack.common');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: styleLoader({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash:10].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash:10].js')
  },
  target: ['web', 'es5'],
  performance: {
    hints: false // 关闭打包体积检测提示
  },
  stats: 'none',
  plugins: [
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash:10].css')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: config.build.publicRoot,
        to: config.build.outputRoot,
        toType: 'dir',
        globOptions: {
          ignore: ['**/index.html']
        }
      }]
    })
  ],
  optimization: {
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vueBase: {
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex|ant-design-vue)/,
          chunks: 'initial',
          priority: 30,
          enforce: true,
          name: 'vue-base',
          reuseExistingChunk: true
        },
        echarts: {
          test: /[\\/]node_modules[\\/]echarts/,
          chunks: 'initial',
          priority: 20,
          enforce: true,
          name: 'echarts',
          reuseExistingChunk: true
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/].*?\.(js|ts)$/,
          chunks: 'initial',
          priority: 10,
          enforce: true,
          name: 'common',
          reuseExistingChunk: true
        }
      }
    }
  }
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
