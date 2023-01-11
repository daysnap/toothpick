import { Handler } from 'src/types'

export function createController(handlers: Record<string, Handler>): Handler {
  return (io, socket) =>
    Object.values(handlers).forEach((handler) => handler(io, socket))
}
