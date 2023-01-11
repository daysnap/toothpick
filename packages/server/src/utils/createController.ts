import { Handler } from '../types'

export function createController(handlers: Record<string, Handler>): Handler {
  return (io, socket) =>
    Object.values(handlers).forEach((handler) => handler(io, socket))
}
