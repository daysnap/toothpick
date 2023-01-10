import { inBrowser } from '@daysnap/utils'
import { hijack } from './hijack'
import { Config, config, defineConfig } from './config'

export function init(cfg: Partial<Config>) {
  if (!inBrowser()) {
    throw new Error('亲~ 请在浏览器使用~~~')
  }

  defineConfig(cfg)

  const { methodNames } = config

  methodNames.map((fn) => {
    hijack(fn, (fn, ...args) => {
      console.log('劫持到的方法 fn =>', ...args)
    })
  })
}
