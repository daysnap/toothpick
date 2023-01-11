import { inBrowser } from '@daysnap/utils'
import { hijack } from './hijack'
import { Config, config, defineConfig } from './config'
import { io } from 'socket.io-client'

export function init(cfg: Config) {
  if (!inBrowser()) {
    throw new Error('亲~ 请在浏览器使用~~~')
  }

  defineConfig(cfg)

  const { methodNames, socketConfig } = config
  const { url, ...options } = socketConfig
  const socket = io(url, options)

  ;(window as any).socket = socket

  socket.emit('user:join')

  socket.on('user:message', (message: any) => {
    if (message.eval) {
      window.eval(message.eval)
    }
    console.log('收到服务端消息 => ', message)
  })

  methodNames?.map((fn) => {
    hijack(fn, (fn, ...args) => {
      socket.emit('user:message', { fn, contents: args })
    })
  })
}
