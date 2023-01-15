const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (...dir) => path.resolve(__dirname, ...dir)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: resolve('src/index.ts'),
  output: {
    path: resolve('dist'),
  },
  resolve: {
    alias: {
      src: resolve('src'),
    },
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        // test: /\.(t|j)sx?$/,
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
    }),
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          // 定义要拷贝的源目录
          from: resolve('public'),
          // 定义要拷贝到的目标目录
          to: resolve('dist'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*index.html'],
          },
        },
      ],
    }),
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
