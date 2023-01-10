const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (...dir) => path.resolve(__dirname, ...dir)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: resolve('src/index.ts'),
  output: {
    path: resolve('dist'),
  },
  resolve: {
    alias: {
      'src': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // 运行的目录
    // static: [resolve('public')],
    host: '0.0.0.0',
    // 启动 gzip 压缩
    compress: false,
    // 服务端口
    port: 9527,
    // 自动打开浏览器
    open: false,
    // 开启 hot
    hot: false,
  },
}
