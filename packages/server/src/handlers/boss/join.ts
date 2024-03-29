import { pick } from '@daysnap/utils'
import { createHandler } from '../../utils'
import { Room } from '../../enums'

export const join = createHandler((io, socket) => {
  socket.on('boss:join', async () => {
    socket.join(Room.BOSS)
    ;(socket as any).type = Room.BOSS

    const users = await io.in(Room.USER).fetchSockets()

    socket.emit('boss:users', {
      code: 0,
      data: users.map((user) => pick(user, ['id'])),
    })
  })
})
