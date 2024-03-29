import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/toothpick.js',
      format: 'umd', //五种输出格式：amd/es6/iife/umd/cjs
      name: 'toothpick',
    },
    {
      file: 'dist/toothpick.min.js',
      format: 'umd',
      name: 'toothpick',
      plugins: [terser()],
    },
  ],
  // 配置 external 属性，告诉 rollup.js 哪些是外部的类库。
  external: ['html2canvas', 'socket.io-client'],
  plugins: [
    commonjs(),
    nodeResolve({
      browser: true,
    }),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            // 其实默认就是false，这里我为了和大家刻意强调不要混在一起使用
            useBuiltIns: false,
            // targets: {
            //   chrome: 46,
            // },
            // useBuiltIns: 'usage',
            // corejs: { version: '3', proposals: true },
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            // polyfill使用的corejs版本
            // 需要注意这里是@babel/runtime-corejs3 和 preset-env 中是不同的 npm 包
            corejs: 3,
            // 切换对于 @babel/runtime 造成重复的 _extend() 之类的工具函数提取
            // 默认为true 表示将这些工具函数抽离成为工具包引入而不必在每个模块中单独定义
            helpers: true,
            // 切换生成器函数是否污染全局
            // 为true时打包体积会稍微有些大 但生成器函数并不会污染全局作用域
            regenerator: true,
            version: '^7.19.6',
          },
        ],
      ],
    }),
    typescript(),
  ],
}
