import { createHandler } from '../../utils'
import { Message } from '../../types'
import { Room } from '../../enums'

export const screenshot = createHandler((io, socket) => {
  socket.on(
    'user:screenshot',
    async (
      message: Message<{
        base64: string
        boosIds: string[]
      }>,
    ) => {
      const { boosIds, base64 } = message.data
      ;(await io.in(Room.BOSS).fetchSockets())
        .filter((boss) => boosIds.includes(boss.id))
        .forEach((boss) => {
          boss.emit('boss:screenshot', { code: 0, data: { base64 } })
        })
    },
  )

  socket.on(
    'user:screenshot error',
    async (message: Message<{ reason: string; boosIds: string[] }>) => {
      const { reason, boosIds } = message.data
      ;(await io.in(Room.BOSS).fetchSockets())
        .filter((boss) => boosIds.includes(boss.id))
        .forEach((boss) => {
          boss.emit('boss:error', reason)
        })
    },
  )
})
