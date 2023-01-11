import { createHandler } from 'src/utils'
import { Message } from 'src/types'
import { Room } from 'src/enums'

export const message = createHandler(async (io, socket) => {
  socket.on('user:message', async (message: Message) => {
    const bosss = await io.in(Room.BOSS).fetchSockets()
    console.log('data =>', message, bosss)
    // const
  })
})
