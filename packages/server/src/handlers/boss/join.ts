import { createHandler } from '../../utils'
import { Room } from '../../enums'

export const join = createHandler(async (io, socket) => {
  await socket.join(Room.BOSS)

  const users = await io.in(Room.USER).fetchSockets()

  socket.emit('boss:users', { code: 0, data: users })
})
