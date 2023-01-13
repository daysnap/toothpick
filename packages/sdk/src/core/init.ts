import { io } from 'socket.io-client'
import { inBrowser, pick } from '@daysnap/utils'
import html2canvas from 'html2canvas'
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

  ;(window as any).$tp = socket

  // 加入用户房间
  socket.emit('user:join')

  // 执行代码
  socket.on('user:eval', (message: Message<{ content: string }>) => {
    const { content } = message.data
    window.eval(content)
  })

  // 会话
  let bosss: { id: string }[] = []
  socket.on('user:session', (message: Message) => {
    bosss.push(message.data)
  })
  socket.on('user:session exit', (message: Message) => {
    bosss = bosss.filter((boss) => boss.id !== message.data.id)
  })

  // 截图
  socket.on(
    'user:screenshot',
    (message: Message<{ selectors: string; id: string }>) => {
      const { selectors = 'body', id } = message.data
      const element = document.querySelector(selectors) as any
      const bossIds = bosss.map((boss) => boss.id)

      if (!bossIds.includes(id)) {
        bossIds.push(id)
      }

      if (!element) {
        socket.emit('user:screenshot error', {
          code: 0,
          data: { bossIds, reason: `没有找到选择器为：${selectors} 的元素。` },
        })
        return
      }

      html2canvas(element)
        .then((canvas) => {
          const base64 = canvas.toDataURL()

          socket.emit('user:screenshot', {
            code: 0,
            data: { base64, bossIds },
          })
        })
        .catch((err) => {
          socket.emit('user:screenshot error', {
            code: 0,
            data: {
              bossIds,
              reason: err?.toString(),
            },
          })
        })
    },
  )

  // 监听error
  window.addEventListener('unhandledrejection', (event) => {
    console.error({
      type: 'unhandledrejection',
      message: event.reason?.message,
    })
  })
  window.addEventListener('error', (event) => {
    console.error({
      type: 'error',
      ...pick(event, ['message', 'lineno', 'colno', 'filename']),
    })
  })

  // 劫持
  methodNames?.map((fn) => {
    hijack(fn, (fn, ...args) => {
      if (bosss.length) {
        socket.emit('user:message', {
          code: 0,
          data: {
            fn,
            contents: args,
            bossIds: bosss.map((boss) => boss.id),
          },
        })
      }
    })
  })
}
