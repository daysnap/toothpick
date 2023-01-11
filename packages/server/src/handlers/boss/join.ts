import { createHandler } from 'src/utils'
import { Room } from 'src/enums'

export const join = createHandler(async (io, socket) => {
  await socket.join(Room.BOSS)

  const users = await io.in(Room.USER).fetchSockets()

  socket.emit('boss:users', { code: 0, data: users })
})
