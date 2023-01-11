// config-overrides.js文件内容：
const { override, addPostcssPlugins, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]),
  addWebpackAlias({
    src: path.resolve(__dirname, 'src'),
    '@': path.resolve(__dirname, 'src'),
  }),
)
