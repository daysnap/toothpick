import { io } from 'socket.io-client'
import { Message } from '@/types'
import { message } from 'antd'

const { hostname } = location
let url = `ws://${hostname}:12580`
if (hostname === 'demo.daysnap.cn') {
  url = 'ws://119.3.156.101:12580'
} else if (hostname === 'localhost') {
  url = 'ws://localhost:12580'
}

export const socket = io(url)

// 加入 boss
socket.emit('boss:join')

// 有新用户进来了
socket.on('boss:user', (msg: Message) => {
  const { id } = msg.data
  message.success({
    content: `有新用户连接进来了：${id}`,
  })
})

// 用户退出
socket.on('boss:user exit', (msg: Message) => {
  const { id, reason } = msg.data
  message.error({
    content: `用户：${id}已断开链接，断开原因：${reason}`,
  })
})

// 全局错误
socket.on('boss:error', (reason: string) => message.error({ content: reason }))
