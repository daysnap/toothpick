import { createHandler } from '../../utils'

export const disconnect = createHandler(async (io, socket) => {
  socket.on('disconnect', () => {
    console.log(`boss: ${socket.id} 已退出连接`)
  })
})
