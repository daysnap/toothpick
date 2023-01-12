import { createHandler } from '../utils'
import { Room } from '../enums'
import { pick } from '@daysnap/utils'

export const disconnect = createHandler(async (io, socket) => {
  socket.on('disconnect', async (reason) => {
    const { type, id } = socket as any
    if (type === Room.BOSS) {
      console.log(`boss disconnect: ${id} 已退出连接 `, reason)
      return
    }

    if (type === Room.USER) {
      console.log(`user disconnect: ${id} 已退出连接 `, reason)
      const users = await io.in(Room.USER).fetchSockets()
      io.to(Room.BOSS).emit('boss:user exit', {
        code: 0,
        data: { ...pick(socket, ['id']), reason },
      })
      io.to(Room.BOSS).emit('boss:users', {
        code: 0,
        data: users.map((user) => pick(user, ['id'])),
      })
    }
  })
})
