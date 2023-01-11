import { createHandler } from 'src/utils'

export const message = createHandler(async (io, socket) => {
  socket.on('boss:message', (data: any) => {
    console.log('data =>', data)
  })
})
