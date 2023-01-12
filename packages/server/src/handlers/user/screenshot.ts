import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

export const screenshot = createHandler((io, socket) => {
  socket.on(
    'user:screenshot',
    async (
      message: Message<{
        base64: string
        bossIds: string[]
      }>,
    ) => {
      const { bossIds, base64 } = message.data
      ;(await io.in(Room.BOSS).fetchSockets())
        .filter((boss) => bossIds.includes(boss.id))
        .forEach((boss) => {
          boss.emit('boss:screenshot', { code: 0, data: { base64 } })
        })
    },
  )

  socket.on(
    'user:screenshot error',
    async (message: Message<{ reason: string; bossIds: string[] }>) => {
      const { reason, bossIds } = message.data
      ;(await io.in(Room.BOSS).fetchSockets())
        .filter((boss) => bossIds.includes(boss.id))
        .forEach((boss) => {
          boss.emit('boss:error', reason)
        })
    },
  )
})
