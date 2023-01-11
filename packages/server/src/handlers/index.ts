import { createController } from '../utils'

import * as userHandlers from './user'
import * as bossHandlers from './boss'

export const user = createController(userHandlers)
export const boss = createController(bossHandlers)

export * from './disconnect'
