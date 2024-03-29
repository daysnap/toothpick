import { pick } from '@daysnap/utils'
import { createHandler } from '../../utils'
import { Room } from '../../enums'

export const join = createHandler((io, socket) => {
  socket.on('user:join', async () => {
    socket.join(Room.USER)
    ;(socket as any).type = Room.USER

    const users = await io.in(Room.USER).fetchSockets()

    io.to(Room.BOSS).emit('boss:user', {
      data: pick(socket, ['id']),
    })

    io.to(Room.BOSS).emit('boss:users', {
      code: 0,
      data: users.map((user) => pick(user, ['id'])),
    })
  })
})
