import { createContext, useContext } from 'react'
import { Socket } from 'socket.io-client'

export interface SocketClientContextValue {
  socket: Socket
  users: Socket[]
}

export const SocketClientContext = createContext<SocketClientContextValue>(
  {} as SocketClientContextValue,
)

export const useSocketClientContext = () => {
  return useContext(SocketClientContext)
}
