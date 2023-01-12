import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

interface CallData {
  id: string
}

export const session = createHandler((io, socket) => {
  // 进入会话
  socket.on('boss:session', async (message: Message<CallData>) => {
    const { id } = message.data
    const users = await io.in(Room.USER).fetchSockets()
    const user = users.find((user) => user.id === id)
    if (!user) {
      socket.emit('boss:error', `没有找到用户:${id}`)
      return
    }
    user.emit('user:session', { code: 0, data: socket.id })
  })

  // 退出会话
  socket.on('boss:session exit', async (message: Message<CallData>) => {
    const { id } = message.data
    const users = await io.in(Room.USER).fetchSockets()
    const user = users.find((user) => user.id === id)
    if (user) {
      user.emit('user:session exit', { code: 0, data: socket.id })
    }
  })
})
