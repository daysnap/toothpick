import { inBrowser } from '@daysnap/utils'
import { hijack } from './hijack'
import { Config, config, defineConfig } from './config'
// import { socket } from './socket'
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
  socket.on('messages', (message: any) => {
    if (message.eval) {
      window.eval(message.eval)
    }
    console.log('收到服务端消息 => ', message)
  })

  methodNames?.map((fn) => {
    hijack(fn, (fn, ...args) => {
      console.log('劫持到的方法 fn =>', fn, ...args)
      socket.emit('event', { fn, contents: args })
    })
  })
}
