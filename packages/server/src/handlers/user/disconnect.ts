import { Room } from '../../enums'
import { createHandler } from '../../utils'

export const disconnect = createHandler(async (io, socket) => {
  socket.on('disconnect', async (data) => {
    const users = await io.in(Room.USER).fetchSockets()
    io.to(Room.BOSS).emit('boss:user exit', {
      code: 0,
      data: { user: socket, reason: data },
    })
    io.to(Room.BOSS).emit('boss:users', { code: 0, data: users })
    console.log(`user: ${socket.id} 已退出连接 => `, data)
  })
})
