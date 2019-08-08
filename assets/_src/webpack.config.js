// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const webpack = require('webpack');
const glob = require("glob");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//入力先js
const entries = glob.sync('./js/*.js').reduce((entries, entry) => Object.assign(entries, { [entry.replace('./js/', '').replace('.js', '')]: entry }), {});
// ソースマップの利用有無(productionのときはソースマップを利用しない)
// const enabledSourceMap = MODE === "development";

module.exports = env => {
  const NODE_ENV = (env && env.production) ? 'production' : 'development';
  //JS設定
  return [
    {
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      },
    // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る 
    //モードはdevelopment、production、noneが存在する
    mode: NODE_ENV,
    // エントリーポイントの設定
    entry: entries,
    watch: true,
    // 出力の設定
    output: {
      // 出力先のパス（絶対パスを指定する必要がある）
      path: path.resolve(__dirname, '../js'),
      // 出力するファイル名
      filename: '[name].build.js',
      //chunkFilename: '[id]-chunk.js',
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial',
      },
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCssAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.scss/, // 対象となるファイルの拡張子
          use: ExtractTextPlugin.extract({
            use:
              [
                // CSSをバンドルするための機能
                {
                  loader: 'css-loader',
                  options: {
                    // オプションでCSS内のurl()メソッドの取り込みを禁止する
                    url: false,
                    // ソースマップの利用有無
                    sourceMap: true,
                    // 0 => no loaders (default);
                    // 1 => postcss-loader;
                    // 2 => postcss-loader, sass-loader
                    importLoaders: 2
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    // ソースマップの利用有無
                    sourceMap: NODE_ENV === 'development',
                    modules: true,
                    minimizer: true,
                    includePaths: ['node_modules/compass-mixins/lib']
                  }
                }
              ]
          }),
        },
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          use: [
            {
              // Babel を利用する
              loader: "babel-loader",
              // Babel のオプションを指定する
              options: {
                presets: [
                  // プリセットを指定することで、ES2019 を ES5 に変換
                  "@babel/preset-env"
                ]
              }
            }
          ]
        }
      ],
    },
    devtool: NODE_ENV === 'development' ? 'source-map' : 'none',
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new ExtractTextPlugin({
        filename: '../css/[name].min.css'
      }),
      new MiniCssExtractPlugin({
        filename: '../css/[name].min.css'
      })
    ]
  }]
}