import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

export const screenshot = createHandler((io, socket) => {
  socket.on(
    'boss:screenshot',
    async (
      message: Message<{
        id: string
        selectors: string
      }>,
    ) => {
      const { id, selectors } = message.data
      const users = await io.in(Room.USER).fetchSockets()
      const user = users.find((user) => user.id === id)

      if (!user) {
        socket.emit('boss:error', `没有找到用户:${id}`)
        return
      }

      user.emit('user:screenshot', { code: 0, data: { selectors } })
    },
  )
})
