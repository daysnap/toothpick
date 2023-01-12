import { io } from 'socket.io-client'
import { Message } from '@/types'
import { notification } from 'antd'

export const socket = io('ws://localhost:12580')

// 加入 boss
socket.emit('boss:join')

// 有新用户进来了
socket.on('boss:user', (message: Message) => {
  const { id } = message.data
  notification.info({
    message: `温馨提示`,
    description: `有新用户连接进来了：${id}`,
  })
})

// 用户退出
socket.on('boss:user exit', (message: Message) => {
  const { id, reason } = message.data
  notification.info({
    message: `温馨提示`,
    description: `用户：${id}已断开链接，断开原因：${reason}`,
  })
})

// 用户消息
socket.on('boss:message', (message: Message) => {
  console.log(`boss:message => `, message)
})
