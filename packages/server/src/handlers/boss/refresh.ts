import { pick } from '@daysnap/utils'
import { createHandler } from '../../utils'
import { Room } from '../../enums'

export const refresh = createHandler((io, socket) => {
  socket.on('boss:refresh users', async () => {
    const users = await io.in(Room.USER).fetchSockets()
    socket.emit('boss:users', {
      code: 0,
      data: users.map((user) => pick(user, ['id'])),
    })
  })
})
