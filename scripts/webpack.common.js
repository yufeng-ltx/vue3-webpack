const path = require('path');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { assetsPath, progress } = require('./utils');
const config = require('./config');

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];
const isProEnv = process.env.NODE_ENV === 'production';

const urlLoader = (name, limit) => ({
  loader: 'url-loader',
  options: {
    limit: limit || 4096,
    esModule: false,
    fallback: {
      loader: 'file-loader',
      options: {
        name: assetsPath(`${name}/[name].[hash:10].[ext]`)
      }
    }
  }
});

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.outputRoot,
    filename: '[name].js',
    publicPath: '/'
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../node_modules/__webpack_cache__')
  },
  resolve: {
    extensions, // 自动解析确定的扩展
    alias: {
      '@': path.resolve(__dirname, '../src') // 源码目录
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|(m?j|t)sx?)$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              extensions,
              fix: isProEnv ? false : true,
              failOnError: isProEnv ? true : false,
              emitError: true,
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.m?jsx?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          urlLoader('img', 2048)
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          urlLoader('media')
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          urlLoader('fonts')
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        extensions: {
          vue: {
            enabled: true,
            compiler: '@vue/compiler-sfc'
          }
        }
      },
      logger: {
        issues: 'webpack-infrastructure'
      }
    }),
    progress(), // 进度条插件
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: isProEnv ? {
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      } : false
    })
  ]
};
