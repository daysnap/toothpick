import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

export const message = createHandler(async (io, socket) => {
  socket.on('user:message', async (message: Message) => {
    const bosss = await io.in(Room.BOSS).fetchSockets()
    io.to(Room.BOSS).emit('boss:message', message)
    console.log('user:message =>', message, bosss)
    // const
  })
})
