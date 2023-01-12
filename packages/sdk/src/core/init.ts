import { io } from 'socket.io-client'
import { inBrowser } from '@daysnap/utils'
import { hijack } from './hijack'
import { Message } from '../types'
import { Config, config, defineConfig } from './config'

export function init(cfg: Config) {
  if (!inBrowser()) {
    throw new Error('亲~ 请在浏览器使用~~~')
  }

  defineConfig(cfg)

  const { methodNames, socketConfig } = config
  const { url, ...options } = socketConfig
  const socket = io(url, options)

  ;(window as any).socket = socket

  // 加入用户房间
  socket.emit('user:join')

  // 执行代码
  socket.on('user:eval', (message: Message) => {
    if (message.data) {
      window.eval(message.data)
    }
  })

  // 会话
  let bosss: { id: string }[] = []
  socket.on('user:session', (message: Message) => {
    bosss.push(message.data)
  })
  socket.on('user:session exit', (message: Message) => {
    bosss = bosss.filter((boss) => boss.id === message.data.id)
  })

  // 劫持
  methodNames?.map((fn) => {
    hijack(fn, (fn, ...args) => {
      if (bosss.length) {
        console.log('劫持代码')
        socket.emit('user:message', { fn, contents: args })
      }
    })
  })
}
