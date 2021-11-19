const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = 'development';
let target = 'web';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

module.exports = {
  mode: mode,
  target: target,

  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
    login: path.resolve(__dirname, 'src/js/login.js'),
    signup: path.resolve(__dirname, 'src/js/signup.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/signIn.html',
      template: path.resolve(__dirname, 'src/page/signIn.html'),
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'page/signUp.html',
      template: path.resolve(__dirname, 'src/page/signUp.html'),
      chunks: ['signup']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  devtool: 'source-map',
  devServer: {
    static: './dist',
    hot: true
  }
};
