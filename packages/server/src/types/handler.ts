import { Server, Socket } from 'socket.io'

export interface Handler {
  (io: Server, socket: Socket): void | Promise<void>
}
