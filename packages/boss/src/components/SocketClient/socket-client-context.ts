import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export interface SocketClientContextValue {
  socket: Socket
}

export const SocketClientContext = createContext<SocketClientContextValue>(
  {} as SocketClientContextValue,
)
