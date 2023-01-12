import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

export const evalJs = createHandler((io, socket) => {
  socket.on(
    'boss:eval',
    async (message: Message<{ content: string; id: string }>) => {
      const { id, content } = message.data
      const users = await io.in(Room.USER).fetchSockets()
      const user = users.find((user) => user.id === id)

      if (!user) {
        socket.emit('boss:error', `没有找到用户:${id}`)
        return
      }

      user.emit('user:eval', { code: 0, data: { content } })
    },
  )
})
