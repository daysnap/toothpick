import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

export const message = createHandler(async (io, socket) => {
  socket.on(
    'user:message',
    async (
      message: Message<{
        bossIds: string[]
        fn: string
        contents: any[]
      }>,
    ) => {
      const { bossIds, fn, contents } = message.data
      ;(await io.in(Room.BOSS).fetchSockets())
        .filter((boss) => bossIds.includes(boss.id))
        .forEach((boss) => {
          boss.emit('boss:message', { code: 0, data: { fn, contents } })
        })
    },
  )
})
